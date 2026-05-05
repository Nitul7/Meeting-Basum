import React, { useState } from "react";
import "../styles/Sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LinkIcon from '@mui/icons-material/Link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import Logo from "./Logo";
import { NavLink } from "react-router";


const menuItems = [
  { name: "Dashboard", navlink: "/", icon: <HomeIcon /> },
  { name: "New Meeting", navlink: "/new-meeting", icon: <PlayArrowIcon /> },
  { name: "Join Meeting", navlink: "/join-meeting", icon: <LinkIcon /> },
  { name: "Calendar", navlink: "/calender", icon: <CalendarTodayIcon /> },
  { name: "Schedule Meeting", navlink: "/schedule-meeting", icon: <AccessTimeIcon /> },
  { name: "Profile Settings", navlink: "/profile", icon: <PersonIcon /> },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
       <Logo />
      </div>
      
      {/* MENU */}
      <div className="menu">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.navlink}
            className={`menu-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleMenuClick(index)}
          >
            <span className="icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;