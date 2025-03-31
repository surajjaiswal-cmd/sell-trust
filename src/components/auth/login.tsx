/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authcontext";
import { useToast } from "@/context/toastcontext";
import LinkLoad from "@/components/loadingbar/linkload";
import { loginUser } from "@/utils/loginapi";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setIsLogin } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Function to handle login
  const handleLogin = async () => {
    if (!user.email || !user.password) {
      showToast("Please enter both email and password.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await loginUser(user); // ✅ Call login function
      console.log("Login Response:", res);

      if (res?.access_token) {
        setIsLogin(true);
        showToast("Login successful! 🎉");
        router.push("/user"); // ✅ Redirect to user profile
      } else {
        throw new Error(
          res.error?.message || "Login failed. Please try again."
        );
      }
    } catch (error: unknown) {
      console.error("Login Error:", error);

      // ✅ Handle error messages properly
      if (error instanceof Error) {
        if ((error as any).response?.data) {
          showToast(
            (error as any).response.data.message || "Invalid email or password."
          );
        } else {
          showToast(error.message || "Something went wrong. Please try again.");
        }
      } else {
        showToast("An unknown error occurred.");
      }
    } finally {
      setLoading(false); // ✅ Stop loading in all cases
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-sm shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full border rounded-sm shadow-sm px-2 py-2 mt-1 outline-none"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            required
            placeholder="Enter password"
            className="w-full border rounded-sm shadow-sm px-2 py-2 mt-1 outline-none"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleLogin}
          className={`w-full py-2 rounded-sm shadow-sm transition ${
            user.email && user.password
              ? "bg-gray-500 hover:bg-gray-600 text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!user.email || !user.password || loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm mt-6">
          New here?{" "}
          <LinkLoad href="/signup" >
            <span className="text-blue-500 hover:underline">Create an account</span>
          </LinkLoad>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
