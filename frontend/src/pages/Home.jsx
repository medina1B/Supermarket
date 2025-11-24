import React from "react"; 
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.png";
import SupermarketList from "./SupermarketList";
 // ✅ Import the component
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-image">
        <img src={HeroImage} alt="Hero Section" />
      </div>

      {/* At a Glance Section */}
      <section className="glance-section">
        <h2>At a Glance</h2>
        <div className="stats-grid">
          <div>
            <h3>750</h3>
            <p>Partners</p>
          </div>
          <div>
            <h3>150000+</h3>
            <p>Monthly Orders</p>
          </div>
          <div>
            <h3>19</h3>
            <p>Districts</p>
          </div>
          <div>
            <h3>500+</h3>
            <p>Drivers</p>
          </div>
        </div>
      </section>

      {/* Nearby Supermarkets Section */}
      <section className="supermarkets-section">
        <h3 className="section-title">Supermarkets Nearby</h3>
        <SupermarketList /> {/* ✅ Render the list here */}
      </section>

    
    </div>
  );
};

export default Home;
