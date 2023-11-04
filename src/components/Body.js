import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { HOME_API } from "../utils/constant";
import { Link } from "react-router-dom";

const Body = () => {
  const [listOfRestaurant, setRestoList] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const TopRatedRestaurant = () => {
    setRestoList(listOfRestaurant.filter((res) => res.info.avgRating > 4.2));
  };

  // Filter the restaurant cards and update the UI
  const SearchRestaurant = () => {
    setfilteredRestaurant(
      listOfRestaurant.filter((resto) =>
        resto.info.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(HOME_API);

    const json = await data.json();
    // Optional Chaining
    const restoList =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setRestoList(restoList);
    setfilteredRestaurant(restoList);
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
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button onClick={SearchRestaurant}>Search</button>
        </div>
        <button className="top-rated-resto" onClick={TopRatedRestaurant}>
          Top Rated Restaurant
        </button>
      </div>
      <div className="resto-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
            className="link"
          >
            <RestaurantCard restoData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
