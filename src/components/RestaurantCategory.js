import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data }) => {
  const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    setShowItems(!showItems);
  };

  return (
    <div>
      {/* Header */}
      <div className="mx-auto my-4 bg-[#fff] p-4 w-8/12 max-laptop:w-9/12 max-tablet:w-full max-mobile:w-full">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        {showItems && <ItemList items={data.itemCards} />}
      </div>
      <div className="h-4 border-b-[16px] mx-auto bg-[#e6e6e6] w-8/12 max-laptop:w-9/12"></div>
      {/* Accordion body */}
    </div>
  );
};

export default RestaurantCategory;
