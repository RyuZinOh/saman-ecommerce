import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Category
export const createCategory = async (name, token) => {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/category/create-category`,
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create category";
    throw new Error(errorMessage);
  }
};

// Get All Categories
export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/category/get-category`
    );
    return data; 
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch categories";
    throw new Error(errorMessage);
  }
};


// Get Category Products
export const getCategoryProducts = async (slug) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/product/product-category/${slug}`
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch category products";
    throw new Error(errorMessage);
  }
};

// Get Single Category
export const getSingleCategory = async (slug) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/category/single-category/${slug}`
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch category";
    throw new Error(errorMessage);
  }
};

// Update Category
export const updateCategory = async (id, name, token) => {
  try {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/v1/category/update-category/${id}`,
      { name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update category";
    throw new Error(errorMessage);
  }
};

// Delete Category
export const deleteCategory = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/api/v1/category/delete-category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete category";
    throw new Error(errorMessage);
  }
};
