import { CDN_URL } from "../utils/constant";

const RestaurantCard = (props) => {
  const { restoData } = props;

  // const { name, cuisine, rating, cft } = restoData?.info;
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, sla } =
    restoData?.info;

  return (
    <div className="resto-card">
      <img
        className="resto-cover-img"
        src={CDN_URL + cloudinaryImageId}
        alt="food_logo"
      />
      <div className="resto-card-data">
        <h2>{name}</h2>
        <h4>{cuisines.join(", ")}</h4>
        <h4>{avgRating} stars</h4>
        <h4>{costForTwo}</h4>
        {/* <h4>{sla.lastMileTravelString}</h4> */}
        <h4>{sla.slaString}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
