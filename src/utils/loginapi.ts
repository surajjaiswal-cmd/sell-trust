/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Create an axios instance with base configurations
const api = axios.create({
  baseURL: "http://tutorials.codebetter.in:8071/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Function to log in a user via POST request
 * @param {Object} credentials - The user's email and password
 * @returns {Promise<any>} - Returns API response data or throws an error
 */
export const loginUser = async (credentials: any): Promise<any> => {
  try {
    const res = await api.post("/login/", credentials);

    if (res.status === 200 && res.data?.access_token) {
      console.log("Login Response:", res.data);
      
      // ✅ Store tokens securely
      localStorage.setItem("accessToken", res.data.access_token);
      localStorage.setItem("refreshToken", res.data.refresh_token);

      return res.data; // Return successful response
    } else {
      throw new Error("Unexpected response from server.");
    }
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return { error: error.response?.data || "Login failed. Please try again." }; // Return an error object
  }
};
