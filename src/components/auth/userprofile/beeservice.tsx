"use client"
import React, { useState } from "react";

const BeeService = () => {
  const [service, setService] = useState<{
    serviceName: string;
    category: string;
    image: File | null;
    price: string;
    completionTime: string;
  }>({
    serviceName: "",
    category: "",
    image: null, // Explicitly setting it to null
    price: "",
    completionTime: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setService({ ...service, image: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic (e.g., send data to backend)
    console.log("Service Details:", service);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full ">
      <h1 className="text-2xl font-semibold mb-4">Become a Service Provider</h1>

      {isSubmitted ? (
        <p className="text-green-600 font-semibold">
          Your service application has been submitted successfully!
        </p>
      ) : (
        <form className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="block text-gray-600 mb-1">Service Name</label>
            <input
              type="text"
              name="serviceName"
              value={service.serviceName}
              onChange={handleChange}
              className="w-full p-2 border rounded-sm shadow-sm outline-[#5858583d]"
              placeholder="Enter service name"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={service.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-sm shadow-sm">
              <option value="">Select a category</option>
              <option value="cleaning">Cleaning</option>
              <option value="repair">Repair</option>
              <option value="installation">Installation</option>
              <option value="electrician">Electrician</option>
              <option value="plumber">Plumber</option>
              <option value="carpenter">Carpenter</option>
              <option value="Delivery">Woman Spa</option>
              <option value="womansalon">Woman Salon</option>
              <option value="mensalon">Men Salon</option>
              <option value="menmassage">Men Massage</option>
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-600 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-sm shadow-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={service.price}
              onChange={handleChange}
              className="w-full border rounded-sm shadow-sm px-2 py-2 mt-1 outline-[#5858583d] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="Enter price"
            />
          </div>

          {/* Completion Time */}
          <div>
            <label className="block text-gray-600 mb-1">Completion Time</label>
            <input
              type="number"
              name="completionTime"
              value={service.completionTime}
              onChange={handleChange}
              className="w-full border rounded-sm shadow-sm px-2 py-2 mt-1 outline-[#5858583d] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="e.g., 2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full btn btn-secondary rounded-sm shadow-sm">
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default BeeService;
