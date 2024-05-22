import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";
import RestoShimmer from "./RestoShimmer";
import RestaurantMenuCard from "./RestaurantMenuCard";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();

    setResInfo(json?.data);
  };

  if (resInfo === null) {
    return <RestoShimmer />;
  }

  const { name, cuisines, cloudinaryImageId, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  const recommendedMenu =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (card) => card.card.card.title === "Recommended"
    );

  const itemCards = recommendedMenu[0]?.card?.card?.itemCards;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      <div>
        {!itemCards || itemCards.length === 0 ? (
          <p>No menu items available</p>
        ) : (
          itemCards.map((menu) => (
            <RestaurantMenuCard key={menu.card.info.id} menuData={menu} />
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
