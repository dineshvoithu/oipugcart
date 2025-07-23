import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  category: "all",
  sort: "none", // "asc", "desc"
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    clearFilters(state) {
      state.search = "";
      state.category = "all";
      state.sort = "none";
    },
  },
});

export const { setSearch, setCategory, setSort, clearFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
