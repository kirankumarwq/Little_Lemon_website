import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "./assets/logo.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ navLinks }) => {
  return (
    <header className="header">
      <nav className="container grid nav-bar">
        {/* Logo */}
        <Link className="nav-bar-logo" to="/">
          <img src={logoImage} alt="Little Lemon logo" />
        </Link>

        {/* Login Button (Only on Mobile) */}
        <Link to="/login" className="login-btn">
        <FontAwesomeIcon icon={faUser} className="login-icon" style={{ marginRight: "8px" }}/>
        <span>Login</span>
      </Link>

        {/* Full Nav Menu (Only Visible on Larger Screens) */}
        <ul className="nav-bar-links">
          {navLinks.map((navLink) => (
            <li key={navLink.name} className="hover-underline-animation">
              {navLink.hashLink ? (
                <HashLink to={navLink.path}>{navLink.name}</HashLink>
              ) : (
                <Link to={navLink.path}>{navLink.name}</Link>
              )}
          </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
