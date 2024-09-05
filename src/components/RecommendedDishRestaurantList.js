import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import RestaurantCard from "./RestaurantCard";
import useInfiniteScroll from "../utils/useInfiniteScroll";

const RecommendedDishRestaurantList = () => {
  const base_url = process.env.REACT_APP_BASE_URL;
  const [restoList, setRestoList] = useState([]);
  const [restoData, setRestoData] = useState([]);
  const [index, setIndex] = useState("");
  const [nextOffset, setNextOffset] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [tags, setTags] = useState("");
  const { collectionId } = useParams();

  const getTagsFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    const tags = urlParams.get("tags").split(",");
    return tags[0];
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        `${base_url}/recommendedDishRestoList/${collectionId}`
      );
      const json = await data.json();

      setRestoData(json);
      setRestoList(json?.data?.cards);
      setNextOffset(json?.data?.pageOffset?.nextOffset);
      setTags(getTagsFromUrl(json?.data?.cards[0]?.card?.card?.cta?.link));
      setIndex(
        json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(restoList);
  console.log(restoData);
  console.log(index);

  const fetchMoreData = async () => {
    if (loading || !hasMore || searchActive) return;

    setLoading(true);
    try {
      const data = await fetch(
        `${base_url}/recommendedDishRestoListUpdate?offset=${nextOffset}&index=${index}&tags=${tags}&collectionId=${collectionId}`
      );
      const json = await data.json();
      const list = json?.data?.cards;

      if (Array.isArray(list) && list.length > 0) {
        setRestoList((prevItems) => [...prevItems, ...list]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      const newOffset = json?.data?.pageOffset?.nextOffset;
      if (newOffset) {
        setNextOffset(newOffset);
      }

      setIndex(
        json?.data?.pageOffset?.widgetOffset?.collectionV5RestaurantListWidget >
          json?.data?.pageOffset?.widgetOffset
            ?.collectionV5RestaurantListWidget_SimRestoRelevance_food
          ? json?.data?.pageOffset?.widgetOffset
              ?.collectionV5RestaurantListWidget
          : json?.data?.pageOffset?.widgetOffset
              ?.collectionV5RestaurantListWidget_SimRestoRelevance_food
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useInfiniteScroll(fetchMoreData, true, loading);

  const restaurants = restoList?.filter(
    (itemCategory) =>
      itemCategory.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );

  return (
    <div>
      {restaurants && restaurants.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="w-10/12 max-tablet:w-full max-desktop:w-9/12 lg_desktop:w-9/12 mx-auto">
          <div className="mt-8 ml-2 max-mobile:w-10/12 max-mobile:mx-auto">
            <p className="text-5xl font-semibold opacity-[0.9] font-sans">
              {restoList[0]?.card?.card?.title}
            </p>
            <p className="text-lg mt-4 mb-6 opacity-[0.8] max-mobile:text-base">
              {restoList[0]?.card?.card?.description}
            </p>
            <p className="text-2xl mt-2 mb-6 font-extrabold opacity-[0.8] max-mobile:text-base">
              {restoList[0]?.card?.card?.count} to explore
            </p>
          </div>
          <div className="grid grid-cols-1 mobile:grid-cols-3 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-5 lg_desktop:grid-cols-6 gap-y-3 gap-x-2 mx-auto my-0 mt-4">
            {restaurants
              .filter(
                (item, index, self) =>
                  index ===
                  self.findIndex(
                    (t) =>
                      t?.card?.card?.info?.id === item?.card?.card?.info?.id
                  )
              )
              .map((restaurant) => (
                <Link
                  to={`/restaurant/${restaurant?.card?.card?.info?.id}`}
                  className="no-underline text-black mx-auto my-0"
                  key={restaurant?.card?.card?.info?.id}
                >
                  <RestaurantCard
                    key={restaurant?.card?.card?.info?.id}
                    restoData={restaurant?.card?.card}
                  />
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedDishRestaurantList;
