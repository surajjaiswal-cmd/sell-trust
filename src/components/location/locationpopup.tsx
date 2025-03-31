"use client";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { BiCurrentLocation } from "react-icons/bi";

const LocationPopup: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState("Enter Location");

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"; // Disable scroll when popup is open
    } else {
      document.body.style.overflow = "auto"; // Enable scroll when popup closes
    }
  }, [showPopup]);

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      if (data && data.address) {
        const address = data.address;
        const fullAddress = [
          address.house_number,
          address.road,
          address.neighbourhood,
          address.city,
          address.state,
          address.country,
        ]
          .filter(Boolean) // Removes empty values
          .join(", ");

        setLocation(fullAddress || "Location not found");
      } else {
        setLocation("Unable to fetch address");
      }
    } catch (error) {
      console.log(error);
      
      setLocation("Error fetching address");
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchAddress(latitude, longitude);
        setShowPopup(false); // Close popup after selecting location
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Location permission denied. Please enable location services in your browser settings."
          );
        } else {
          alert("Unable to retrieve location. Please try again.");
        }
      }
    );
  };

  return (
    <>
      {/* Location Input Field (Click to Open Popup) */}
      <div
        className=" w-full md:w-[50%]  flex items-center bg-transparent  cursor-pointer"
        onClick={() => setShowPopup(true)}>
        <CiLocationOn className="mx-1" />
        <input
          type="text"
          value={location}
          readOnly
          className="border-none outline-none py-1 w-full cursor-pointer text-[#a1a5a9] bg-transparent"
        />
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white w-96 p-4  shadow-lg relative rounded-sm">
            {/* Close Button */}
            <button
              className="absolute top-2 right-4 text-gray-600"
              onClick={() => setShowPopup(false)}>
              ✖
            </button>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for your location"
              className="w-full p-2 mt-4 border rounded-sm shadow-sm"
            />

            {/* Use Current Location */}
            <button
              className="p-2 text-sm text-primary flex items-center gap-1"
              onClick={handleUseCurrentLocation}>
              <BiCurrentLocation />
              Use Current Location
            </button>
            <hr />
          </div>
        </div>
      )}
    </>
  );
};

export default LocationPopup;
