import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { gettinSingleProduct, getProductPhotoUrl } from "../apis/admin/product";
import { toast } from "react-toastify";
import Layout from "./layout/Layout";

const PublicProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await gettinSingleProduct(slug);
        setProduct(response.product);
      } catch (error) {
        toast.error(error.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <Layout title="Loading..." description="Loading product details">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout title="Not Found" description="Product not found">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-lg">Product not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={product.name}
      description={product.description || `Details about ${product.name}`}
    >
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={getProductPhotoUrl(product._id)}
                  alt="Some Image"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 space-y-4">
              <h1 className="text-3xl font-semibold text-gray-800">
                {product.name}
              </h1>

              {product.category && (
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium">{product.category.name}</span>
                </p>
              )}

              <p className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </p>

              <div className="space-y-2">
                <h2 className="text-xl font-medium text-gray-800">
                  Description
                </h2>
                <p className="text-gray-600">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <h2 className="text-xl font-medium text-gray-800">
                  Product Details
                </h2>
                <ul className="text-gray-600 space-y-1">
                  {product.quantity && (
                    <li>
                      <span className="font-medium">Availability:</span>{" "}
                      {product.quantity > 0
                        ? `In Stock (${product.quantity} available)`
                        : "Out of Stock"}
                    </li>
                  )}
                  {product.shipping !== undefined && (
                    <li>
                      <span className="font-medium">Shipping:</span>{" "}
                      {product.shipping ? "Available" : "Not Available"}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PublicProductDetails;
