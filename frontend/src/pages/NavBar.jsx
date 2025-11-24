import React from "react";
import { Link, useLocation } from "react-router-dom";
import HeroImage from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LEFT SIDE - Logo */}
        <div className="navbar-left">
          <img src={HeroImage} alt="GoSuk Logo" className="logo-img" />
          <span className="logo-text">GoSuk</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-right">
          <nav className="nav-links">
            <Link to="/" className={linkClasses("/")}>Home</Link>

            {/* ✅ FIXED — Use the correct route */}
            <Link to="/supermarkets" className={linkClasses("/supermarkets")}>
              Suk
            </Link>

            <Link to="/cart" className={linkClasses("/cart")}>Cart</Link>
            <Link to="/Orders" className={linkClasses("/Orders")}>Orders</Link>
            <Link to="/CustomerSignup" className={linkClasses("/CustomerSignup")}>Signup</Link>
          </nav>

          <Link to="/join-us" className="join-btn">Join Us</Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
