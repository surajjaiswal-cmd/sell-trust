"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/cartcontext";
import { useToast } from "@/context/toastcontext"; // ✅ Correct toast import

interface Service {
  id: number;
  name: string;
  price: number;
  time?: string;
  reviwes?: string;
  vendor: string;
  categories: string;
  image: string;
}

interface AddCartPopupProps {
  service: Service;
}

const AddCartPopup: React.FC<AddCartPopupProps> = ({ service }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast(); // ✅ Use the toast function

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

 const getUpcomingDates = () => {
   const dates = [];
   const today = new Date();

   for (let i = 0; i < 7; i++) {
     const futureDate = new Date();
     futureDate.setDate(today.getDate() + i);

     // Convert to "DD-MM-YYYY" format
     const formattedDate = futureDate
       .toLocaleDateString("en-GB")
       .split("/")
       .join("-");

     dates.push(formattedDate);
   }

   return dates;
 };


  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

  const timeSlots: string[] = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ];

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime) {
      showToast("Please select a date and time.");
      return;
    }

    const itemToAdd = {
      ...service,
      selectedDate,
      selectedTime,
    };

    addToCart(itemToAdd);
    showToast("Item added to cart! ");
    setIsPopupOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-secondary rounded-sm px-5"
        onClick={() => setIsPopupOpen(true)}>
        ADD
      </button>

      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center flex-col justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white p-6 rounded-sm shadow-sm w-[90%] sm:w-[70%] md:w-[50%] h-[30rem] overflow-x-auto search-suggetions">
            <button
              className="btn rounded-sm ms-[90%] border-none text-[1.5rem] font-bold p-0"
              onClick={() => setIsPopupOpen(false)}>
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">
              When should the professional arrive?
            </h2>
            <p className="text-gray-500 mb-4">Service will take approx. 1 hr</p>

            <div className="flex justify-start gap-3 flex-wrap mb-4">
              {getUpcomingDates().map((date, index) => (
                <button
                  key={index}
                  className={`rounded-sm shadow-sm text-sm px-2 py-2 border ${
                    selectedDate === date ? "bg-gray-300" : "bg-white"
                  }`}
                  onClick={() => setSelectedDate(date)}>
                  {date}
                </button>
              ))}
            </div>

            <h3 className="text-lg font-bold mb-2">Select start time</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`p-2 rounded-sm shadow-sm border ${
                    selectedTime === time ? "bg-gray-300" : "bg-white"
                  }`}
                  onClick={() => setSelectedTime(time)}>
                  {time}
                </button>
              ))}
            </div>

            <hr className="my-4" />

            <div className="flex justify-around">
              <button
                className="btn btn-secondary w-[45%] rounded-sm shadow-sm"
                disabled={!selectedDate || !selectedTime}
                onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCartPopup;
