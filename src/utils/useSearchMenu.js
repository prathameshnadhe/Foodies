import { useState } from "react";

const useSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [allSearchResults, setAllSearchResults] = useState(false);

  return {
    searchText,
    setSearchText,
    allSearchResults,
    setAllSearchResults,
  };
};

export default useSearch;
