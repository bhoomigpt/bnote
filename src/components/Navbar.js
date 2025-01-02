import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bnotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active-link" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active-link" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/something-else">
                    Something Else
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link disabled">Disabled</span>
            </li>
          </ul>
          {/* Add Sign Up and Login Buttons */}
          <div className="d-flex">
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
