import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { gettinSingleProduct } from "../../../apis/admin/product";
import { toast } from "react-toastify";
import { ArrowLeft } from "@phosphor-icons/react";

const ViewProduct = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await gettinSingleProduct(slug);
        if (!response.product) throw new Error("Product not found");
        setProduct(response.product);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Product not found</p>
        <Link
          to="/admin-dashboard/products"
          className="text-blue-600 mt-4 inline-block"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link
        to="/admin-dashboard/products"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </Link>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Full Left Image */}
          <div className="relative h-72 md:h-auto">
            <img
              src={`${
                import.meta.env.VITE_API_BASE_URL
              }/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Right Content */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {product.name}
            </h1>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="text-base text-gray-900">
                  {product.category?.name || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Price</h3>
                <p className="text-base text-gray-900">₹{product.price}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                <p className="text-base text-gray-900">{product.quantity}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shipping</h3>
                <p className="text-base text-gray-900">
                  {product.shipping ? "Available" : "Not Available"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="text-base text-gray-900 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Created At
                  </h3>
                  <p className="text-base text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Updated At
                  </h3>
                  <p className="text-base text-gray-900">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
