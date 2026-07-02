import { useState, useEffect } from "react";
import { getLivekitToken, getGuestLivekitToken } from "../services/LivekitService";
import { getPublicMeetingInfo } from "../services/MeetingService";
import { copyMeetingLink } from "../utils/shareLink";
import { getAccessToken, getUser } from "../utils/localstorage";
import { VideoConference, LiveKitRoom, PreJoin } from "@livekit/components-react";
import "@livekit/components-styles";
import "../styles/MeetingScreen.css";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function MeetingScreen() {
    const { meetingId } = useParams();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [meetingTitle, setMeetingTitle] = useState("");
    const [status, setStatus] = useState("loading");
    const [codeInput, setCodeInput] = useState("");
    const [codeError, setCodeError] = useState("");
    const [userChoices, setUserChoices] = useState(null);

    const requestAuthenticatedToken = async (code) => {
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

    const requestGuestToken = async (name) => {
        try {
            const fetchedToken = await getGuestLivekitToken(meetingId, name);
            setToken(fetchedToken);
            setStatus("ready");
        } catch (err) {
            const reason = err.response?.data?.error;
            if (reason === "ROOM_FULL") {
                setStatus("room-full");
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
                const info = await getPublicMeetingInfo(meetingId);
                if (cancelled) return;
                setMeetingTitle(info.title);

                const hasToken = !!getAccessToken();
                if (!hasToken && info.visibility !== "public") {
                    setStatus("must-login");
                    return;
                }
                setStatus("prejoin");
            } catch (err) {
                if (!cancelled) {
                    setStatus("failed");
                }
            }
        };

        init();

        return () => {
            cancelled = true;
        };
    }, [meetingId]);

    const handlePreJoinSubmit = async (values) => {
        setUserChoices(values);
        setStatus("connecting");

        const hasToken = !!getAccessToken();
        if (hasToken) {
            await requestAuthenticatedToken();
        } else {
            await requestGuestToken(values.username);
        }
    };

    const submitCode = async (e) => {
        e.preventDefault();
        setCodeError("");
        await requestAuthenticatedToken(codeInput);
    };

    if (status === "loading") {
        return <div className="meeting-screen-message"><div className="meeting-screen-card">Loading meeting...</div></div>;
    }

    if (status === "must-login") {
        return (
            <div className="meeting-screen-message">
                <div className="meeting-screen-card">
                    <p>Log in to join this meeting.</p>
                    <button onClick={() => navigate("/login")}>Log In</button>
                </div>
            </div>
        );
    }

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

    if (status === "prejoin") {
        const account = getUser();
        return (
            <div className="meeting-screen-prejoin" data-lk-theme="default">
                <PreJoin
                    defaults={{ username: account?.name || "" }}
                    onSubmit={handlePreJoinSubmit}
                    onError={() => toast.error("Could not access camera/microphone")}
                />
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
                <button className="meeting-share-btn" onClick={() => copyMeetingLink(meetingId)}>Share</button>
            </header>
            <div className="meeting-screen-room">
                <LiveKitRoom
                    serverUrl={import.meta.env.VITE_LIVEKIT_URL}
                    token={token}
                    video={userChoices?.videoEnabled ?? true}
                    audio={userChoices?.audioEnabled ?? true}
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
