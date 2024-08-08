import React, { useEffect, useState } from "react";

const Shimmer = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); // 5 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-10/12 grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 gap-y-3 ml-auto mr-auto mt-[6rem]">
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]">
        {showContent && (
          <div className="absolute bg-[#b8b8b8] p-5 w-7/12 rounded-lg text-black font-medium text-2xl text-center overflow-hidden z-10 bg-opacity-90 mx-[7.5rem] my-[7rem] max-mobile:relative max-mobile:flex max-mobile:items-center max-mobile:p-2.5 max-mobile:w-4/5 max-mobile:h-5/5 max-mobile:mx-5 max-mobile:my-5 max-tablet:mx-5 max-tablet:my-5 max-tablet:w-2/5 max-laptop:w-2/5">
            We retrieve data from Swiggy's live API. To facilitate this, we have
            added a proxy server hosted on render.com. Please bear with us while
            the servers are coming online. Thank you for your understanding.
          </div>
        )}
      </div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
      <div className="shadow-custom bg-[#fff] w-[20rem] h-[21rem] rounded-[1rem] p-1 m-1 animate-shimmer max-mobile:h-[9rem] max-mobile:w-[20rem]"></div>
    </div>
  );
};

export default Shimmer;
