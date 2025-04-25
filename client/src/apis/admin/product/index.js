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
