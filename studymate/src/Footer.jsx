// src/Footer.jsx

import React from "react";
import "./Footer.css"; // We'll create this CSS file next

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>
        Designed & Developed by {""}
        <a
          href="" // Optional: Link to your profile
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          CVR
        </a>
      </p>
    </footer>
  );
}