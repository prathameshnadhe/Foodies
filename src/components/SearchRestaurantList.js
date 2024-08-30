import { useEffect, useState } from "react";
import { SEARCH_REST_IMG } from "../utils/constants";
import placeHolderImg from "../utils/images/placeholder-light.avif";
import { Link } from "react-router-dom";
import searchImg from "../utils/images/AS_Search.avif";

const SearchRestaurantList = ({ searchText, setAllSearchResults }) => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchText]);

  const fetchData = async () => {
    const data = await fetch(`${base_url}/restaurantSearch?str=${searchText}`);
    const json = await data.json();

    const filteredData = json?.data?.suggestions?.filter(
      (resto) => resto.type === "RESTAURANT"
    );
    setSearchList(filteredData || []);
  };

  return (
    <div className="mx-auto my-0 w-full mobile:w-8/12 tablet:w-6/12 laptop:w-6/12 desktop:w-5/12">
      {searchList?.length === 0 ? (
        <p className="text-center text-lg">No restaurants found</p>
      ) : (
        <>
          {searchList?.map(
            (restaurant) =>
              restaurant?.restaurantId !== 0 && (
                <Link
                  to={`/restaurant/${restaurant.restaurantId}`}
                  key={restaurant.restaurantId}
                >
                  <div
                    key={restaurant.restaurantId}
                    className="flex items-center m-2 p-2 py-2 hover:bg-blue-50 cursor-pointer"
                  >
                    <div className="w-[64px] h-[64px]">
                      <img
                        src={
                          restaurant.cloudinaryId
                            ? `${SEARCH_REST_IMG}${restaurant.cloudinaryId}`
                            : placeHolderImg
                        }
                        alt="Search Restaurant"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="font-bold opacity-[0.8]">
                        {restaurant.text}
                      </p>
                      <p>{restaurant.subCategory}</p>
                    </div>
                  </div>
                </Link>
              )
          )}
          <div
            className="flex items-center m-2 p-2 py-2 hover:bg-blue-50 cursor-pointer justify-start"
            onClick={() => setAllSearchResults(true)}
          >
            <div className="w-[64px] h-[64px]">
              <img src={searchImg} alt="search" className="rounded-md" />
            </div>
            <div className="ml-4">
              See all results for "
              <span className="font-semibold">{searchText}</span>"
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchRestaurantList;
