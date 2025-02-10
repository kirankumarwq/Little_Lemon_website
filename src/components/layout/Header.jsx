import { HashLink } from "react-router-hash-link";
import logoImage from "./assets/logo.png";
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
          {mobileNavLink.name && <span>{mobileNavLink.name}</span>}
        </Link>

        {/* Full Nav Menu (Desktop) */}
        <ul className="nav-bar-links">
          {navLinks.map((navLink, index) => (
            <li key={index} className="hover-underline-animation">
              {navLink.icon ? (
                <Link to={navLink.path}>
                  <img src={navLink.icon} alt="Profile" className="profile-pic" />
                </Link>
              ) : navLink.hashLink ? (
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
