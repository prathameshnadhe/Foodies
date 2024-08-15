import { useState } from "react";
import RestoShimmer from "./RestoShimmer";
import { Link, useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCategory from "./RestaurantCategory";
import cartImg from "./../utils/images/cart.png";
import { useSelector } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(0);

  // Custom Hook
  const resInfo = useRestaurantMenu(resId);
  const onlineStatus = useOnlineStatus();

  // Subscribing to the store using Selector\
  const cartItems = useSelector((store) => store.cart.items);

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

  return categories && categories.length !== 0 ? (
    <RestoShimmer />
  ) : (
    <div className="mx-auto my-0 text-center w-full mobile:w-8/12 tablet:w-6/12 laptop:w-6/12 desktop:w-5/12">
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
      {/* Cart Section */}
      {cartItems.length !== 0 && (
        <Link to="/cart">
          <div className="flex justify-between items-center p-2 text-white fixed bottom-0 left-0 right-0 font-bold bg-[#60b246] text-xl mx-auto w-full mobile:w-8/12 tablet:w-6/12 laptop:w-6/12 desktop:w-5/12">
            <p className=" ml-2">{cartItems.length} item added</p>
            <div className="flex justify-between mr-2 items-center max-mobile:mr-4">
              <div className="mr-2">VIEW CART </div>
              <img src={cartImg} alt="" className="w-8 h-8" />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default RestaurantMenu;
