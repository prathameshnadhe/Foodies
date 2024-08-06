import { useEffect, useState } from "react";

const RestoShimmer = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000); // 5 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-wrap auto-cols-min gap-x-[3rem] gap-y-[2rem] justify-center  animate-shimmer ">
      <div className="w-6/12 h-[14rem] mt-[10rem] bg-[#fff] shadow-custom rounded-2xl max-tablet:w-10/12 ">
        <p className=" overflow-hidden text-center text-xl p-8 bg-[#b8b8b8] rounded-[1rem] max-tablet:p-2">
          We retrieve data from Swiggy's live API. To facilitate this, we have
          added a proxy server hosted on render.com. Please bear with us while
          the servers are coming online. Thank you for your understanding.
        </p>
      </div>
      <div className="w-6/12 h-[14rem] bg-[#fff] shadow-custom rounded-2xl max-tablet:w-10/12"></div>
      <div className="w-6/12 h-[14rem] bg-[#fff] shadow-custom rounded-2xl max-tablet:w-10/12"></div>
      <div className="w-6/12 h-[14rem] bg-[#fff] shadow-custom rounded-2xl max-tablet:w-10/12"></div>
      <div className="w-6/12 h-[14rem] bg-[#fff] shadow-custom rounded-2xl max-tablet:w-10/12"></div>
      <div className="w-6/12 h-[14rem] bg-[#fff] shadow-custom rounded-2xl max-tablet:w-10/12"></div>
    </div>
  );
};

export default RestoShimmer;
