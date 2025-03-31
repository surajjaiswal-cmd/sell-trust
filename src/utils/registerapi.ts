/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// Create an axios instance with base configurations
const api = axios.create({
  baseURL: "http://tutorials.codebetter.in:8071/api", // Ensure the correct base URL
  headers: {
    "Content-Type": "application/json", // Ensure JSON data format
  },
});

/**
 * Function to register a user via POST request
 * @param {Object} data - The user data object to send
 * @returns {Promise<any>} - Returns API response data or throws an error
 */
export const postData = async (data: any): Promise<any> => {
  try {
    const res = await api.post("/register/", data);
    console.log(res);

    if (res.status === 201) {
      return res.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (error: any) {
    console.error("Error posting data:", error.response?.data || error.message);
    return { error: error.response?.data || "Network error" }; // Return an error object
  }
};
