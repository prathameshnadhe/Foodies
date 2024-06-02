import { useEffect, useState } from "react";
import { MENU_API } from "../../utils/constants";
import RestoShimmer from "../ShimmerUI/RestoShimmer";
import RestaurantMenuCard from "../RestaurantMenuCard/RestaurantMenuCard";
import { useParams } from "react-router-dom";
import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const base_url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(`${base_url}/restaurant/${resId}`);
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

  return itemCards && itemCards.length === 0 ? (
    <RestoShimmer />
  ) : (
    <div className="menu section">
      <h1 style={{ fontSize: "3rem" }}>{name}</h1>
      <p style={{ fontSize: "1.2rem" }}>
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
