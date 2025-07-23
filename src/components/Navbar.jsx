import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const favouriteCount = useSelector((state) => state.favourites.items.length);

  return (
    <nav className="bg-[#000] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Logo */}
        <Link
          to="/"
          data-testid="logo"
          className="text-2xl font-bold tracking-wide hover:text-cyan-400 transition"
        >
          Oipug<span className="text-cyan-400">Cart</span>
        </Link>

        {/* Search */}
        <div className="flex-1 mx-4">
          <SearchBar className="w-full max-w-lg" />
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 items-center text-sm md:text-base">
          <Link to="/" className="hover:text-cyan-400 transition">
            Home
          </Link>
          <Link
            to="/favourites"
            className="relative hover:text-cyan-400 transition"
          >
            Favourites
            {favouriteCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {favouriteCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
