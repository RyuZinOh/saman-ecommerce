import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass, X, Spinner } from "@phosphor-icons/react";
import useSearch from "../manager/contexts/auth/search/useSearch";
import SearchResults from "./SearchResults";

const SearchInput = ({
  variant = "default",
  className = "",
  onResultClick,
}) => {
  const { searchTerm, setSearchTerm, performSearch, isSearching } = useSearch();
  const [localTerm, setLocalTerm] = useState(searchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  // Update global search term after typing stops
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(localTerm), 300);
    return () => clearTimeout(timer);
  }, [localTerm, setSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = localTerm.trim();
    if (trimmed) {
      performSearch(trimmed);
      if (variant === "expandable") navigate("/search");
    }
  };

  const handleClear = () => setLocalTerm("");
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setTimeout(() => setIsFocused(false), 200);

  // Determine width based on variant
  const getWidthClass = () => {
    if (variant === "expandable")
      return isFocused ? "w-full" : "w-40 hover:w-48";
    if (variant === "navbar") return "w-full max-w-xs";
    return "w-full max-w-md";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative ${getWidthClass()} ${className}`}
    >
      <div className="relative">
        <input
          type="text"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search products..."
          className="w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlass
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        {localTerm && !isSearching && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {isSearching && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
          <Spinner className="animate-spin text-blue-500" size={24} />
        </div>
      )}

      {(isFocused || localTerm) && !isSearching && (
        <SearchResults onResultClick={onResultClick} />
      )}
    </form>
  );
};

export default SearchInput;
