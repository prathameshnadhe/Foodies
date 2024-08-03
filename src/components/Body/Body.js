import { useState, useEffect } from "react";
import RestaurantCard, { withTopRated } from "../RestourantCard/RestaurantCard";
import Shimmer from "../ShimmerUI/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import "./Body.css";

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

  console.log("listOfRestaurant", listOfRestaurant);

  return listOfRestaurant && listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="m-4 px-4 flex items-center w-[100%] input-main">
          <input
            type="text"
            className="px-2 py-1 border border-solid border-black h-3 input-width"
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
        <div className="m-4 px-4 flex items-center input-padding">
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
      <div className="resto-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            className="resto-link"
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
