import axios from "axios";

const forgotPassword = async (formData) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgot-password`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to reset password. Please try again.");
    }
  }
};

export default forgotPassword;
