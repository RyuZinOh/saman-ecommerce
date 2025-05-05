import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { ClockCounterClockwise } from "@phosphor-icons/react";
import useSearch from "../manager/contexts/auth/search/useSearch";
import { getProductPhotoUrl } from "../apis/admin/product";

const SearchResults = React.memo(({ onResultClick }) => {
  const {
    searchResults,
    searchTerm,
    lastSearchTerm,
    performSearch,
    isSearching,
  } = useSearch();

  const handleRepeatLastSearch = useCallback(() => {
    performSearch(lastSearchTerm);
    if (onResultClick) onResultClick();
  }, [lastSearchTerm, performSearch, onResultClick]);

  const showLastSearch = !searchTerm && lastSearchTerm && !isSearching;
  const showEmptyState = searchTerm && !searchResults.length && !isSearching;

  return (
    <div
      className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-auto"
      role="menu"
      aria-labelledby="search-results"
    >
      <div className="py-2">
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="divide-y">
            <div className="px-4 py-2 bg-gray-50">
              <span className="text-sm font-medium">Search Results</span>
            </div>
            {searchResults.map((product) => (
              <Link
                key={`${product._id}-${product.slug}`}
                to={`/product/${product.slug}`}
                onClick={onResultClick}
                className="block px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                role="menuitem"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getProductPhotoUrl(product._id)}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">
                      {product.name}
                    </p>
                    <p className="text-sm">Rs.{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {showEmptyState && (
          <div className="px-4 py-3 text-center">
            <p>No results found for "{searchTerm}"</p>
          </div>
        )}

        {/* Last Search Option */}
        {showLastSearch && (
          <div className="divide-y">
            <div className="px-4 py-2 bg-gray-50">
              <span className="text-sm font-medium">Last Search</span>
            </div>
            <button
              onClick={handleRepeatLastSearch}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none text-left"
              role="menuitem"
            >
              <ClockCounterClockwise
                size={16}
                className="text-gray-400"
                aria-hidden="true"
              />
              <span className="truncate">{lastSearchTerm}</span>
            </button>
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="px-4 py-3 text-center">
            <p>Searching...</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default SearchResults;
