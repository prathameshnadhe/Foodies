import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({
  data,
  showItems,
  setShowIndex,
  setShowIndexClose,
}) => {
  const handleClick = () => {
    setShowIndex();
    if (showItems) {
      setShowIndexClose();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mx-auto my-4 bg-[#fff]  w-8/12 max-laptop:w-9/12 max-tablet:w-full max-mobile:w-full">
        <div
          className="flex justify-between cursor-pointer bg-gray-50 p-4 mt-2 shadow-md rounded-md"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>⬇️</span>
        </div>

        {/* Accordion body */}
        {showItems && <ItemList items={data.itemCards} />}
      </div>
      {/* <div className="h-4 border-b-[16px] mx-auto bg-[#e6e6e6] w-8/12 max-laptop:w-9/12"></div> */}
    </div>
  );
};

export default RestaurantCategory;
