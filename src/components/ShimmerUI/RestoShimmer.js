import { useEffect } from "react";
import "./shimmer.css";

const RestoShimmer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shimmer-section-center">
      <div className="shimmer-menu-item" style={{ marginTop: "10rem" }}></div>
      <div className="shimmer-menu-item"></div>
      <div className="shimmer-menu-item"></div>
      <div className="shimmer-menu-item"></div>
      <div className="shimmer-menu-item"></div>
      <div className="shimmer-menu-item"></div>
    </div>
  );
};

export default RestoShimmer;
