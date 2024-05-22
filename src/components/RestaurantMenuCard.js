const RestaurantMenuCard = (props) => {
  const { menuData } = props;
  const { name, description, imageId, defaultPrice, price, ratings } =
    menuData?.card?.info;

  return (
    <div>
      <div>
        <h3>{name}</h3>
        <p>
          <span className="rupee">₹</span>
          {"\u00A0"}
          {defaultPrice / 100 || price / 100}
        </p>

        {ratings?.aggregatedRating?.rating ? (
          <p>
            ⭐ {ratings.aggregatedRating.rating} (
            {ratings.aggregatedRating.ratingCountV2})
          </p>
        ) : null}
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RestaurantMenuCard;
