// src/features/filters/filtersSlice.test.js
import filtersReducer, {
  setSearch,
  setCategory,
  setSort,
  clearFilters,
} from "./filtersSlice";

describe("filtersSlice", () => {
  const initialState = {
    search: "",
    category: "all",
    sort: "none",
  };

  it("should return the initial state", () => {
    expect(filtersReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle setSearch", () => {
    const newState = filtersReducer(initialState, setSearch("shirt"));
    expect(newState.search).toBe("shirt");
  });

  it("should handle setCategory", () => {
    const newState = filtersReducer(initialState, setCategory("electronics"));
    expect(newState.category).toBe("electronics");
  });

  it("should handle setSort", () => {
    const newState = filtersReducer(initialState, setSort("asc"));
    expect(newState.sort).toBe("asc");
  });

  it("should handle clearFilters", () => {
    const preloaded = {
      search: "abc",
      category: "jewelery",
      sort: "desc",
    };
    const newState = filtersReducer(preloaded, clearFilters());
    expect(newState).toEqual(initialState);
  });
});
