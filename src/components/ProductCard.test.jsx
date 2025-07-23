import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../features/favourites/favouritesSlice";
import { BrowserRouter as Router } from "react-router-dom";

// Mock toast to silence actual toast popups during tests
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
}));

const renderWithProviders = (ui, { preloadedState = {} } = {}) => {
  const store = configureStore({
    reducer: {
      favourites: favouritesReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Router>{ui}</Router>
    </Provider>
  );
};

const sampleProduct = {
  id: 1,
  title: "Test Product",
  price: 100,
  image: "https://via.placeholder.com/150",
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product title, price, and image", () => {
    renderWithProviders(<ProductCard product={sampleProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/₹100/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", sampleProduct.image);
  });

  it("adds product to favourites on click when not favourited", () => {
    renderWithProviders(<ProductCard product={sampleProduct} />);

    const favButton = screen.getByRole("button", {
      name: /Add to favourites/i,
    });
    fireEvent.click(favButton);

    expect(
      screen.getByRole("button", { name: /Remove from favourites/i })
    ).toBeInTheDocument();
  });

  it("removes product from favourites on click when already favourited", () => {
    const preloadedState = {
      favourites: {
        items: [sampleProduct],
      },
    };

    renderWithProviders(<ProductCard product={sampleProduct} />, {
      preloadedState,
    });

    const favButton = screen.getByRole("button", {
      name: /Remove from favourites/i,
    });
    fireEvent.click(favButton);

    expect(
      screen.getByRole("button", { name: /Add to favourites/i })
    ).toBeInTheDocument();
  });

  it("shows remove button if showRemove is true", () => {
    renderWithProviders(
      <ProductCard product={sampleProduct} showRemove={true} />
    );
    expect(screen.getByTestId("remove-button")).toBeInTheDocument();
  });
});
