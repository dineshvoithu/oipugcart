import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
const Favourites = () => {
  const favourites = useSelector((state) => state.favourites.items);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Favourites</h1>

      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favourites.map((product) => (
            <ProductCard key={product.id} product={product} showRemove={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
