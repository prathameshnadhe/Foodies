import { RESTOCOVERIMG } from "../utils/constants";

const RestaurantCard = (props) => {
  const { restoData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    restoData?.info;

  return (
    <div className="resto-card">
      <img
        className="resto-cover-img"
        src={RESTOCOVERIMG + cloudinaryImageId}
        alt="resto-logo"
      />
      <div className="resto-card-content">
        <h3>{name}</h3>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        <h4>{sla?.slaString}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
