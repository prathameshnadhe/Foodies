import { useEffect, useState } from "react";
import AllSearchList from "./AllSearchList";
import { Link } from "react-router-dom";

const AllSearchResults = ({ searchText }) => {
  const [allRestaurants, setAllRestaurants] = useState();
  const base_url = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      `${base_url}/allRestaurantSearch?str=${searchText}`
    );
    const json = await data.json();

    const list =
      json?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
    setAllRestaurants(list);
  };

  return (
    <div>
      {allRestaurants?.length === 0 ? (
        <p className="text-center text-lg">No restaurants found</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 max-mobile:grid-cols-1 mx-auto my-0 w-full mobile:w-8/12 tablet:w-6/12 laptop:w-6/12 desktop:w-5/12">
          {allRestaurants?.map((resto) => (
            <Link
              to={`/restaurant/${resto?.card?.card?.info?.id}`}
              className="no-underline text-black mx-auto my-0"
              key={resto?.card?.card?.info?.id}
            >
              <AllSearchList resto={resto} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSearchResults;
