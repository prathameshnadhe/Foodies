import { useEffect, useState } from "react";
import logo from "../utils/Foodies.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  // const btnName = "Login";
  const [btnName, setBtnName] = useState("Login");

  // if no dependency array => useEffect is called on every render
  // if dependency array is empty = [] => useEffect is called on initial render( just once)
  // if dependency array is [btnName] => called everytime btnName is updated
  // useEffect(() => {
  //   console.log("useEffect called");
  // }, [btnName]);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="Foodies logo" />
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
          <li>
            <Link to="#" className="link">
              Cart
            </Link>
          </li>
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
