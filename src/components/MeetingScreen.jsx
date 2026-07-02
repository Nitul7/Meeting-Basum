import { useState, useEffect } from "react";
import { getLivekitToken } from "../services/LivekitService";
import { getMeetingById } from "../services/MeetingService";
import { VideoConference, LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import "../styles/MeetingScreen.css";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function MeetingScreen() {
    const { meetingId } = useParams();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [meetingTitle, setMeetingTitle] = useState("");
    const [status, setStatus] = useState("connecting");
    const [codeInput, setCodeInput] = useState("");
    const [codeError, setCodeError] = useState("");

    const requestToken = async (code) => {
        try {
            const fetchedToken = await getLivekitToken(meetingId, code);
            setToken(fetchedToken);
            setStatus("ready");
        } catch (err) {
            const reason = err.response?.data?.error;
            if (reason === "NOT_INVITED") {
                setStatus("not-invited");
            } else if (reason === "ROOM_FULL") {
                setStatus("room-full");
            } else if (reason === "CODE_REQUIRED") {
                setStatus("need-code");
            } else if (reason === "INVALID_CODE") {
                setCodeError("Incorrect code, try again.");
                setStatus("need-code");
            } else {
                setStatus("failed");
                toast.error("Could not join meeting");
            }
        }
    };

    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            try {
                const meeting = await getMeetingById(meetingId);
                if (!cancelled) {
                    setMeetingTitle(meeting.title);
                }
            } catch (err) {
                // title fetch failing isn't fatal to the join attempt itself
            }
            if (!cancelled) {
                await requestToken();
            }
        };

        init();

        return () => {
            cancelled = true;
        };
    }, [meetingId]);

    const submitCode = async (e) => {
        e.preventDefault();
        setCodeError("");
        await requestToken(codeInput);
    };

    if (status === "not-invited") {
        return <div className="meeting-screen-message"><div className="meeting-screen-card">You were not invited to this meeting.</div></div>;
    }

    if (status === "room-full") {
        return <div className="meeting-screen-message"><div className="meeting-screen-card">This meeting is full.</div></div>;
    }

    if (status === "failed") {
        return <div className="meeting-screen-message"><div className="meeting-screen-card">Failed to join meeting.</div></div>;
    }

    if (status === "need-code") {
        return (
            <div className="meeting-screen-message">
                <form className="meeting-code-form" onSubmit={submitCode}>
                    <p>This meeting requires a code to join.</p>
                    <input
                        type="text"
                        placeholder="Enter meeting code"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        autoFocus
                    />
                    {codeError && <p className="meeting-code-error">{codeError}</p>}
                    <button type="submit">Join</button>
                </form>
            </div>
        );
    }

    if (status !== "ready" || !token) {
        return <div className="meeting-screen-message"><div className="meeting-screen-card">Connecting to meeting...</div></div>;
    }

    return (
        <div className="meeting-screen">
            <header className="meeting-screen-header">
                <span className="meeting-screen-title">{meetingTitle}</span>
                <span className="meeting-live-indicator">
                    <span className="meeting-live-dot"></span>
                    Live
                </span>
            </header>
            <div className="meeting-screen-room">
                <LiveKitRoom
                    serverUrl={import.meta.env.VITE_LIVEKIT_URL}
                    token={token}
                    video={true}
                    audio={true}
                    connect={true}
                    data-lk-theme="default"
                    style={{ height: "100%" }}
                    onDisconnected={() => navigate("/")}
                >
                    <VideoConference />
                </LiveKitRoom>
            </div>
        </div>
    );
}
