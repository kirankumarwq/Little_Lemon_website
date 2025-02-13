import { HashLink } from "react-router-hash-link";
import logoImage from "./assets/logo.png";
import "./header.css";
import { Link } from "react-router-dom";
import { useCart } from "../../components/pages/onlineOrder/CartContext"; // ✅ Import CartContext

const Header = ({ navLinks, mobileNavLink }) => {
  const { cartItems } = useCart(); // ✅ Get cart data
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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
              {navLink.path === "/order-online" ? (
                <Link to={navLink.path}>
                  Order Online {totalItems > 0 && <span className="cart-badge">({totalItems})</span>}
                </Link>
              ) : navLink.icon ? (
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
