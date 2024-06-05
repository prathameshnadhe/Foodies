import { useState } from "react";
import { MENU_ITEM_IMG } from "../../utils/constants";
import placeHolderImg from "../../utils/images/placeHolderDish.png";
import "./RestaurantMenuCard.css";

const RestaurantMenuCard = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { menuData } = props;
  const { id, name, description, imageId, defaultPrice, price, ratings } =
    menuData?.card?.info;
  const [imgSrc, setImgSrc] = useState(
    imageId ? `${MENU_ITEM_IMG}${imageId}` : placeHolderImg
  );

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleError = () => {
    setImgSrc(placeHolderImg);
  };

  const shortText = description?.slice(0, 200);
  return (
    <div className="section-center">
      <article key={id} className="menu-item">
        <img src={imgSrc} alt={name} className="photo" onError={handleError} />
        <div className="item-info">
          <div className="card-header">
            <h4>{name}</h4>
            <h4 className="price">₹{defaultPrice / 100 || price / 100}</h4>
          </div>
          <div className="description-container">
            <p className="item-text">
              <span>{isExpanded ? description : shortText}</span>
              {description?.length > 200 && (
                <button onClick={toggleExpansion} className="toggle-button">
                  {isExpanded ? "...less" : "...more"}
                </button>
              )}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default RestaurantMenuCard;
