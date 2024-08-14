import { useState, useEffect } from "react";
import RestaurantCard, { withTopRated } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allRestaurantsBtn, setAllRestaurantsBtn] = useState(true);
  const base_url = process.env.REACT_APP_BASE_URL;

  const onlineStatus = useOnlineStatus();

  const RestaurantCardTopRated = withTopRated(RestaurantCard);

  const topRatedRestaurants = () => {
    const filteredList = listOfRestaurant.filter(
      (restaurant) => restaurant.info.avgRating >= 4.5
    );
    setFilteredRestaurant(filteredList);
    setAllRestaurantsBtn(false);
  };

  const allRestaurants = () => {
    setFilteredRestaurant(listOfRestaurant);
    setAllRestaurantsBtn(true);
  };

  const filterRestaurantCard = () => {
    const filteredRestaurant = listOfRestaurant.filter(
      (res) =>
        res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) || // Check if name includes searchText
        (res?.info?.cuisines && // Check if cuisines array exists
          res?.info?.cuisines.some((cuisine) =>
            cuisine.toLowerCase().includes(searchText.toLowerCase())
          ))
    );
    setFilteredRestaurant(filteredRestaurant);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(`${base_url}/restaurants`);
      const json = await data.json();
      const list =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setListOfRestaurant(list);
      setFilteredRestaurant(list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (onlineStatus === false) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Looks like you'are offline!! Please check your internet connection;
      </h1>
    );
  }

  return listOfRestaurant && listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="ml-auto mr-auto">
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
                className="block w-[24rem] max-mobile:w-[11rem] max-tablet:w-[20rem] max-laptop:w-[20rem] p-4 ps-10 text-md text-gray-800 border-0 focus:outline-none shadow-custom rounded-lg bg-[#fff]"
                placeholder="Pizza, Burger, Biryani..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="text-black font-bold absolute end-[1rem] bottom-2.5 mobile:bottom-[0.4rem] bg-green-200 border-solid border-green-300 cursor-pointer hover:bg-green-300 hover:border-green-500 rounded-lg text-md px-4 py-2 max-mobile:px-2  max-mobile:py-1"
                onClick={filterRestaurantCard}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center input-padding">
          {allRestaurantsBtn ? (
            <button
              className="px-4 py-2 bg-green-100 text-black rounded-lg font-bold border-solid border-green-300 hover:bg-green-300 hover:border-green-500 cursor-pointer max-mobile:px-2 max-mobile:py-1 max-mobile:mr-4"
              onClick={topRatedRestaurants}
            >
              Top Rated Restaurants
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-100 text-black rounded-lg font-bold border-solid border-green-300 hover:bg-green-300 hover:border-green-500 cursor-pointer"
              onClick={allRestaurants}
            >
              All Restaurants
            </button>
          )}
        </div>
      </div>
      <div className="w-10/12 max-tablet:w-full max-desktop:w-9/12 lg_desktop:w-9/12 grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 lg_desktop:grid-cols-6 gap-y-3 mx-auto my-0 mt-4">
        {filteredRestaurant.length === 0 ? (
          <div className="text-xl">
            No match found for "<span className="font-bold">{searchText}</span>"
          </div>
        ) : (
          filteredRestaurant.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              className="no-underline text-black mx-auto my-0 "
              key={restaurant.info.id}
            >
              {
                /* If the restaurant has avgRating greater than 4.5 then label it as Top Rated */
                restaurant.info.avgRating >= 4.5 ? (
                  <RestaurantCardTopRated
                    key={restaurant.info.id}
                    restoData={restaurant}
                  />
                ) : (
                  <RestaurantCard
                    key={restaurant.info.id}
                    restoData={restaurant}
                  />
                )
              }
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Body;
