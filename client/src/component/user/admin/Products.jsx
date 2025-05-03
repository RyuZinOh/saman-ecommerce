import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getProductController,
  deleteProduct,
  updateProduct,
} from "../../../apis/admin/product";
import { toast } from "react-toastify";
import { useAuth } from "../../../manager/contexts/auth/useAuth";
import { Eye, PencilSimple, Trash } from "@phosphor-icons/react";
import ProductManager from "./ProductManager";

const Products = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductController();
        setProducts(response.products || []);
      } catch (error) {
        toast.error(error.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        const { success, message } = await deleteProduct(productId, token);

        if (success) {
          toast.success(message);
          setProducts((prev) => prev.filter((p) => p._id !== productId));
        } else {
          toast.error(message || "Failed to delete product");
        }
      } catch (error) {
        toast.error(error.message || "Failed to delete product");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleUpdate = async (updatedProductData) => {
    try {
      setLoading(true);
      const {
        success,
        message,
        product: updatedProduct,
      } = await updateProduct(editingProduct._id, updatedProductData, token);

      if (success) {
        toast.success(message);
        setProducts((prev) =>
          prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
        );
        setShowEditForm(false);
        setEditingProduct(null);
      } else {
        toast.error(message || "Failed to update product");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingProduct(null);
  };

  if (loading && !showEditForm) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showEditForm ? (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
          </div>
          <ProductManager
            isEditMode
            initialProduct={editingProduct}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <Link
              to="/admin-dashboard/create-product"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Create Product
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipping
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ₹{product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.shipping
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.shipping ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <Link
                              to={`/admin-dashboard/product/${product.slug}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="View"
                            >
                              <Eye size={20} />
                            </Link>
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <PencilSimple size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                              disabled={loading}
                            >
                              <Trash size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
