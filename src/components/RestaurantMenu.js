import { useState } from "react";
import RestoShimmer from "./RestoShimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(0);
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
    <div className="mx-auto my-0 text-center w-full mobile:w-10/12 tablet:w-8/12 laptop:w-8/12 desktop:w-8/12">
      <h1 className="font-bold my-6 text-3xl max-mobile:text-2xl">{name}</h1>
      <p className="font-bold text-lg max-mobile:text-sm">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {categories.map((category, index) => (
        // Controlled Component
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
          setShowIndexClose={() => setShowIndex(null)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
