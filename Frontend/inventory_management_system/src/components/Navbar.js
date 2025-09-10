import React from 'react';

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand text-warning fs-3 fw-bold" href="/">
          {props.title || "Premium Store"}
        </a>
        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white fs-5" href="/products">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-5" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-5" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fs-5" href="/signup">Signup</a>
            </li>
          </ul>
          <form className="d-flex ms-4" role="search">
            <input className="form-control me-2 rounded-3" type="search" placeholder="Search" />
            <button className="btn btn-warning fw-semibold" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
