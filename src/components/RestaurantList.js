import React from "react";
import { Link } from "react-router-dom";
import RestaurantCard, { withTopRated } from "./RestaurantCard";

const RestaurantList = ({ filteredRestaurant, listOfRestaurant }) => {
  const RestaurantCardTopRated = withTopRated(RestaurantCard);
  const title = listOfRestaurant?.data?.cards[2]?.card?.card?.title;

  return (
    <div>
      <div className="w-10/12 max-tablet:w-full max-desktop:w-9/12 lg_desktop:w-9/12 mx-auto my-0">
        <p className="text-2xl font-bold opacity-[0.9] max-mobile:text-xl mx-4">
          {title}
        </p>
        <div className="grid grid-cols-1 mobile:grid-cols-3 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 lg_desktop:grid-cols-6 gap-y-3 gap-x-2 mx-auto my-0 mt-4">
          {filteredRestaurant?.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              className="no-underline text-black mx-auto my-0"
              key={restaurant.info.id}
            >
              {restaurant.info.avgRating >= 4.5 ? (
                <RestaurantCardTopRated
                  key={restaurant.info.id}
                  restoData={restaurant}
                />
              ) : (
                <RestaurantCard
                  key={restaurant.info.id}
                  restoData={restaurant}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
