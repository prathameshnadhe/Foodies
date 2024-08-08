import { useState } from "react";
import { RESTOCOVERIMG } from "../utils/constants";
import bike from "../utils/svgs/delivery-bike.svg";
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
    <div className="bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 hover:ease-in-out hover:scale-90 hover:transform hover:transition-transform hover:duration-300 max-mobile:flex max-mobile:w-[22rem] max-mobile:h-[9rem]">
      <div>
        {cloudinaryImageId ? (
          <img
            className="h-[13rem] w-[20em] rounded-[1rem] object-cover max-mobile:w-[8rem] max-mobile:h-[8rem]"
            src={imgSrc}
            alt="resto-logo"
            onError={handleError}
          />
        ) : (
          <img
            className="h-[12rem] w-[18rem] rounded-[1rem] object-cover"
            src={placeHolderImg}
            alt="resto-logo"
          />
        )}
      </div>
      <div className="ml-3">
        <div className="text-xl font-bold text-black mt-[1rem]">{name}</div>
        <div className="flex items-center text-lg text-gray-700 mt-1 max-mobile:text-base">
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
          {cuisines.length <= 4
            ? cuisines.join(", ")
            : cuisines.slice(0, 4).join(", ")}
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
        <label className="absolute bg-green-200 text-black m-3 p-2 rounded-lg">
          Top Rated
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
