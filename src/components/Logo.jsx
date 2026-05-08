import React from "react";
import "../styles/Logo.css";
import logoImage from "../assets/logo.jpg";

const Logo = () => {
  return (
    <div className="logo">
      <svg className="login-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
        <g fill="#374151">

          <circle cx="56" cy="74" r="14" />
          <path d="M50 94h-4c-6.6 0-12 5.4-12 12v18c0 4.4 3.6 8 8 8h4c2.2 0 4-1.8 4-4v-12h8l14 8c1.3.7 2.9.7 4.2 0l10-6c1.8-1.1 2.3-3.4 1.2-5.2s-3.4-2.3-5.2-1.2l-8 4.8-11-6.3V98c0-2.2-1.8-4-4-4z" />
          <path d="M50 136h6l8 32c.5 2.1-1 4.2-3.1 4.5-.2 0-.4 0-.6 0h-4c-1.8 0-3.3-1.2-3.7-2.9l-6.3-25.2c-.3-1.2-1.4-2-2.6-2h-3c-1.7 0-3-1.3-3-3s1.3-3 3-3z" />

          <circle cx="100" cy="68" r="14" />
          <path d="M100 88c-12.2 0-22 9.8-22 22v6c0 1.7 1.3 3 3 3h38c1.7 0 3-1.3 3-3v-6c0-12.2-9.8-22-22-22z" />

          <circle cx="144" cy="74" r="14" />
          <path d="M150 94h-4c-2.2 0-4 1.8-4 4v11.7l-11 6.3-8-4.8c-1.8-1.1-4.1-.5-5.2 1.2-1.1 1.8-.5 4.1 1.2 5.2l10 6c1.3.7 2.9.7 4.2 0l14-8h8v12c0 2.2 1.8 4 4 4h4c4.4 0 8-3.6 8-8v-18c0-6.6-5.4-12-12-12z" />
          <path d="M153 136c1.7 0 3 1.3 3 3s-1.3 3-3 3h-3c-1.2 0-2.3.8-2.6 2l-6.3 25.2c-.4 1.7-1.9 2.9-3.7 2.9h-4c-2.2 0-4-1.8-4-4 0-.2 0-.4.1-.6l8-32.1h5.6z" />

          <path d="M60 119h80c2.8 0 5 2.2 5 5s-2.2 5-5 5H60c-2.8 0-5-2.2-5-5s2.2-5 5-5z" />
        </g>
      </svg>
      <span className="brand-name">Meeting बसौँ</span>
    </div>
  );
};

export default Logo;