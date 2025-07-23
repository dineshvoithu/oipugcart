import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/filters/filtersSlice";

const SearchBar = () => {
  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(setSearch(localSearch.trim()));
    }, 400);

    return () => clearTimeout(delay);
  }, [localSearch, dispatch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={localSearch}
      onChange={(e) => setLocalSearch(e.target.value)}
      className="w-full sm:w-1/2 px-4 py-2 border text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
    />
  );
};

export default SearchBar;
