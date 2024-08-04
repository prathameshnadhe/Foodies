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

  const recommendedMenu =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) => card.card.card.title === "Recommended"
    );

  const maxItemCards =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.reduce(
      (maxCard, currentCard) => {
        const currentItemCards = currentCard?.card?.card?.itemCards;

        if (
          currentItemCards &&
          (!maxCard ||
            currentItemCards.length > maxCard?.card?.card?.itemCards?.length)
        ) {
          return currentCard;
        }

        return maxCard;
      },
      null
    );

  const maxItems = maxItemCards.card.card.itemCards;

  const itemCards = recommendedMenu[0]?.card?.card?.itemCards;

  console.log(resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

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

  return itemCards && itemCards.length === 0 ? (
    <RestoShimmer />
  ) : (
    <div className="menu section">
      <h1 className="font-bold my-6">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* <div>
        {itemCards === undefined || itemCards?.length < 8
          ? maxItems.map((menu) => (
              <RestaurantMenuCard key={menu.card.info.id} menuData={menu} />
            ))
          : itemCards?.map((menu) => (
              <RestaurantMenuCard key={menu.card.info.id} menuData={menu} />
            ))}
      </div> */}

      {categories.map((category) => (
        <RestaurantCategory data={category?.card?.card} />
      ))}
    </div>
  );
};

export default RestaurantMenu;
