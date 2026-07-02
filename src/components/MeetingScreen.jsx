import { useState } from "react";
import { getLivekitToken } from "../services/LivekitService";
import { VideoConference, LiveKitRoom } from "@livekit/components-react";
import "@livekit/components-styles";
import { useParams } from "react-router";


export default function MeetingScreen() {

    const { meetingId } = useParams();

    const [token, setToken] = useState(null);
    const connectToRoom = async () => {
        const token = await getLivekitToken({
            meetingId: meetingId,
        });
        setToken(token);
    }

    return <div>
        {token && (
            <LiveKitRoom
                serverUrl={import.meta.env.VITE_LIVEKIT_URL}
                token={token}
                video={true}
                audio={true}
                connect={true}
                style={{ height: "100vh" }}
            >
                <VideoConference />
            </LiveKitRoom>
        )}

        <button onClick={connectToRoom}>Connect to Room</button>
    </div>;
}