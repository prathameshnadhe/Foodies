import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [resInfo, setResInfo] = useState(null);

  // fetchData
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(`${base_url}/restaurant/${resId}`);
    const json = await data.json();

    setResInfo(json?.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
