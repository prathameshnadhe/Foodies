import { useEffect, useState } from "react";
import { MENU_ITEM_IMG } from "./../utils/constants";
import placeHolderImg from "./../utils/images/placeHolderDish.png";
import vegImg from "./../utils/images/veg.png";
import nonVegImg from "./../utils/images/non_veg.png";
import starImg from "./../utils/images/star.png";
import { useMediaQuery } from "@react-hook/media-query";

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => {
        const [imgSrc, setImgSrc] = useState(
          item?.card?.info?.imageId
            ? `${MENU_ITEM_IMG}${item?.card?.info?.imageId}`
            : placeHolderImg
        );
        const [addBtn, setAddBtn] = useState("true");
        const [counter, setCounter] = useState(1);
        const [isExpanded, setIsExpanded] = useState(false);
        const isMobile = useMediaQuery("(max-width: 680px)");

        const handleAddBtn = () => {
          setAddBtn(false);
          setCounter(1);
        };

        const handlncrementBtn = () => {
          setCounter(counter + 1);
        };

        const handleDecrementBtn = () => {
          setCounter(counter - 1);
          if (counter === 1) {
            setAddBtn(true);
          }
        };

        const handleError = () => {
          setImgSrc(placeHolderImg);
        };

        const toggleExpansion = () => {
          setIsExpanded(!isExpanded);
        };

        const shortText = item?.card?.info?.description?.slice(
          0,
          isMobile ? 50 : 120
        );

        return (
          <div key={item.card?.info?.id}>
            <div className="p-2 m-2 border-b-4 text-left flex justify-between">
              <div>
                <div className=" p-2 m-2 pb-0 text-xl font-bold text-gray-800 max-mobile:text-base">
                  <div className="flex items-center">
                    {item?.card?.info?.itemAttribute && (
                      <div>
                        {item?.card?.info?.itemAttribute?.vegClassifier ===
                        "VEG" ? (
                          <img src={vegImg} className="w-5 h-5 mt-1" />
                        ) : (
                          <img src={nonVegImg} className="w-5 h-5 mt-1" />
                        )}
                      </div>
                    )}
                    {item?.card?.info?.isBestseller && (
                      <div className="text-sm text-orange-600 ml-1 max-mobile:text-xs">
                        BestSeller
                      </div>
                    )}
                  </div>
                  <div className="text-gray-800 opacity-[0.9] font-bold">
                    {item?.card?.info?.name}
                  </div>
                  <div>
                    ₹{" "}
                    {item?.card?.info?.defaultPrice / 100 ||
                      item?.card?.info?.price / 100}
                  </div>
                  {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                    <div className="flex text-sm font-bold items-center">
                      {starImg && <img src={starImg} className="w-4 h-4" />}
                      <p className="text-green-800 ml-1">
                        {item?.card?.info?.ratings?.aggregatedRating?.rating}
                      </p>
                      <p className="text-gray-700 ml-1">
                        (
                        {
                          item?.card?.info?.ratings?.aggregatedRating
                            ?.ratingCountV2
                        }
                        )
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-[1rem] text-gray-800 opacity-[0.9] font-medium p-2 m-2 pt-0 max-mobile:text-sm">
                  <span>
                    {isExpanded ? item?.card?.info?.description : shortText}
                  </span>
                  {item?.card?.info?.description?.length >
                    (isMobile ? 50 : 120) && (
                    <button
                      onClick={toggleExpansion}
                      className="bg-[#fff] border-none text-gray-900 font-bold opacity-[0.7] text-lg cursor-pointer p-0 max-mobile:text-sm ml-1"
                    >
                      {isExpanded ? "...less" : "...more"}
                    </button>
                  )}
                </p>
              </div>
              <div>
                <img
                  src={imgSrc}
                  alt={item?.card?.info?.name}
                  className="w-[200px] h-[200px] object-cover rounded-lg max-mobile:w-[140px] max-mobile:h-[140px] max-mobile:mt-[2rem] "
                  onError={handleError}
                />
                {addBtn ? (
                  <button
                    className="absolute bg-white text-xl text-green-500 ml-[-10.2rem] m-[11rem] px-4 py-2 w-[8rem] rounded-lg font-bold border-none shadow-md max-mobile:ml-[-7.6rem] max-mobile:m-[9.8rem] max-mobile:text-base max-mobile:px-1 max-mobile:py-[6px] max-mobile:w-[6.5rem]"
                    onClick={handleAddBtn}
                  >
                    ADD
                  </button>
                ) : (
                  <button className="absolute bg-white text-xl text-green-500 ml-[-10.2rem] m-[11rem] px-4 py-2 w-[8rem] rounded-lg font-bold border-none shadow-md max-mobile:ml-[-7.6rem] max-mobile:m-[9.8rem] max-mobile:text-base max-mobile:px-1 max-mobile:py-[6px] max-mobile:w-[6.5rem]">
                    <div className="flex justify-between">
                      <button
                        onClick={handleDecrementBtn}
                        className="border-none text-green-500 bg-white font-bold text-xl"
                      >
                        -
                      </button>
                      <span>{counter}</span>
                      <button
                        onClick={handlncrementBtn}
                        className="border-none text-green-500 bg-white font-bold text-xl"
                      >
                        +
                      </button>
                    </div>
                  </button>
                )}
              </div>
            </div>
            {index !== items.length - 1 && (
              <div className="bg-gray-300 m-[20px] h-[0.5px]"> </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
