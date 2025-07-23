import { describe, it, expect } from "vitest";
import favouritesReducer, {
  addToFavourites,
  removeFromFavourites,
} from "./favouritesSlice";

describe("favouritesSlice", () => {
  const initialState = {
    items: [],
  };

  const sampleProduct = {
    id: 1,
    title: "Test Product",
    price: 99.99,
  };

  it("should return the initial state", () => {
    const state = favouritesReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  it("should add a product to favourites", () => {
    const nextState = favouritesReducer(
      initialState,
      addToFavourites(sampleProduct)
    );
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(sampleProduct);
  });

  it("should not add a duplicate product to favourites", () => {
    const existingState = {
      items: [sampleProduct],
    };
    const nextState = favouritesReducer(
      existingState,
      addToFavourites(sampleProduct)
    );
    expect(nextState.items).toHaveLength(1); // no duplicate added
  });

  it("should remove a product from favourites", () => {
    const existingState = {
      items: [sampleProduct],
    };
    const nextState = favouritesReducer(
      existingState,
      removeFromFavourites(sampleProduct.id)
    );
    expect(nextState.items).toHaveLength(0);
  });
});
