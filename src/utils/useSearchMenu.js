import { useState, useCallback } from "react";

const useSearch = (listOfRestaurant) => {
  const [searchText, setSearchText] = useState("");

  const filterRestaurantCard = useCallback(() => {
    const filteredRestaurant = listOfRestaurant.filter(
      (res) =>
        res?.info?.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (res?.info?.cuisines &&
          res?.info?.cuisines.some((cuisine) =>
            cuisine.toLowerCase().includes(searchText.toLowerCase())
          ))
    );
    return filteredRestaurant;
  }, [listOfRestaurant, searchText]);

  return {
    searchText,
    setSearchText,
    filterRestaurantCard,
  };
};

export default useSearch;
