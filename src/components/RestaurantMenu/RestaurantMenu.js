import { useEffect, useState } from "react";
import RestoShimmer from "../ShimmerUI/RestoShimmer";
import RestaurantMenuCard from "../RestaurantMenuCard/RestaurantMenuCard";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import "./RestaurantMenu.css";
import useOnlineStatus from "../../utils/useOnlineStatus";
import RestaurantCategory from "../RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  // Custom Hook
  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();

  if (resInfo === null) {
    return <RestoShimmer />;
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (itemCategory) =>
        itemCategory.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log(categories);

  if (onlineStatus === false) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Looks like you'are offline!! Please check your internet connection;
      </h1>
    );
  }

  return categories && categories.length === 0 ? (
    <RestoShimmer />
  ) : (
    <div className="w-8/12 mx-auto my-0 text-center">
      <h1 className="font-bold my-6 text-3xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category) => (
        <RestaurantCategory data={category?.card?.card} />
      ))}
    </div>
  );
};

export default RestaurantMenu;
