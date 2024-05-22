import { RESTOCOVERIMG } from "../utils/constants";
import bike from "../utils/svgs/delivery-bike.svg";
import placeholderImg from "../utils/placeholder-light.avif";

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
          src={placeholderImg}
          alt="resto-logo"
        />
      )}
      <div className="resto-card-content">
        <h3>{name}</h3>
        <h4 className="resto-card-context">{cuisines.join(", ")}</h4>
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
