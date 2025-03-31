"use client";
import { useState } from "react";
import { useCart } from "@/context/cartcontext";
import { useRouter } from "next/navigation";
import { FaGooglePay } from "react-icons/fa"; // Google Pay Icon
import { SiPhonepe } from "react-icons/si"; // PhonePe Icon
import { LuShoppingCart } from "react-icons/lu";

const Checkout = () => {
  const { clearCart } = useCart();
  const router = useRouter();

  // User details state
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    contact: "",
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("Google Pay");

  // Validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Allow only numbers & max 10 digits
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setUserDetails({ ...userDetails, [name]: value });

    // Validate email on change
    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Invalid email format",
      });
    }
  };

  // Check if all fields are filled & valid
  const isFormValid =
    userDetails.name &&
    userDetails.email &&
    userDetails.address &&
    userDetails.contact.length === 10 &&
    !errors.email;

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final email validation before submission
    if (!validateEmail(userDetails.email)) {
      setErrors({ ...errors, email: "Invalid email format" });
      return;
    }

    // Simulate order placement
    alert(`Order placed successfully with ${paymentMethod}!`);

    // Clear the cart after order
    clearCart();

    // Redirect to home page
    router.push("/");
  };

  return (
    <div className="container mx-auto p-6 w-[80%] md:w-[50%] mt-24 ">
      <div className="text-2xl font-bold mb-4 flex justify-start items-center">
        <LuShoppingCart /> <p className="ms-2">Checkout</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-sm ">
        {/* User Details */}
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm shadow-sm "
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm shadow-sm"
            placeholder="Enter your email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-sm shadow-sm"
            placeholder="Enter your delivery address"
            required
          />
        </div>

        <div className="flex items-center border rounded-sm shadow-sm mb-4">
          <span className="px-2">+91</span>
          <input
            type="tel"
            name="contact"
            maxLength={10}
            required
            placeholder="Enter Your Number"
            className="w-full border-none rounded-sm shadow-sm px-2 py-2 outline-none"
            value={userDetails.contact}
            onChange={handleChange}
          />
        </div>
        {userDetails.contact.length > 0 && userDetails.contact.length < 10 && (
          <p className="text-red-500 text-sm">Enter a 10-digit number</p>
        )}

        {/* Payment Options */}
        <h2 className="text-lg font-bold mt-6 mb-2">Select Payment Method</h2>
        <div className="mb-4">
          {[
            { name: "Google Pay", icon: <FaGooglePay size={28} /> },
            { name: "PhonePe", icon: <SiPhonepe size={24} color="#6739B7" /> },

            { name: "Cash on Delivery", icon: null },
          ].map(({ name, icon }) => (
            <label
              key={name}
              className={`flex items-center mb-2 p-2 border rounded-sm shadow-sm cursor-pointer ${
                paymentMethod === name ? "border-blue-500 bg-blue-100" : ""
              }`}>
              <input
                type="radio"
                name="payment"
                value={name}
                checked={paymentMethod === name}
                onChange={() => setPaymentMethod(name)}
                className="mr-2"
              />
              {icon && <span className="mr-2">{icon}</span>}
              {name}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded-sm shadow-sm py-2 text-white ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
