import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import {
  getProductController,
  getProductPhotoUrl,
} from "../apis/admin/product";
import { getAllCategories } from "../apis/admin/category";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          getProductController(),
          getAllCategories(),
        ]);

        setProducts(productsResponse.products || []);
        setCategories(categoriesResponse.category || []);
      } catch (error) {
        toast.error(error.message || "Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.category?._id)
        )
      : products;

  return (
    <Layout
      title="Saman by Safal Lama - Authentic Handmade Crafts & Gifts"
      description="Discover Nepal's finest handmade products at Saman by Safal Lama."
      canonicalUrl="/"
    >
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row px-4 md:px-0">
          {/* Categories Filter */}
          <div className="w-full md:w-56 md:pl-4 md:pr-2 mb-4 md:mb-0">
            <div className="border border-black rounded p-3">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                  Categories
                </h2>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-1">
                {categories.length === 0 ? (
                  <p className="text-gray-400 text-xs">No categories</p>
                ) : (
                  categories.map((category) => (
                    <div key={category._id} className="flex items-center">
                      <input
                        id={`category-${category._id}`}
                        type="checkbox"
                        checked={selectedCategories.includes(category._id)}
                        onChange={() => handleCategoryToggle(category._id)}
                        className="h-3.5 w-3.5 rounded border-gray-300 text-gray-700 focus:ring-gray-500"
                      />
                      <label
                        htmlFor={`category-${category._id}`}
                        className="ml-2 text-xs text-gray-700"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 md:pl-6 md:pr-4">
            <h2 className="text-sm font-medium text-gray-900 mb-4 pt-2">
              {selectedCategories.length > 0 ? (
                <span>Filtered ({filteredProducts.length})</span>
              ) : (
                <span>All Products ({filteredProducts.length})</span>
              )}
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No products found</p>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="mt-2 text-xs text-gray-600 underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="break-inside-avoid overflow-hidden relative group rounded-lg border border-blue-500 shadow-sm"
                  >
                    <img
                      src={getProductPhotoUrl(product._id)}
                      alt={product.name}
                      className="w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 flex justify-between items-end text-white text-xs">
                      <Link
                        to={`/product/${product.slug}`}
                        className="truncate max-w-[70%] font-medium"
                      >
                        {product.name}
                      </Link>
                      <div className="text-right">
                        <div>₹{product.price}</div>
                        <div className="text-[10px] text-gray-200">
                          {product.category?.name || "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
