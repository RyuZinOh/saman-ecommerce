import { useState, useEffect } from "react";
import { createProduct, } from "../../../apis/admin/product";
import { getAllCategories } from "../../../apis/admin/category";
import { toast } from "react-toastify";
import { useAuth } from "../../../manager/contexts/auth/useAuth";

const ProductManager = ({ isEditMode = false, initialProduct = null, onSubmit, onCancel }) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(
    isEditMode && initialProduct
      ? {
          name: initialProduct.name,
          description: initialProduct.description,
          price: initialProduct.price,
          category: initialProduct.category?._id || initialProduct.category,
          quantity: initialProduct.quantity,
          shipping: initialProduct.shipping,
          photo: null,
        }
      : {
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          shipping: false,
          photo: null,
        }
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.category || response.categories || []);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, price, category, quantity } = product;
    if (!name || !description || !price || !category || !quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        // If in edit mode, call the passed onSubmit function
        await onSubmit(product);
      } else {
        // If in create mode, proceed as before
        const { success, message } = await createProduct(product, token);
        if (success) {
          toast.success(message);
          setProduct({
            name: "",
            description: "",
            price: "",
            category: "",
            quantity: "",
            shipping: false,
            photo: null,
          });
        }
      }
    } catch (error) {
      toast.error(error.message || `Failed to ${isEditMode ? 'update' : 'create'} product`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditMode ? "Edit Product" : "Create New Product"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={handleChange}
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="0"
                  value={product.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter quantity"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="shipping"
                name="shipping"
                checked={product.shipping}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="shipping"
                className="ml-2 block text-sm text-gray-700"
              >
                Available for Shipping
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <div className="mt-1 flex items-center">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1 text-sm text-gray-500">
                  {product.photo ? product.photo.name : "No file chosen"}
                </p>
              </div>
              {product.photo && (
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-gray-500">
                    Selected: {product.photo.name}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setProduct((prev) => ({ ...prev, photo: null }))
                    }
                    className="ml-2 text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
              {isEditMode && initialProduct?.photo && !product.photo && (
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    Current image will be kept
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {isEditMode && (
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditMode ? "Update Product" : "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductManager;