import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
} from "../features/favourites/favouritesSlice";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );
  const favourites = useSelector((state) => state.favourites.items);
  const dispatch = useDispatch();

  const isFavourite = favourites.some((item) => item.id === product?.id);

  const handleToggle = () => {
    if (!product) return;
    if (isFavourite) {
      dispatch(removeFromFavourites(product.id));
      toast.info("Removed from Favourites");
    } else {
      dispatch(addToFavourites(product));
      toast.success("Added to Favourites");
    }
  };

  if (!product)
    return <p className="p-4 text-center text-gray-600">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm h-80 object-contain bg-gray-50 rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3 text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-amber-600 mb-6">
            ${product.price}
          </p>

          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium shadow transition duration-300 ${
              isFavourite
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isFavourite ? (
              <>
                <SolidHeart className="w-5 h-5" />
                Remove from Favourites
              </>
            ) : (
              <>
                <OutlineHeart className="w-5 h-5" />
                Add to Favourites
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
