import { useState } from "react";
import { RESTOCOVERIMG } from "../../utils/constants";
import bike from "../../utils/svgs/delivery-bike.svg";
import placeHolderImg from "../../utils/images/placeholder-light.avif";
import "./RestaurantCard.css";

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
    <div className="resto-card">
      {cloudinaryImageId ? (
        <img
          className="resto-cover-img"
          src={imgSrc}
          alt="resto-logo"
          onError={handleError}
        />
      ) : (
        <img
          className="resto-cover-img"
          src={placeHolderImg}
          alt="resto-logo"
        />
      )}
      <div className="resto-card-content">
        <h3>{name}</h3>
        <h4 className="resto-card-context">
          {cuisines.length <= 4
            ? cuisines.join(", ")
            : cuisines.slice(0, 4).join(", ") + " ..."}
        </h4>
        <h4 className="resto-card-context">⭐ {avgRating} stars</h4>
        <h4 className="resto-card-context">
          {"\u00A0"}
          <span className="rupee">₹</span>
          {"\u00A0"}
          {costForTwo.slice(1)}
        </h4>
        <div className="resto-card-context">
          <svg className="card__icon">
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
