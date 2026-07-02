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
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const connect = async () => {
            try {
                const [fetchedToken, meeting] = await Promise.all([
                    getLivekitToken(meetingId),
                    getMeetingById(meetingId),
                ]);
                if (!cancelled) {
                    setToken(fetchedToken);
                    setMeetingTitle(meeting.title);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                    toast.error("Could not join meeting");
                }
            }
        };

        connect();

        return () => {
            cancelled = true;
        };
    }, [meetingId]);

    if (error) {
        return <div className="meeting-screen-message">Failed to join meeting.</div>;
    }

    if (!token) {
        return <div className="meeting-screen-message">Connecting to meeting...</div>;
    }

    return (
        <div className="meeting-screen">
            <header className="meeting-screen-header">
                <span className="meeting-screen-title">{meetingTitle}</span>
            </header>
            <div className="meeting-screen-room">
                <LiveKitRoom
                    serverUrl={import.meta.env.VITE_LIVEKIT_URL}
                    token={token}
                    video={true}
                    audio={true}
                    connect={true}
                    style={{ height: "100%" }}
                    onDisconnected={() => navigate("/")}
                >
                    <VideoConference />
                </LiveKitRoom>
            </div>
        </div>
    );
}
