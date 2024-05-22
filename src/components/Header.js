import { Link } from "react-router-dom";
import logo from "../utils/Foodies.jpg";
import { useEffect, useState } from "react";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  // console.log("Header render");

  // useEffect(() => {
  //   console.log("useEffect called");
  // }, [btnName]);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="header_img" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              Contact Us
            </Link>
          </li>
          <li>Cart</li>
          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
