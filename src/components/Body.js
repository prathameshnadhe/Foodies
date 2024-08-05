import { useState, useEffect } from "react";
import RestaurantCard, { withTopRated } from "./RestaurantCard";
import Shimmer from "./ShimmerUI/Shimmer";
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
      <div className="w-10/12 flex justify-between ml-auto mr-auto max-mobile:w-full max-tablet:w-full">
        <div className="m-4 flex items-center input-main">
          <input
            type="text"
            className="px-2 py-1 border border-solid border-black h-3 input-width rounded-sm max-mobile:w-[6rem]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg border-green-200"
            onClick={filterRestaurantCard}
          >
            Search
          </button>
        </div>
        <div className="flex items-center input-padding">
          {allRestaurantsBtn ? (
            <button
              className="px-4 py-2 bg-green-100 rounded-lg border-solid border-green-200"
              onClick={topRatedRestaurants}
            >
              Top Rated Restaurants
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-100 rounded-lg border-solid border-green-200"
              onClick={allRestaurants}
            >
              All Restaurants
            </button>
          )}
        </div>
      </div>
      <div className="w-10/12 flex flex-wrap auto-cols-min justify-center gap-2 ml-auto mr-auto">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            className="no-underline text-black mx-0 my-auto"
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
        ))}
      </div>
    </div>
  );
};

export default Body;
