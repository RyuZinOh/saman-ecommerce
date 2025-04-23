import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
