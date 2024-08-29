import React, { useEffect } from "react";
import useFetchRestaurants from "../utils/useRestaurants";
import useSearch from "../utils/useSearchMenu";
import useInfiniteScroll from "../utils/useInfiniteScroll";
import RestaurantList from "./RestaurantList";
import TopRatedButton from "./TopRatedButton";
import SearchBar from "./SearchBar";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import SearchRestaurantList from "./SearchRestaurantList";

const Body = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const {
    listOfRestaurant,
    filteredRestaurant,
    setFilteredRestaurant,
    loading,
    fetchMoreData,
    searchActive,
    setSearchActive,
    allRestaurantsBtn,
    setAllRestaurantsBtn,
  } = useFetchRestaurants(base_url);

  const { searchText, setSearchText, filterRestaurantCard } =
    useSearch(listOfRestaurant);

  // Update filtered restaurants when searchText changes
  useEffect(() => {
    const filteredList = filterRestaurantCard();
    setFilteredRestaurant(filteredList);
  }, [searchText, filterRestaurantCard, setFilteredRestaurant]);

  useInfiniteScroll(fetchMoreData, true, loading, searchActive);

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1 className="text-center">
        Looks like you're offline!! Please check your internet connection.
      </h1>
    );
  }

  return listOfRestaurant && listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="ml-auto mr-auto">
      <div className="m-4 flex justify-center items-center input-main">
        <div>
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            filterRestaurantCard={filterRestaurantCard}
          />
        </div>
        <div>
          <TopRatedButton
            listOfRestaurant={listOfRestaurant}
            setFilteredRestaurant={setFilteredRestaurant}
            setAllRestaurantsBtn={setAllRestaurantsBtn}
            allRestaurantsBtn={allRestaurantsBtn}
            setSearchActive={setSearchActive}
          />
        </div>
      </div>
      {searchText.length !== 0 ? (
        <SearchRestaurantList searchText={searchText} />
      ) : (
        <RestaurantList filteredRestaurant={filteredRestaurant} />
      )}
    </div>
  );
};

export default Body;
