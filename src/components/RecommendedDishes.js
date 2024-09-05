import { useRef } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { RECOMMENDEDDISHIMG } from "../utils/constants";
import rightImg from "./../utils/images/right.png";
import leftImg from "./../utils/images/left.png";
import { Link } from "react-router-dom";

const RecommenededDishes = ({ listOfRestaurant }) => {
  const dishesData =
    listOfRestaurant?.data?.cards[0]?.card?.card?.imageGridCards?.info;

  const title = listOfRestaurant?.data?.cards[0]?.card?.card?.header?.title;

  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  const getCollectionIdFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("collection_id");
  };

  return (
    <div className="w-10/12 max-tablet:w-11/12 max-desktop:w-9/12 lg_desktop:w-9/12 mx-auto my-0 mt-4">
      <div className="flex justify-between items-center mb-4 mx-4 max-mobile:mx-0">
        <p className="text-2xl font-bold opacity-[0.9] max-mobile:text-xl">
          {title || "What's on your mind?"}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll(-500)}
            className="w-[35px] h-[35px] duration-300 rounded-full bg-gray-100 border border-gray-300 shadow-md hover:bg-gray-200 opacity-[0.8] max-mobile:hidden"
          >
            <img src={leftImg} alt="<-" />
          </button>
          <button
            onClick={() => scroll(500)}
            className="w-[35px] h-[35px] rounded-full bg-gray-100 border border-gray-300 shadow-md hover:bg-gray-200 opacity-[0.8] duration-300 max-mobile:hidden"
          >
            <img src={rightImg} alt="->" />
          </button>
        </div>
      </div>
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="grid grid-rows-1 grid-flow-col max-mobile:grid-rows-2 gap-2 overflow-x-auto scroll-smooth w-full h-auto mb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {dishesData?.map((dish) => (
            <Link
              to={`/recommended/${getCollectionIdFromUrl(dish.action.link)}`}
              className="no-underline text-black mx-auto my-0 bg-[#fff] rounded-lg p-1 m-1"
              key={dish?.id}
            >
              <div className="w-[144px] h-[180px] object-cover max-mobile:w-[100px] max-mobile:h-[120px]">
                <img
                  src={`${RECOMMENDEDDISHIMG}${dish?.imageId}`}
                  alt={dish?.action?.text}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gray-300 my-4 h-[0.5px]"></div>
    </div>
  );
};

export default RecommenededDishes;
