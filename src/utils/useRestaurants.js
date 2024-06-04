import { useEffect, useState } from "react";

const useRestaurants = () => {
  const [list, setList] = useState([]);
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(`${base_url}/restaurants`);
      const json = await data.json();

      setList(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(list);
  return list;
};

export default useRestaurants;
