const RestaurantCard = (props) => {
  const { restoData } = props;

  const { name, cuisine, rating, cft } = restoData?.info;
  return (
    <div className="resto-card">
      <img
        className="resto-cover-img"
        src={restoData.info.image.url}
        alt="food_logo"
      />
      <div className="resto-card-data">
        <h2>{name}</h2>
        <h4>{cuisine.join(", ")}</h4>
        <h4>{rating.aggregate_rating}</h4>
        <h4>{cft.text}</h4>
        <h4>{restoData.order.deliveryTime}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
