import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";

const RecommendedDishRestaurantList = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [restoList, setRestoList] = useState([]);
  const { collectionId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `${base_url}/recommendedDishRestoList/${collectionId}`
      );
      const json = await data.json();

      setRestoList(json?.data?.cards);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(restoList);

  const restaurants = restoList?.filter(
    (itemCategory) =>
      itemCategory.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );

  return (
    <div>
      {restaurants && restaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="w-10/12 max-tablet:w-full max-desktop:w-9/12 lg_desktop:w-9/12 mx-auto">
          <div className="mt-8 ml-2 max-mobile:w-10/12 max-mobile:mx-auto">
            <p className="text-4xl font-bold opacity-[0.9]">
              {restoList[0]?.card?.card?.title}
            </p>
            <p className="text-xl mt-2 mb-10 opacity-[0.8] max-mobile:text-base">
              {restoList[0]?.card?.card?.description}
            </p>
          </div>
          <div className="grid grid-cols-1 mobile:grid-cols-3 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 lg_desktop:grid-cols-6 gap-y-3 gap-x-2 mx-auto my-0 mt-4">
            {restaurants.map((restaurant) => (
              <Link
                to={`/restaurant/${restaurant?.card?.card?.info?.id}`}
                className="no-underline text-black mx-auto my-0"
                key={restaurant?.card?.card?.info?.id}
              >
                <RestaurantCard
                  key={restaurant?.card?.card?.info?.id}
                  restoData={restaurant?.card?.card}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedDishRestaurantList;
