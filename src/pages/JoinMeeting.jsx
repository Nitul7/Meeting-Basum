import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/JoinMeeting.css";
import { verifyMeetingCode } from "../services/MeetingService";
import { toast } from "react-toastify";

const JoinMeeting = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

  // Start camera + mic
  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera/Mic permission denied or error:", err);
      }
    };

    startMedia();

    // cleanup
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const joinMeeting = async () => {
    if (!meetingCode.trim()) {
      toast.error("Enter a meeting code or link");
      return;
    }

    try {
      const meeting = await verifyMeetingCode(meetingCode);
      navigate(`/meeting/${meeting._id}`);
    } catch (err) {
      toast.error("Meeting not found");
    }
  };

  return (
    <div className="join-meeting">
      <div className="join-container">
        {/* LEFT SIDE */}
        <div className="join-left">
          <h2>Join Meeting</h2>
          <p>Enter the meeting code to join a meeting</p>

          <input
            type="text"
            placeholder="Enter meeting code or link"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
          />

          <button className="join-btn" onClick={joinMeeting}>Join Meeting</button>

          <div className="divider">or</div>

          <button className="link-btn">Join with Personal Link</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="join-right">
          <h3 className="join-right-h3">Preview</h3>

          <div className="video-box">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="video-preview"
            />
          </div>

          <select>
            <option>Integrated Camera</option>
          </select>

          <select>
            <option>Default - Microphone</option>
          </select>

          <p className="ready">You are ready to join!</p>
        </div>
      </div>
    </div>
  );
};

export default JoinMeeting;
