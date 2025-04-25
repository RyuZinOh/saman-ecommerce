import { useState, useEffect } from "react";
import { useAuth } from "../../../manager/contexts/auth/useAuth";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../../../apis/admin/category";

const CategoryManager = () => {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  // Fetch categories on mount
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

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    setLoading(true);
    try {
      const data = await createCategory(name, token);
      toast.success(data.message);
      setName("");
      // Refresh categories
      const response = await getAllCategories();
      setCategories(response.category || response.categories || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const data = await updateCategory(id, editName, token);
      toast.success(data.message);
      // Refresh categories
      const response = await getAllCategories();
      setCategories(response.category || response.categories || []);
      setEditingId(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const data = await deleteCategory(id, token);
        toast.success(data.message);
        // Refresh categories
        const response = await getAllCategories();
        setCategories(response.category || response.categories || []);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage Categories</title>
      </Helmet>

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Create New Category</h1>

        <form onSubmit={handleCreate} className="space-y-4 mb-8">
          <div>
            <label className="block mb-1">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">All Categories</h2>

          {categories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border p-4 rounded-lg shadow-sm"
                >
                  {editingId === category._id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full p-2 border rounded"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(category._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-medium">{category.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => startEditing(category)}
                          className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-sm px-3 py-1 bg-red-500 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryManager;
