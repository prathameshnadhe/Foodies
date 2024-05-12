import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { restoList } from "../utils/restoList";

const Body = () => {
  const [listOfRestaurant, serListOfRestaurant] = useState(restoList);

  const topRatedRestaurants = () => {
    const filteredList = listOfRestaurant.filter(
      (restaurant) => restaurant.info.avgRating >= 4.0
    );
    serListOfRestaurant(filteredList);
  };

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => console.log(topRatedRestaurants())}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="resto-container">
        {listOfRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} restoData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
