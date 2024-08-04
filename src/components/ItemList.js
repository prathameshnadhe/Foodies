import { useState } from "react";
import { MENU_ITEM_IMG } from "./../utils/constants";
import placeHolderImg from "./../utils/images/placeHolderDish.png";
import RestaurantMenuCard from "./RestaurantMenuCard/RestaurantMenuCard";

const ItemList = ({ items }) => {
  console.log(items);

  return (
    <div>
      {items.map((item) => {
        const [imgSrc, setImgSrc] = useState(
          item?.card?.info?.imageId
            ? `${MENU_ITEM_IMG}${item?.card?.info?.imageId}`
            : placeHolderImg
        );

        const handleError = () => {
          setImgSrc(placeHolderImg);
        };

        return (
          <div>
            <div
              key={item.card?.info?.id}
              className="p-2 m-2 border-b-4 border-gray-700 text-left flex justify-between"
            >
              <div>
                <div className="flex justify-between p-2 m-2 text-xl">
                  <span>{item?.card?.info?.name}</span>
                  <span className="p2">
                    ₹
                    {item?.card?.info?.defaultPrice / 100 ||
                      item?.card?.info?.price / 100}
                  </span>
                </div>
                <p className="text-sm p-2 m-2">
                  {item?.card?.info?.description}
                </p>
              </div>
              <img
                src={imgSrc}
                alt={item?.card?.info?.name}
                className="w-[200px] h-[200px] object-cover rounded-lg border-2 border-amber-500"
                onError={handleError}
              />
            </div>

            <div className="bg-gray-300 m-[20px] h-[0.5px]"> </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
