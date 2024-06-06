import { Link } from "react-router-dom";
import logo from "../../utils/images/Foodies.jpg";
import { useState } from "react";
import "./Header.css"; // Ensure to import the CSS file

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header ">
      <div className="logo-container">
        <img className="logo" src={logo} alt="header_img" />
      </div>
      <div className={`nav-items ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" className="link" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link" onClick={toggleMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/grocery" className="link" onClick={toggleMenu}>
              Grocery
            </Link>
          </li>
          <li>
            <Link to="/cart" className="link" onClick={toggleMenu}>
              Cart
            </Link>
          </li>
          <button
            className="login link"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
              toggleMenu();
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
};

export default Header;
