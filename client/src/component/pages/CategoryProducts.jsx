import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCategoryProducts } from "../../apis/admin/category";
import { getProductPhotoUrl } from "../../apis/admin/product";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await getCategoryProducts(slug);
        setCategory(response.category);
        setProducts(response.products || []);
      } catch (error) {
        toast.error(error.message || "Failed to fetch category products");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading category products">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout title="Not Found" description="Category not found">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Category not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={category.name}
      description={`Products in ${category.name} category`}
      canonicalUrl={`/category/${slug}`}
    >
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-medium text-gray-900 mb-4 pt-6">
            {category.name} ({products.length})
          </h2>

          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                No products found in this category
              </p>
              <Link to="/" className="mt-2 text-xs text-gray-600 underline">
                Browse all products
              </Link>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0.5 space-y-0.5">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="break-inside-avoid overflow-hidden relative group border border-blue-500 shadow-sm mb-0.5"
                >
                  <img
                    src={getProductPhotoUrl(product._id)}
                    alt={product.name}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
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

                  {/* More Details Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/product/${product.slug}`}
                      className="bg-black/40 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-black/60 transition-colors"
                    >
                      More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
