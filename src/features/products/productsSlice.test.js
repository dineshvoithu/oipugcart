// src/features/products/productsSlice.test.js
import productsReducer, { fetchProducts } from "./productsSlice";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { vi } from "vitest";

// Mock axios globally
vi.mock("axios");

describe("productsSlice", () => {
  const mockProducts = [
    { id: 1, title: "Product A", price: 100, category: "electronics" },
    { id: 2, title: "Product B", price: 200, category: "clothing" },
  ];

  const initialState = {
    items: [],
    status: "idle",
    error: null,
  };

  it("should return the initial state", () => {
    expect(productsReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("should handle fetchProducts fulfilled", async () => {
    axios.get.mockResolvedValueOnce({ data: mockProducts });

    const store = configureStore({
      reducer: { products: productsReducer },
    });

    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe("succeeded");
    expect(state.items).toEqual(mockProducts);
    expect(state.error).toBeNull();
  });

  it("should handle fetchProducts rejected", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    const store = configureStore({
      reducer: { products: productsReducer },
    });

    await store.dispatch(fetchProducts());

    const state = store.getState().products;
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network Error");
  });
});
