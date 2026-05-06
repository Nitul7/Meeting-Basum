import React from "react";
import { useNavigate } from "react-router";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="main">

      <div className="welcome">
        <h2>Good Morning, Nitul tako 👋</h2>
        <p>Here's what's happening with your meetings today.</p>
      </div>

      {/* ACTION CARDS */}
      <div className="cards">
        <div className="card">
          <div className="icon purple">🎥</div>
          <h4>Start New Meeting</h4>
          <p>Start an instant meeting</p>
          <button className="btn purple" onClick={() => navigate("/new-meeting")}>Start Now →</button>
        </div>

        <div className="card">
          <div className="icon green">👥</div>
          <h4>Join with Code</h4>
          <p>Join a meeting with code</p>
          <button className="btn green" onClick={() => navigate("/join-meeting")}>Join Meeting →</button>
        </div>

        <div className="card">
          <div className="icon orange">📅</div>
          <h4>Schedule Meeting</h4>
          <p>Plan your meeting</p>
          <button className="btn orange" onClick={() => navigate("/schedule-meeting")}>Schedule Now →</button>
        </div>
      </div>

      {/* UPCOMING MEETINGS */}
      <div className="meetings">
        <div className="meeting-header">
          <h3>Upcoming Meetings</h3>
          <span>View All</span>
        </div>

        <div className="meeting-card">
          <div className="left">
            <div className="mini-icon purple">👥</div>
            <div>
              <h4>Project Planning Meeting</h4>
              <p>Host: Risan Basukala</p>
            </div>
          </div>

          <div className="right">
            <p>Today, 10:00 AM - 11:00 AM</p>
            <button>Join</button>
          </div>
        </div>

        <div className="meeting-card">
          <div className="left">
            <div className="mini-icon green">👥</div>
            <div>
              <h4>Marketing Strategy</h4>
              <p>Host: Alice</p>
            </div>
          </div>

          <div className="right">
            <p>Today, 02:00 PM - 03:00 PM</p>
            <button>Join</button>
          </div>
        </div>

        <div className="meeting-card">
          <div className="left">
            <div className="mini-icon orange">👥</div>
            <div>
              <h4>Team Sync-Up</h4>
              <p>Host: John Doe</p>
            </div>
          </div>

          <div className="right">
            <p>Tomorrow, 11:00 AM - 12:00 PM</p>
            <button>Join</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;