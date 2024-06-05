import { useEffect, useState } from "react";
import RestoShimmer from "../ShimmerUI/RestoShimmer";
import RestaurantMenuCard from "../RestaurantMenuCard/RestaurantMenuCard";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import "./RestaurantMenu.css";
import useOnlineStatus from "../../utils/useOnlineStatus";

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
      <h1 style={{ fontSize: "3rem" }}>{name}</h1>
      <p style={{ fontSize: "1.2rem" }}>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <div>
        {itemCards === undefined || itemCards?.length < 15
          ? maxItems.map((menu) => (
              <RestaurantMenuCard key={menu.card.info.id} menuData={menu} />
            ))
          : itemCards?.map((menu) => (
              <RestaurantMenuCard key={menu.card.info.id} menuData={menu} />
            ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
