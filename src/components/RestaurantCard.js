const RestaurantCard = (props) => {
  console.log(props);
  const { restoData } = props;
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } =
    restoData?.info;
  return (
    <div className="resto-card">
      <img
        className="resto-cover-img"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
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
