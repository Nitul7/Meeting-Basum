import { useState, useEffect } from "react";
import { getLivekitToken } from "../services/LivekitService";
import { VideoConference, LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function MeetingScreen() {
    const { meetingId } = useParams();
    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const connect = async () => {
            try {
                const fetchedToken = await getLivekitToken(meetingId);
                if (!cancelled) {
                    setToken(fetchedToken);
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
        return <div>Failed to join meeting.</div>;
    }

    if (!token) {
        return <div>Connecting to meeting...</div>;
    }

    return (
        <LiveKitRoom
            serverUrl={import.meta.env.VITE_LIVEKIT_URL}
            token={token}
            video={true}
            audio={true}
            connect={true}
            style={{ height: "100vh" }}
            onDisconnected={() => navigate("/")}
        >
            <VideoConference />
        </LiveKitRoom>
    );
}
