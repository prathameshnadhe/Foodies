import { RESTOCOVERIMG } from "../../utils/constants";
import bike from "../../utils/svgs/delivery-bike.svg";
import placeHolderImg from "../../utils/images/placeholder-light.avif";
import "./RestaurantCard.css";

const RestaurantCard = (props) => {
  const { restoData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    restoData?.info;

  return (
    <div className="resto-card">
      {cloudinaryImageId ? (
        <img
          className="resto-cover-img"
          src={RESTOCOVERIMG + cloudinaryImageId}
          alt="resto-logo"
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
          {cuisines.length <= 6
            ? cuisines.join(", ")
            : cuisines.slice(0, 6).join(", ") + " ..."}
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

export default RestaurantCard;
