import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to InventoryPro</h1>
          <p className="hero-subtitle">
            The most efficient and beautiful Inventory Management System built with MERN.
          </p>
          <a href="/products" className="hero-button">Go to Products Section</a>
        </div>
        <div className="hero-image">
          <img src="https://www.investopedia.com/thmb/__fFYykFeBtgHks2OVJ-eyM4W-0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/inventory-management-8595e839c2884128997ca77f00a8da2b.jpg" alt="Inventory" />
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Tracking</h3>
            <p>Monitor stock and updates in real time with powerful analytics.</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Scalable</h3>
            <p>Built on MERN stack ensuring high performance and data protection.</p>
          </div>
          <div className="feature-card">
            <h3>Beautiful Dashboard</h3>
            <p>Enjoy an intuitive, stunning UI experience optimized for all devices.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
