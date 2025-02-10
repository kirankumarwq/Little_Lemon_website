import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "./assets/logo.png";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ navLinks, mobileNavLink }) => {
  return (
    <header className="header">
      <nav className="container grid nav-bar">
        {/* Logo */}
        <Link className="nav-bar-logo" to="/">
          <img src={logoImage} alt="Little Lemon logo" />
        </Link>

        {/* Mobile Profile/Login Button */}
        <Link to={mobileNavLink.path} className="login-btn mobile-only">
          <img src={mobileNavLink.icon} alt="Profile" className="profile-pic" />
          <span>{mobileNavLink.name}</span>
        </Link>

        {/* Full Nav Menu */}
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
