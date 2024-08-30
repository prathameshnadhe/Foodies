import { useState } from "react";
import { RESTAURANTIMG } from "../utils/constants";
import placeHolderImg from "../utils/images/placeholder-light.avif";
import starImg from "./../utils/images/star.png";

const AllSearchList = ({ resto }) => {
  const {
    id,
    name,
    cuisines,
    avgRating,
    costForTwoMessage,
    sla,
    cloudinaryImageId,
  } = resto?.card?.card?.info;

  const [imgSrc, setImgSrc] = useState(
    cloudinaryImageId ? `${RESTAURANTIMG}${cloudinaryImageId}` : placeHolderImg
  );

  const handleError = () => {
    setImgSrc(placeHolderImg);
  };

  const getDeliveryTimeRange = (time) => {
    if (!time) return "30-35 mins"; // Handle undefined or null time
    const lowerBound = Math.floor(time / 5) * 5;
    const upperBound = lowerBound + 5;
    return `${lowerBound}-${upperBound} mins`;
  };

  return (
    <div>
      <div
        key={id}
        className="flex items-center m-2 p-2 py-2 hover:bg-blue-50 cursor-pointer"
      >
        <div>
          <img
            className="w-[80px] h-[80px] rounded-lg max-w-none object-cover"
            src={imgSrc}
            alt="Restaurant"
            onError={handleError}
          />
        </div>
        <div className="ml-2">
          <div className="text-l font-bold text-black opacity-[0.8]">
            {name.length <= 30 ? name : name.slice(0, 30) + "..."}
          </div>
          <div className="flex items-center text-sm text-gray-700 mt-1 font-semibold opacity-[0.9]">
            <span className="flex items-center mr-2">
              {starImg && <img src={starImg} className="w-4 h-4 mr-1" />}{" "}
              {avgRating || 4.0}
            </span>
            <span className="mr-1">•</span>
            <span>{getDeliveryTimeRange(sla?.deliveryTime)}</span>
            <span className="mr-1 ml-1">•</span>
            <span>{costForTwoMessage}</span>
          </div>
          <div className="text-gray-600 text-sm max-mobile:text-sm opacity-[0.8]">
            {cuisines.length <= 3
              ? cuisines.join(", ")
              : cuisines.slice(0, 2).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSearchList;
