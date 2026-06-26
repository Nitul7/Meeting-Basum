import "../styles/NewMeeting.css"
import { useNavigate } from "react-router"
import React, { useState } from "react"
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

function NewMeeting() {
  const navigate = useNavigate();
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [settings, setSettings] = useState({
    waitingRoom: true,
    hdVideo: false,
    muteOnEntry: true,
    screenShare: false,
    autoRecord: false
  });

  const handleSettingToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="new-main">
      <div className="start-text">
        <h1>Start New Meeting</h1>
        <p>Start an instant meeting and invite people to join.</p>
      </div>
      <div className="start-cards">
        <div className="start-now">
          <img className="start-logo" src="/start-logo.png"></img>
          <h3>Your meeting is ready!</h3>
          <p>Click the button below to start your Meeting</p>
          <button className="btn-start" onClick={() => navigate("/")}>
            <p>Start Meeting Now</p>
          </button>
        </div>
        <div className="enable-cards">
          <div className="camera-card">
            <div className="camera-img">
              <img src="/enable-camera.png"></img>
            </div>
            <span className="enable-text">Enable Camera</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isCameraEnabled}
                onChange={() => setIsCameraEnabled(!isCameraEnabled)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="microphone-card">
            <div className="microphone-img">
              <img src="/microphone-logo.png"></img>
            </div>
            <span className="enable-text">Enable Microphone</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={isMicEnabled}
                onChange={() => setIsMicEnabled(!isMicEnabled)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="settings-link-container" onClick={() => setShowSettings(true)}>
            <span>Meeting Settings</span>
            <span className="arrow">⚙️</span>
          </div>

        {/* --- POP-UP MODAL --- */}
        {showSettings && (
          <div className="modal-overlay" onClick={() => setShowSettings(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h4>Meeting Settings</h4>
                <button className="close-btn" onClick={() => setShowSettings(false)}>&times;</button>
              </div>

              <div className="modal-body">
                <div className="modal-setting-row">
                  <div className="setting-info">
                    <strong>Waiting Room</strong>
                    <small>Guests must be approved before joining</small>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={settings.waitingRoom} onChange={() => handleSettingToggle('waitingRoom')} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="modal-setting-row">
                  <div className="setting-info">
                    <strong>Auto Recording</strong>
                    <small>Enable recordings automatically</small>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={settings.autoRecord} onChange={() => handleSettingToggle('autoRecord')} />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="modal-setting-row">
                  <div className="setting-info">
                    <strong>Mute on Entry</strong>
                    <small>Participants join with audio off</small>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={settings.muteOnEntry} onChange={() => handleSettingToggle('muteOnEntry')} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <button className="save-btn" onClick={() => setShowSettings(false)}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div >
  );
}

export default NewMeeting;