import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterSortBar from "./FilterSortBar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer, {
  setCategory,
  setSort,
} from "../features/filters/filtersSlice";

const renderWithStore = (ui, { preloadedState = {} } = {}) => {
  const store = configureStore({
    reducer: {
      filters: filtersReducer,
    },
    preloadedState,
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe("FilterSortBar", () => {
  const categories = ["electronics", "clothing", "furniture"];

  it("renders category and sort dropdowns", () => {
    renderWithStore(<FilterSortBar categories={categories} />);

    expect(screen.getByDisplayValue("All Categories")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sort by")).toBeInTheDocument();
  });

  it("dispatches setCategory on category change", () => {
    const { store } = renderWithStore(
      <FilterSortBar categories={categories} />
    );

    fireEvent.change(screen.getByDisplayValue("All Categories"), {
      target: { value: "electronics" },
    });

    expect(store.getState().filters.category).toBe("electronics");
  });

  it("dispatches setSort on sort change", () => {
    const { store } = renderWithStore(
      <FilterSortBar categories={categories} />
    );

    fireEvent.change(screen.getByDisplayValue("Sort by"), {
      target: { value: "asc" },
    });

    expect(store.getState().filters.sort).toBe("asc");
  });
});
