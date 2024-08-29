import React from "react";
import closeImg from "../utils/images/close.png";
import searchImg from "../utils/images/searchMini.png";

const SearchBar = ({ searchText, setSearchText, filterRestaurantCard }) => {
  const handleClearSearch = () => {
    setSearchText("");
    // filterRestaurantCard();
  };

  return (
    <div className="w-10/12 flex justify-center max-mobile:justify-between ml-auto mr-auto max-mobile:w-full max-tablet:w-full">
      <div className="m-4 flex items-center input-main">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              className="block w-[24rem] max-mobile:w-[14rem] max-tablet:w-[20rem] max-laptop:w-[20rem] p-4 ps-10 text-md text-gray-800 border-0 focus:outline-none shadow-custom rounded-lg bg-[#fff]"
              placeholder="Pizza, Burger, Biryani, Chinese..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="absolute end-[0.5rem] bottom-2.5 mobile:bottom-[0.4rem] cursor-pointer px-4 py-2 max-mobile:px-2 max-mobile:py-1"
              onClick={handleClearSearch}
            >
              {searchText.length !== 0 && (
                <img src={closeImg} alt="close" className="w-[25px] h-[25px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
