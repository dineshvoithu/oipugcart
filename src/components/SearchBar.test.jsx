import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../features/filters/filtersSlice";

const renderWithStore = (store) =>
  render(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );

describe("SearchBar", () => {
  let store;

  beforeEach(() => {
    vi.useFakeTimers(); //  mock all timers
    store = configureStore({ reducer: { filters: filtersReducer } });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers(); // restore real timers
  });

  it("renders search input", () => {
    renderWithStore(store);
    expect(
      screen.getByPlaceholderText("Search products...")
    ).toBeInTheDocument();
  });

  it("dispatches setSearch action with debounce", async () => {
    const spy = vi.spyOn(store, "dispatch");
    renderWithStore(store);

    const input = screen.getByPlaceholderText("Search products...");
    fireEvent.change(input, { target: { value: "laptop" } });

    // Nothing dispatched yet due to debounce
    expect(spy).not.toHaveBeenCalled();

    // Advance timers to simulate debounce delay
    vi.advanceTimersByTime(400);

    expect(spy).toHaveBeenCalledWith({
      type: "filters/setSearch",
      payload: "laptop",
    });
  });
});
