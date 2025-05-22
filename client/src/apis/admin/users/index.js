import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// get All Users
export const getAllUsers = async (token) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch users";
    throw new Error(errorMessage);
  }
};
