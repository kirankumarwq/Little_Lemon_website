import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUtensils, FaConciergeBell, FaShoppingCart } from "react-icons/fa";
import "./bottomNav.css";

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <Link to="/" className="nav-item">
        <FaHome />
        <span>Home</span>
      </Link>
      <Link to="/menu" className="nav-item">
        <FaUtensils />
        <span>Menu</span>
      </Link>
      <Link to="/reservations" className="nav-item">
        <FaConciergeBell />
        <span>Reservations</span>
      </Link>
      <Link to="/orderOnline" className="nav-item">
        <FaShoppingCart />
        <span>Order</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
