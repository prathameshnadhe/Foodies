import { useState, useEffect } from "react";

const useRestaurants = (base_url) => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [index, setIndex] = useState(9);
  const [nextOffset, setNextOffset] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [allRestaurantsBtn, setAllRestaurantsBtn] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${base_url}/restaurants`);
      const json = await response.json();
      const list =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setListOfRestaurant(list);
      setFilteredRestaurant(list);
      setNextOffset(json?.data?.pageOffset?.nextOffset);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoreData = async () => {
    if (loading || !hasMore || searchActive) return;

    setLoading(true);
    try {
      const data = await fetch(
        `${base_url}/restaurantsUpdate?offset=${nextOffset}&collection=${index}`
      );
      const json = await data.json();

      const list =
        json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (Array.isArray(list) && list.length > 0) {
        setListOfRestaurant((prevItems) => [...prevItems, ...list]);
        setFilteredRestaurant((prevItems) => [...prevItems, ...list]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      const newOffset = json?.data?.pageOffset?.nextOffset;
      if (newOffset) {
        setNextOffset(newOffset);
      }

      setIndex(
        json?.data?.pageOffset?.widgetOffset
          ?.collectionV5RestaurantListWidget_SimRestoRelevance_food_seo
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    listOfRestaurant,
    filteredRestaurant,
    setFilteredRestaurant,
    loading,
    fetchMoreData,
    searchActive,
    setSearchActive,
    allRestaurantsBtn,
    setAllRestaurantsBtn,
  };
};

export default useRestaurants;
