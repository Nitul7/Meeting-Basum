import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/Dashboard.css";
import { getMeetings } from "../services/MeetingService";

const AllMeetings = () => {
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const fetched = await getMeetings();
      const sorted = [...fetched].sort(
        (a, b) => new Date(a.startTime) - new Date(b.startTime)
      );
      setMeetings(sorted);
    };
    fetchMeetings();
  }, []);

  return (
    <div className="main">
      <div className="welcome">
        <h2>All Meetings</h2>
        <p>Every meeting you host or are invited to.</p>
      </div>

      <div className="meetings">
        <div className="meeting-header">
          <h3>Meetings</h3>
        </div>
        {meetings.map((meeting) => (
          <div className="meeting-card" key={meeting._id}>
            <div className="left">
              <div className="mini-icon purple">👥</div>
              <div>
                <h4>{meeting.title}</h4>
              </div>
            </div>

            <div className="right">
              <p>{new Date(meeting.startTime).toLocaleString()}</p>
              <button onClick={() => navigate(`/meeting/${meeting._id}`)}>Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMeetings;
