import React, { useState, useEffect, useCallback } from "react";
import SearchContext from "./SearchContext";
import { searchProducts } from "../../../../apis/admin/product";
import { toast } from "react-toastify";

const LAST_SEARCH_KEY = "lastSearchTerm";

const SearchProvider = ({ children }) => {
  const [state, setState] = useState({
    searchTerm: "",
    searchResults: [],
    isSearching: false,
    lastSearchTerm: "",
  });

  // Load last 
  useEffect(() => {
    const saved = localStorage.getItem(LAST_SEARCH_KEY);
    if (saved) {
      setState((s) => ({ ...s, lastSearchTerm: saved }));
    }
  }, []);

  const setSearchTerm = useCallback((term) => {
    setState((s) => ({ ...s, searchTerm: term }));
  }, []);

  const performSearch = useCallback(async (term) => {
    const trimmed = term.trim();
    if (!trimmed) {
      toast.warning("Enter search term");
      return;
    }

    setState((s) => ({ ...s, isSearching: true }));

    try {
      const { success, results } = await searchProducts(trimmed);
      if (success) {
        // Update 
        localStorage.setItem(LAST_SEARCH_KEY, trimmed);
        setState((s) => ({
          ...s,
          searchResults: results,
          lastSearchTerm: trimmed,
          isSearching: false,
        }));
        if (!results.length) toast.info("No products found");
      }
    } catch (err) {
      toast.error(err.message || "Search failed");
      setState((s) => ({ ...s, isSearching: false }));
    }
  }, []);

  const value = {
    ...state,
    setSearchTerm,
    performSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
