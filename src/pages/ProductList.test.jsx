import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import filtersReducer from "../features/filters/filtersSlice";
import ProductList from "./ProductList";
import thunk from "redux-thunk";
import { vi } from "vitest";

// ✅ Mock fetchProducts to reject
vi.mock("../features/products/productsSlice", async () => {
  const actual = await vi.importActual("../features/products/productsSlice");
  return {
    ...actual,
    fetchProducts: () => async (dispatch) => {
      dispatch({ type: "products/fetchProducts/pending" });

      // ✅ dispatch rejected with proper error shape
      dispatch({
        type: "products/fetchProducts/rejected",
        payload: undefined,
        error: { message: "Network error", name: "Error" },
        meta: {},
      });
    },
  };
});

describe("ProductList", () => {
  it("shows error if fetching failed", async () => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        filters: filtersReducer,
      },
      // ✅ no need to add thunk explicitly; it's already included
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    // ✅ Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
    });
  });
});
