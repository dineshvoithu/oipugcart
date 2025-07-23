import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../features/favourites/favouritesSlice";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders logo and navigation links", () => {
    const store = configureStore({
      reducer: {
        favourites: favouritesReducer,
      },
      preloadedState: {
        favourites: { items: [] },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Favourites/i)).toBeInTheDocument();
  });

  test("shows favourites badge if count > 0", () => {
    const store = configureStore({
      reducer: {
        favourites: favouritesReducer,
      },
      preloadedState: {
        favourites: { items: [1, 2, 3] },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
