import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  gettinSingleProduct,
  getProductPhotoUrl,
  createOrder,
} from "../apis/admin/product";
import { toast } from "react-toastify";
import Layout from "./layout/Layout";
import { useAuth } from "../manager/contexts/auth/useAuth";

const PublicProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    gettinSingleProduct(slug)
      .then((res) => setProduct(res.product))
      .catch((e) => toast.error(e.message || "Failed to fetch product details"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handlePlaceOrder = async () => {
    if (!isAuthenticated)
      return toast.error("Please log in to place an order.");
    if (quantity < 1 || quantity > product.quantity)
      return toast.error("Invalid quantity selected.");
    try {
      await createOrder(
        { products: [{ product: product._id, quantity }] },
        token
      );
      toast.success("Order placed successfully!");
    } catch (e) {
      toast.error(e.message || "Failed to place order.");
    }
  };

  if (loading)
    return (
      <Layout title="Loading..." description="Loading product details">
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400" />
        </div>
      </Layout>
    );

  if (!product)
    return (
      <Layout title="Not Found" description="Product not found">
        <div className="min-h-screen flex items-center justify-center bg-white">
          <p className="text-gray-500 text-lg">Product not found</p>
        </div>
      </Layout>
    );

  return (
    <Layout
      title={product.name}
      description={product.description || `Details about ${product.name}`}
    >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Details and Button at Left */}
          <div className="w-full md:w-2/5 flex flex-col justify-center gap-5">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {product.name}
              </h1>
              {product.category && (
                <p className="text-xs uppercase tracking-wider font-semibold text-blue-700 mb-2">
                  {product.category.name}
                </p>
              )}
              <p className="text-2xl font-bold text-blue-600 mt-2 mb-3">
                ₹{product.price}
              </p>
              <p className="text-gray-700 mb-2">
                {product.description || "No description available."}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-4">
                <li>
                  <span className="font-medium">Availability:</span>{" "}
                  {product.quantity > 0 ? (
                    <span className="text-blue-700 font-semibold">{`In Stock (${product.quantity})`}</span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </li>
                <li>
                  <span className="font-medium">Shipping:</span>{" "}
                  {product.shipping ? (
                    <span className="text-blue-700">Available</span>
                  ) : (
                    <span className="text-gray-400">Not Available</span>
                  )}
                </li>
              </ul>
              {product.quantity > 0 && (
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="number"
                    min={1}
                    max={product.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 rounded border border-gray-200 px-2 py-1 text-base focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  />
                  <button
                    onClick={handlePlaceOrder}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-medium"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Vertical divider for desktop */}
          <div className="hidden md:flex items-center">
            <div className="h-80 w-px bg-gray-100"></div>
          </div>
          {/* Image at Right, Full Height & Width */}
          <div className="w-full md:w-2/5 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-4 w-full flex items-center justify-center">
              <img
                src={getProductPhotoUrl(product._id)}
                alt={product.name}
                className="w-full h-[320px] md:h-[500px] object-cover rounded-lg shadow border border-gray-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
                style={{ background: "#f5f5f5", display: "block" }}
              />
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default PublicProductDetails;
