import React from 'react';
import './About.css'; // We'll define styles here

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">Inventory Management System</h1>
        <h2 className="about-subtitle">MERN Stack CRUD Application</h2>
        <p className="about-description">
          Our Inventory Management System is a powerful web application built using the MERN stack (MongoDB, Express, React, Node.js).
          It enables users to manage products, stock, categories, and transactions with a modern, responsive interface.
          Designed for both efficiency and elegance, it provides a seamless experience for tracking and maintaining inventory.
        </p>
        <div className="about-features">
          <h3>Key Features</h3>
          <ul>
            <li>Real-time Product Tracking</li>
            <li>Advanced CRUD Operations</li>
            <li>Role-based User Access</li>
            <li>Responsive Admin Dashboard</li>
            <li>Beautiful UI/UX Design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
