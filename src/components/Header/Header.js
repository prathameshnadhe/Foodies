import { Link } from "react-router-dom";
import logo from "../../utils/images/Foodies.jpg";
import { useState } from "react";
import "./Header.css"; // Ensure to import the CSS file

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#fff] shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div className="h-20">
          <img className="h-20" src={logo} alt="header_img" />
        </div>
        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="list-none font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 bg-[#fff]">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded md:bg-transparent md:p-0"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded md:bg-transparent md:p-0"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded md:bg-transparent md:p-0"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/grocery"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded md:bg-transparent md:p-0"
                onClick={closeMenu}
              >
                Grocery
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded md:bg-transparent md:p-0"
                onClick={closeMenu}
              >
                Cart
              </Link>
            </li>
            <li
              className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded md:bg-transparent md:p-0"
              onClick={() => {
                setBtnName(btnName === "Login" ? "Logout" : "Login");
                closeMenu();
              }}
            >
              {btnName}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
