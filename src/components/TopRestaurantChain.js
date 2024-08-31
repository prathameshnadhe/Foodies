import { RESTOCOVERIMG } from "../utils/constants";
import placeHolderImg from "../utils/images/placeholder-light.avif";
import starImg from "./../utils/images/star.png";
import rightImg from "./../utils/images/right.png";
import leftImg from "./../utils/images/left.png";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

const TopRestaurantChain = ({ listOfRestaurant }) => {
  const restoData =
    listOfRestaurant?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;

  const isMobile = useMediaQuery("(max-width: 680px)");

  const title = listOfRestaurant?.data?.cards[1]?.card?.card?.header?.title;

  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  const getDeliveryTimeRange = (time) => {
    if (!time) return "30-35 mins"; // Handle undefined or null time
    const lowerBound = Math.floor(time / 5) * 5;
    const upperBound = lowerBound + 5;
    return `${lowerBound}-${upperBound} mins`;
  };

  return (
    <div className="w-10/12 max-tablet:w-11/12 max-desktop:w-9/12 lg_desktop:w-9/12 mx-auto my-0 mt-4">
      <div className="flex justify-between items-center mb-4 mx-4 max-mobile:mx-0">
        <p className="text-2xl font-bold opacity-[0.9] max-mobile:text-xl">
          {title}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll(-300)}
            className="w-[35px] h-[35px] rounded-[50%] bg-gray-100 border border-gray-300  shadow-md hover:bg-gray-200 opacity-[0.8]"
          >
            <img src={leftImg} alt="-" />
          </button>
          <button
            onClick={() => scroll(300)}
            className="w-[35px] h-[35px] rounded-[50%] bg-gray-100 border border-gray-300  shadow-md hover:bg-gray-200 opacity-[0.8]"
          >
            <img src={rightImg} alt="-" />
          </button>
        </div>
      </div>
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll scroll-smooth w-full h-auto space-x-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {restoData?.map((resto) => (
            <Link
              to={`/restaurant/${resto?.info?.id}`}
              className="no-underline text-black mx-auto my-0 bg-[#fff] w-[18rem] h-[18rem] max-mobile:h-[16rem] rounded-[1rem] p-1 m-1 "
              key={resto?.info?.id}
            >
              <div>
                {resto?.info?.cloudinaryImageId ? (
                  <img
                    className="h-[11rem] w-[16rem] rounded-[1rem] object-cover max-mobile:w-[8rem] max-mobile:h-[8rem] max-w-none"
                    src={`${RESTOCOVERIMG}${resto?.info?.cloudinaryImageId}`}
                    alt="resto-logo"
                  />
                ) : (
                  <img
                    className="h-[11rem] w-[16rem] rounded-[1rem] object-cover max-mobile:w-[8rem] max-mobile:h-[8rem] max-w-none"
                    src={placeHolderImg}
                    alt="resto-logo"
                  />
                )}
              </div>
              <div className="ml-2">
                <div className="text-l font-bold text-black mt-[1rem] opacity-[0.8]">
                  {resto?.info?.name.length <= 15
                    ? resto?.info?.name
                    : resto?.info?.name.slice(0, isMobile ? 15 : 24) + "..."}
                </div>
                <div className="flex items-center text-sm text-gray-700 mt-1">
                  <span className="flex items-center mr-2 max-mobile:mr-[2px]">
                    {starImg && (
                      <img
                        src={starImg}
                        className="w-4 h-4 mr-1 max-mobile:w-3 max-mobile:h-3 max-mobile:mr-[2px] "
                        alt="star"
                      />
                    )}
                    {resto?.info?.avgRating}
                  </span>
                  <span className="mr-2 max-mobile:mr-[2px] ">•</span>
                  <span className="">
                    {getDeliveryTimeRange(resto?.info?.sla?.deliveryTime)}
                  </span>
                  <span className="mr-2 ml-2 max-mobile:hidden max-mobile:mr-[2px] max-mobile:ml-[2px]">
                    •
                  </span>
                  <span className="max-mobile:hidden">
                    {resto?.info?.costForTwo}
                  </span>
                </div>
                <div className="text-gray-600 text-base max-mobile:text-xs">
                  {resto?.info?.cuisines.length < 3
                    ? resto?.info?.cuisines.join(", ")
                    : resto?.info?.cuisines.slice(0, 2).join(", ")}
                </div>
                <div className="text-gray-600 text-base max-mobile:text-xs">
                  {resto?.info?.areaName}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-gray-300 m-[20px] h-[0.5px]"> </div>
    </div>
  );
};

export default TopRestaurantChain;
