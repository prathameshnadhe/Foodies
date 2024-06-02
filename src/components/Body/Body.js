import { useState, useEffect } from "react";
import RestaurantCard from "../RestourantCard/RestaurantCard";
import Shimmer from "../ShimmerUI/Shimmer";
import { Link } from "react-router-dom";
import "./Body.css";

const Body = () => {
  const [listOfRestaurant, serListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allRestaurantsBtn, setAllRestaurantsBtn] = useState(true);
  const base_url = process.env.REACT_APP_BASE_URL;

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

      serListOfRestaurant(list);
      setFilteredRestaurant(list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return listOfRestaurant && listOfRestaurant.length === 0 ? (
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
          <button onClick={topRatedRestaurants}>Top Rated Restaurants</button>
        ) : (
          <button onClick={allRestaurants}>All Restaurants</button>
        )}
      </div>
      <div className="resto-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            to={`/restaurant/${restaurant.info.id}`}
            className="resto-link"
            key={restaurant.info.id}
          >
            <RestaurantCard key={restaurant.info.id} restoData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
