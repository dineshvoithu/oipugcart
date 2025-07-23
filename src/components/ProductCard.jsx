import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../features/favourites/favouritesSlice";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product, showRemove = false }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.items);
  const isFavourite = favourites.some((fav) => fav.id === product.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id));
      toast.info("Removed from favourites");
    } else {
      dispatch(addToFavourites(product));
      toast.success("Added to favourites!");
    }
  };

  return (
    <div className="relative border rounded-xl p-4 bg-white shadow hover:shadow-lg transition-all duration-300 group">
      <button
        onClick={toggleFavourite}
        className="absolute top-3 right-3 text-gray-700 hover:text-red-500"
        title={isFavourite ? "Remove from favourites" : "Add to favourites"}
      >
        {isFavourite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#dc2626"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.657 3.172 10.828a4 4 0 010-5.656z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5A4.5 4.5 0 0012 6.75a4.5 4.5 0 00-4.5-3A4.5 4.5 0 003 8.25c0 1.519.868 3.04 2.075 4.347C7.3 14.222 9.15 15.78 12 18.25c2.85-2.47 4.7-4.028 6.925-5.653C20.132 11.29 21 9.769 21 8.25z"
            />
          </svg>
        )}
      </button>

      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-lg font-bold text-amber-600">₹{product.price}</p>
      </Link>

      {showRemove && (
        <button
          data-testid="remove-button"
          onClick={() => {
            dispatch(removeFromFavourites(product.id));
            toast("Removed from favourites");
          }}
          className="mt-3 text-sm text-red-600 hover:underline"
        >
          <XCircleIcon className="h-5 w-5 text-red-600" />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
