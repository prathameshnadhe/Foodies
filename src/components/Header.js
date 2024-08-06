import { Link } from "react-router-dom";
import logo from "./../utils/images/Foodies.jpg";
import { useState } from "react";

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
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 my-4 tablet:ml-[3rem] tablet:mr-[3rem]">
        <div className="h-20">
          <img className="h-20" src={logo} alt="header_img" />
        </div>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 justify-center text-sm text-green-500 rounded-lg tablet:hidden hover:bg-gray-100 focus:outline-none"
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
          className={`w-full tablet:flex tablet:items-center tablet:w-auto ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="list-none font-medium flex flex-col items-center p-4 tablet:p-0 mt-4 border border-gray-100 rounded-lg tablet:flex-row tablet:space-x-8 rtl:space-x-reverse tablet:mt-0 bg-[#fff] tablet:border-none tablet:bg-transparent">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded tablet:bg-transparent tablet:p-0"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded tablet:bg-transparent tablet:p-0"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded tablet:bg-transparent tablet:p-0"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/grocery"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded tablet:bg-transparent tablet:p-0"
                onClick={closeMenu}
              >
                Grocery
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded tablet:bg-transparent tablet:p-0"
                onClick={closeMenu}
              >
                Cart
              </Link>
            </li>
            <li
              className="block py-2 px-3 no-underline text-black text-2xl hover:text-orange-600 rounded tablet:bg-transparent tablet:p-0"
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
