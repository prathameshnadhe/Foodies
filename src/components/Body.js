import { useState } from "react";
import { restaurantList } from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurant, setRestoList] = useState(restaurantList);

  const TopRatedRestaurant = () => {
    setRestoList(
      listOfRestaurant.filter((res) => res.info.rating.aggregate_rating >= 4)
    );
  };

  return (
    <div className="body">
      {/* <div className="search">Search</div> */}
      <button className="top-rated-resto" onClick={TopRatedRestaurant}>
        Top Rated Restaurant
      </button>
      <div className="resto-container">
        {listOfRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} restoData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
