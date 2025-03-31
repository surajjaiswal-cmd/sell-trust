"use client";
import { useState } from "react";
import { postData } from "@/utils/registerapi"; // Import API function
import { useAuth } from "@/context/authcontext"; // Import auth context
import { useToast } from "@/context/toastcontext"; // ✅ Import custom toast context
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    agreed: false,
  });

  const { setIsLogin } = useAuth();
  const { showToast } = useToast(); // ✅ Get `showToast` function from toast context
  const router = useRouter();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle sign-up
  const handleSignUp = async () => {
    if (!user.name || !user.email || !user.mobile || !user.password) {
      showToast("Please fill in all required fields.");
      return;
    }
    if (!user.agreed) {
      showToast("Please agree to the Terms and Policies.");
      return;
    }

    try {
      const res = await postData(user);
      console.log("Sign-up Response:", res);
      
      if (res?.error?.email) {
        throw new Error(res.error.email[0]); // ✅ Force catch block to handle the error
      }
      showToast("Sign-up successful! 🎉");
      localStorage.setItem("userToken", "true");
      setIsLogin(true);
       router.push("/user");
    } catch (error: unknown) {
      console.error("Sign-up error:", error);
      // ✅ Show the actual error message if available
      if (error instanceof Error && error.message) {
        showToast(error.message);
      } else {
        showToast("Sign-up failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-24">
      <div className="bg-white p-8 rounded-sm shadow-lg w-96">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Sign Up
        </h2>

        {/* Full Name Input */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded-sm shadow-sm outline-none text-gray-700"
            value={user.name}
            required
            onChange={handleChange}
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded-sm shadow-sm outline-none text-gray-700"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number Input */}
        <div className="flex items-center border rounded-sm shadow-sm p-2 mb-4">
          <span className="px-2">+91</span>
          <input
            type="tel"
            name="mobile"
            maxLength={10}
            required
            placeholder="Enter phone number"
            className="flex-1 outline-none px-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={user.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded-sm shadow-sm outline-none text-gray-700"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        {/* Terms & Conditions */}
        <div className="mb-4 flex items-start">
          <input
            type="checkbox"
            name="agreed"
            className="mt-1 mr-2"
            required
            checked={user.agreed}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-600">
            I agree to the
            <span className="text-red-500 cursor-pointer">
              {" "}
              Terms of Service
            </span>
            ,
            <span className="text-red-500 cursor-pointer"> Privacy Policy</span>
            , and
            <span className="text-red-500 cursor-pointer">
              {" "}
              Content Policies
            </span>
            .
          </p>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className={`w-full py-3 rounded-sm shadow-sm text-white ${
            user.agreed
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-gray-300 cursor-not-allowed"
          } transition`}
          disabled={!user.agreed}>
          Create Account
        </button>

        {/* Already have an account? */}
        <p className="text-center text-sm mt-4">
          Already have an account?
          <a href="/login" className="text-blue-500 hover:underline">
            {" "}
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
