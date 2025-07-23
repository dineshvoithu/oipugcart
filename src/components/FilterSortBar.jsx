import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSort } from "../features/filters/filtersSlice";

const FilterSortBar = ({ categories }) => {
  const dispatch = useDispatch();
  const { category, sort } = useSelector((state) => state.filters);

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-6">
      {/* Category Filter */}
      <select
        value={category}
        onChange={handleCategoryChange}
        className="px-4 py-2 border rounded-md shadow-sm w-full sm:w-auto"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Sort by Price */}
      <select
        value={sort}
        onChange={handleSortChange}
        className="px-4 py-2 border rounded-md shadow-sm w-full sm:w-auto"
      >
        <option value="">Sort by</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default FilterSortBar;
