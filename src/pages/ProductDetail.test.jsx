import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import ProductDetail from "./ProductDetail";
import productsReducer from "../features/products/productsSlice";
import favouritesReducer from "../features/favourites/favouritesSlice";

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "Test Description",
  price: 99.99,
  image: "https://via.placeholder.com/150",
};

const renderWithProviders = (productId = "1") => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      favourites: favouritesReducer,
    },
    preloadedState: {
      products: {
        items: [mockProduct],
      },
      favourites: {
        items: [],
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("ProductDetail", () => {
  test("renders product details correctly", () => {
    renderWithProviders();
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Description/i)).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
  });

  test("shows 'Product not found' if ID is invalid", () => {
    renderWithProviders("999");
    expect(screen.getByText(/Product not found/i)).toBeInTheDocument();
  });
});
