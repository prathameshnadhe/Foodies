import { useCallback, useEffect } from "react";
import _ from "lodash";

const useInfiniteScroll = (fetchMoreData, hasMore, loading, searchActive) => {
  const debouncedHandleScroll = useCallback(
    _.debounce(() => {
      const threshold = 500; // Pixels before reaching the bottom to trigger the fetch
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.scrollHeight - threshold;

      if (scrollPosition >= bottomPosition) {
        if (hasMore && !loading && !searchActive) {
          fetchMoreData();
        }
      }
    }, 300),
    [hasMore, loading, searchActive, fetchMoreData]
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [debouncedHandleScroll]);
};

export default useInfiniteScroll;
