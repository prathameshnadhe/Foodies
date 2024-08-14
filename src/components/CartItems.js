import React, { useState, useEffect } from "react";
import { MENU_ITEM_IMG } from "./../utils/constants";
import deleteImg from "./../utils/images/delete.png";
import vegImg from "./../utils/images/veg.png";
import nonVegImg from "./../utils/images/non_veg.png";

const CartItems = ({ item, onUpdateItemTotal }) => {
  const [count, setCount] = useState(item.count || 1);

  const itemPrice =
    (item?.card?.info?.defaultPrice || item?.card?.info?.price) / 100;
  const itemTotalPrice = itemPrice * count;

  useEffect(() => {
    onUpdateItemTotal(item.card?.info?.id, itemTotalPrice);
  }, [
    count,
    itemPrice,
    onUpdateItemTotal,
    item.card?.info?.id,
    itemTotalPrice,
  ]);

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="flex items-center">
        <img
          className="w-[8rem] h-[8rem] object-cover rounded max-laptop:w-[100px] max-laptop:h-[100px]"
          src={
            item?.card?.info?.imageId
              ? `${MENU_ITEM_IMG}${item?.card?.info?.imageId}`
              : placeHolderImg
          }
          alt={item?.card?.info?.name}
        />
        <div className="ml-4">
          <div className="flex items-center max-laptop:hidden">
            {item?.card?.info?.itemAttribute && (
              <div>
                {item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                  <img src={vegImg} className="w-5 h-5 mt-1" />
                ) : (
                  <img src={nonVegImg} className="w-5 h-5 mt-1" />
                )}
              </div>
            )}
            {item?.card?.info?.isBestseller && (
              <div className="text-sm font-bold text-orange-600 ml-1 max-mobile:text-xs">
                BestSeller
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold opacity-[0.8] max-laptop:text-sm">
            {item?.card?.info?.name}
          </h2>
          <p className="text-lg font-medium max-laptop:text-sm">
            ₹ {itemTotalPrice.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <button
            onClick={() => setCount(count > 1 ? count - 1 : 1)}
            className="px-2 py-1 border border-gray-300 text-gray-600 rounded-l hover:bg-gray-300 cursor-pointer"
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b border-gray-300">
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-2 py-1 border border-gray-300 text-gray-600 rounded-r hover:bg-gray-300 cursor-pointer"
          >
            +
          </button>
        </div>
        {deleteImg && (
          <img
            src={deleteImg}
            alt="delete"
            className="mx-4 w-8 h-8 opacity-[0.8] cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CartItems;
