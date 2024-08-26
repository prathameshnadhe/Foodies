import { useState } from "react";
import { RESTOCOVERIMG } from "../utils/constants";
import placeHolderImg from "../utils/images/placeholder-light.avif";
import starImg from "./../utils/images/star.png";

const RestaurantCard = (props) => {
  const { restoData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    restoData?.info;
  const [imgSrc, setImgSrc] = useState(
    cloudinaryImageId ? `${RESTOCOVERIMG}${cloudinaryImageId}` : placeHolderImg
  );

  const handleError = () => {
    setImgSrc(placeHolderImg);
  };

  const getDeliveryTimeRange = (time) => {
    if (!time) return ""; // Handle undefined or null time
    const lowerBound = Math.floor(time / 5) * 5;
    const upperBound = lowerBound + 5;
    return `${lowerBound}-${upperBound} mins`;
  };

  return (
    <div className="min-mobile:flex min-mobile:flex-wrap min-mobile:justify-center bg-[#fff] min-mobile:w-[18rem] h-[18rem] rounded-[1rem] p-1 m-1 hover:transition-all mobile:hover:mt-[-1rem] hover:transform hover:duration-300 duration-500 max-mobile:flex max-mobile:w-[22rem] max-mobile:h-[9rem] mx-auto my-0">
      <div>
        {cloudinaryImageId ? (
          <img
            className="h-[11rem] w-[16rem] rounded-[1rem] object-cover max-mobile:w-[8rem] max-mobile:h-[8rem] max-w-none"
            src={imgSrc}
            alt="resto-logo"
            onError={handleError}
          />
        ) : (
          <img
            className="h-[11rem] w-[16rem] rounded-[1rem] object-cover max-mobile:w-[8rem] max-mobile:h-[8rem] max-w-none"
            src={placeHolderImg}
            alt="resto-logo"
          />
        )}
      </div>
      <div className="ml-2">
        <div className="text-l font-bold text-black mt-[1rem] opacity-[0.8]">
          {name}
        </div>
        <div className="flex items-center text-sm text-gray-700 mt-1">
          <span className="flex items-center mr-2">
            {starImg && <img src={starImg} className="w-4 h-4 mr-1" />}{" "}
            {avgRating}
          </span>
          <span className="mr-2">•</span>
          <span>{getDeliveryTimeRange(sla?.deliveryTime)}</span>
          <span className="mr-2 ml-2 max-mobile:hidden">•</span>
          <span className="max-mobile:hidden">{costForTwo}</span>
        </div>
        <div className="text-gray-600 text-base max-mobile:text-sm">
          {cuisines.length <= 3
            ? cuisines.join(", ")
            : cuisines.slice(0, 2).join(", ")}
        </div>
      </div>
    </div>
  );
};

// Higher Order Component

// inpunt - RestaurantCard ==> RestaurantCardTopRated

export const withTopRated = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-green-200 text-black m-2 ml-2 p-2 rounded-lg max-mobile:m-2 max-mobile:ml-2 max-mobile:p-1 max-mobile:text-sm">
          Top Rated
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
