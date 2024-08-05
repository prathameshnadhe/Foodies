import { useState } from "react";
import { RESTOCOVERIMG } from "../utils/constants";
import bike from "../utils/svgs/delivery-bike.svg";
import placeHolderImg from "../utils/images/placeholder-light.avif";

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

  return (
    <div className="bg-[#fff] w-[18rem] h-[28rem] rounded-[1rem] p-1 m-1 shadow-custom hover:shadow-customHover hover:bg-[#f5f5f5]">
      {cloudinaryImageId ? (
        <img
          className="h-[12rem] w-[18rem] rounded-[1rem] object-cover"
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
      <div className="ml-3">
        <h3>{name}</h3>
        <h4 className="font-medium">
          {cuisines.length <= 4
            ? cuisines.join(", ")
            : cuisines.slice(0, 4).join(", ") + " ..."}
        </h4>
        <h4 className="font-medium">⭐ {avgRating} stars</h4>
        <h4 className="font-medium">
          {"\u00A0"}
          <span className="text-green-800">₹</span>
          {"\u00A0"}
          {costForTwo.slice(1)}
        </h4>
        <div className="font-medium flex items-center">
          <svg className="h-6 w-6 mr-2">
            <use xlinkHref={`${bike}#delivery-bike`}></use>
          </svg>
          <span>{sla?.deliveryTime} minutes</span>
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
