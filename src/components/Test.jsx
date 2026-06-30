import { useState } from "react";
import { getLivekitToken } from "../services/LivekitService";
import { Room } from "livekit-client";
import { VideoConference, LiveKitRoom } from "@livekit/components-react";


export default function Test() {
    const [token, setToken] = useState(null);


    const connectToRoom = async () => {

        const token = await getLivekitToken({
            roomName: "Pravesh",
            userName: new Date().getTime().toString(),
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
            >
                <VideoConference />
            </LiveKitRoom>
        )}

        <button onClick={connectToRoom}>Connect to Room</button>
    </div>;
}