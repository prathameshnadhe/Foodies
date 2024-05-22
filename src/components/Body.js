import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { HOME_API } from "../utils/constants";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurant, serListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allRestaurantsBtn, setAllRestaurantsBtn] = useState(true);

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
    const data = await fetch(HOME_API);
    const json = await data.json();
    const list =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    serListOfRestaurant(list);
    setFilteredRestaurant(list);
  };

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={filterRestaurantCard}>Search</button>
        </div>
        {allRestaurantsBtn ? (
          <button className="filter-btn" onClick={topRatedRestaurants}>
            Top Rated Restaurants
          </button>
        ) : (
          <button className="filter-btn" onClick={allRestaurants}>
            All Restaurants
          </button>
        )}
      </div>
      <div className="resto-container">
        {filteredRestaurant.map((restaurant) => (
          <Link to={`/restaurant/${restaurant.info.id}`} className="resto-link">
            <RestaurantCard key={restaurant.info.id} restoData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
