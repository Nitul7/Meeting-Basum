import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import Logo from "./Logo";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";
import { logout } from "../services/AuthService";

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const handleClickOutside = (e) => {
      if (!e.target.closest('.profile')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="navbar">

      {/* RIGHT */}
      <div className="navbar-right">
        <div className="datetime">
          <span>📅 {formattedDate}</span>
          <span>|</span>
          <span>🕒 {formattedTime}</span>
        </div>

        {/* Notification */}
        <div className="notification">
          <NotificationsIcon />
        </div>

        {/* Profile */}
        <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
          <img src="src\assets\mee.JPG" alt="profile" />
          <span>Nitul Tako</span>
          <ExpandMoreOutlinedIcon style={{ fontSize: "18px" }} />

          {showDropdown && (
            <div className="profile-dropdown-menu">
              <div className="dropdown-item profile-item" onClick={() => navigate('/profile')}>
                <PersonIcon />
                <span>Profile</span>
              </div>
              <div className="dropdown-item settings-item" onClick={() => navigate('/profile')}>
                <SettingsIcon />
                <span>Settings</span>
              </div>
              <div className="dropdown-item logout-item" onClick={() => {
                logout();
                navigate('/login');
              }}>
                <LogoutIcon />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;