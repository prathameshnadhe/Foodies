import React, { useEffect, useState } from "react";
import "./shimmer.css";

const Shimmer = () => {
  const [showContent, setShowContent] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowContent(true);
  //   }, 5000); // 5 seconds in milliseconds

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shimmer-container">
      <div className="shimmer-card">
        {showContent && (
          <div className="message-overlay">
            We retrieve data from Swiggy's live API. To facilitate this, we've
            added a proxy server hosted on render.com. Please bear with us while
            the servers are coming online. Thank you for your understanding.
          </div>
        )}
      </div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
      <div className="shimmer-card"></div>
    </div>
  );
};

export default Shimmer;
