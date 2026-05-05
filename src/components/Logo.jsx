import React from "react";
import "../styles/Logo.css";
import logoImage from "../assets/logo.jpg";

const Logo = () => {
  return (
    <div className="logo">
      <div><img src={logoImage} alt="Logo" /></div>
      <span>मीतिंग Basum</span>
    </div>
  );
};

export default Logo;