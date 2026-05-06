import React from "react";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="glitch" data-text="404">
        404
      </h1>

      <h2 className="title">Oops! Page Not Found</h2>

      <p className="message">Connection lost with this page 💀</p>

      <div className="buttons">
        <button className="btn-primary" onClick={() => (window.location.href = "/")}>
          🔙 Go Back Home
        </button>

        <button className="btn-secondary" onClick={() => window.location.reload()}>
          🔄 Retry Connection
        </button>
      </div>
    </div>
  );
};

export default NotFound;