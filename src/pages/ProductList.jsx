import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import FilterSortBar from "../components/FilterSortBar";

function ProductList() {
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);
  const { search, category, sort } = useSelector((state) => state.filters);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    setCategories(uniqueCategories);
  }, [products]);

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (p) => category === "all" || category === "" || p.category === category
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">All Products</h1>
        <p className="text-gray-500 text-lg">
          Explore your favorites with search, sort, and filters
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="mb-8">
        <FilterSortBar categories={categories} />
      </div>

      {/* Status */}
      {status === "loading" && (
        <div className="text-center text-blue-500 font-medium">
          Loading products...
        </div>
      )}
      {status === "failed" && (
        <div className="text-center text-red-500 font-medium">
          Error: {error || "Something went wrong"}
        </div>
      )}

      {/* Product Grid */}
      {status === "succeeded" && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 text-lg mt-12">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductList;
