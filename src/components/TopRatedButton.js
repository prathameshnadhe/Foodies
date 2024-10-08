import React from "react";

const TopRatedButton = ({
  listOfRestaurant,
  setFilteredRestaurant,
  setAllRestaurantsBtn,
  allRestaurantsBtn,
  setSearchActive,
}) => {
  const topRatedRestaurants = () => {
    const list =
      listOfRestaurant.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setSearchActive(false);
    const filteredList = list.filter(
      (restaurant) => restaurant.info.avgRating >= 4.5
    );
    setFilteredRestaurant(filteredList);
    setAllRestaurantsBtn(false);
  };

  const allRestaurants = () => {
    const list =
      listOfRestaurant.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setSearchActive(false);
    setFilteredRestaurant(list);
    setAllRestaurantsBtn(true);
  };

  return (
    <div className="flex items-center input-padding">
      {allRestaurantsBtn ? (
        <button
          className="px-4 py-2 bg-green-200 text-black rounded-lg font-bold border-1 border-green-800 hover:bg-green-400 hover:border-green-500 cursor-pointer max-mobile:px-2 max-mobile:py-1 max-mobile:mr-4 opacity-[0.9]"
          onClick={topRatedRestaurants}
        >
          Top Rated Restaurants
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-green-200 text-black rounded-lg font-bold border-1 border-green-800 hover:bg-green-400 hover:border-green-500 cursor-pointer max-mobile:px-2 max-mobile:py-1 max-mobile:mr-4 opacity-[0.9]"
          onClick={allRestaurants}
        >
          All Restaurants
        </button>
      )}
    </div>
  );
};

export default TopRatedButton;
