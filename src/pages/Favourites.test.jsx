import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../features/favourites/favouritesSlice";
import Favourites from "./Favourites";
import { MemoryRouter } from "react-router-dom";

// ✅ Use unique mock products
const mockProduct1 = {
  id: 1,
  title: "Mock Product 1",
  price: 100,
  category: "electronics",
  image: "image1.jpg",
};

const mockProduct2 = {
  id: 2,
  title: "Mock Product 2",
  price: 150,
  category: "books",
  image: "image2.jpg",
};

describe("Favourites", () => {
  it("shows empty message if no favourites", () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
      preloadedState: { favourites: { items: [] } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/no favourites yet/i)).toBeInTheDocument();
  });

  it("renders favourite products if available", () => {
    const store = configureStore({
      reducer: { favourites: favouritesReducer },
      preloadedState: {
        favourites: { items: [mockProduct1, mockProduct2] },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favourites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/no favourites yet/i)).not.toBeInTheDocument();
    expect(screen.getByText(/mock product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/mock product 2/i)).toBeInTheDocument();
  });
});
