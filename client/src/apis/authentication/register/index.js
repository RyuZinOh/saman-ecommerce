import axios from "axios";

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default registerUser;
