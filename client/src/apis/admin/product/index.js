import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// create Product
export const createProduct = async (productData, token) => {
  try {
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "photo" && productData[key]) {
        formData.append("photo", productData[key]);
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const { data } = await axios.post(
      `${API_BASE_URL}/api/v1/product/create-product`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to create product";
    throw new Error(errorMessage);
  }
};

// Get all products
export const getProductController = async () => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/product/get-product`
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch products";
    throw new Error(errorMessage);
  }
};

// Get single product
export const gettinSingleProduct = async (slugOrId) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/v1/product/get-product/${slugOrId}`
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch product";
    throw new Error(errorMessage);
  }
};

// Delete product
export const deleteProduct = async (productId, token) => {
  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/api/v1/product/product-delete/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete product";
    throw new Error(errorMessage);
  }
};

// Update product
export const updateProduct = async (productId, productData, token) => {
  try {
    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "photo" && productData[key] instanceof File) {
        formData.append("photo", productData[key]);
      } else if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const { data } = await axios.put(
      `${API_BASE_URL}/api/v1/product/update-product/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update product";
    throw new Error(errorMessage);
  }
};
