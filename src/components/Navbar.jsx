import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import Logo from "./Logo";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
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
        <div className="profile">
          <img src="src\assets\mee.JPG" alt="profile" />
          <span>Nitul Tako</span>
          <span><ExpandMoreOutlinedIcon /></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;