"use client";
import React, { useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import LinkLoad from "./loadingbar/linkload";

type Plan = {
  name: string;
  price: number;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Basic Plan",
    price: 30,
    features: [
      "1 Bathroom cleaning",
      "Up to 3 bedrooms cleaning",
      "1 Livingroom cleaning",
      "Small kitchen (0 – 150 ft2)",
      "Up to 2 additional rooms",
      "Refrigerator cleaning",
    ],
  },
  {
    name: "Smart Plan",
    price: 60,
    features: [
      "1 Bathroom cleaning",
      "Up to 3 bedrooms cleaning",
      "1 Livingroom cleaning",
      "Small kitchen (0 – 150 ft2)",
      "Up to 2 additional rooms",
      "Refrigerator cleaning",
    ],
  },
  {
    name: "Silver Plan",
    price: 90,
    features: [
      "1 Bathroom cleaning",
      "Up to 3 bedrooms cleaning",
      "1 Livingroom cleaning",
      "Small kitchen (0 – 150 ft2)",
      "Up to 2 additional rooms",
      "Refrigerator cleaning",
    ],
  },
  {
    name: "Premium Plan",
    price: 120,
    features: [
      "1 Bathroom cleaning",
      "Up to 3 bedrooms cleaning",
      "1 Livingroom cleaning",
      "Small kitchen (0 – 150 ft2)",
      "Up to 2 additional rooms",
      "Refrigerator cleaning",
    ],
  },
];

const Pricing: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Start Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  // Dragging (Smooth Movement)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust speed for smooth scroll
    requestAnimationFrame(() => {
      scrollRef.current!.scrollLeft = scrollLeft - walk;
    });
  };

  // Stop Dragging
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="container-fluid px-0 my-24 h-auto bg-gray-100 bg-[url('/image/pro-1.png')] bg-cover bg-center bg-no-repeat">
      <div className="bg-[#11111190] w-full h-full">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white pt-5">
            Our Pricing Plan
          </h2>
          <p className="text-white mt-2">
            Choose the best plan that fits your needs.
          </p>
        </div>

        {/* Scrollable Pricing Cards Container */}
        <div
          ref={scrollRef}
          className="container px-3 py-8 flex whitespace-nowrap overflow-x-auto gap-6 scrollbar-hide "
          style={{ scrollSnapType: "x mandatory", userSelect: "none" }} // Prevents text selection while dragging
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative  bg-white mx-auto shadow-lg p-7 mt-4 text-center  hover:scale-[1.01] transition-transform duration-500 ease-in-out  w-[17rem] ">
              <div className="absolute top-0.5 left-0.5 px-3">{plan.name}</div>
              <div className="flex items-baseline my-3 justify-center">
                <p className="text-2xl font-bold">₹{plan.price}.00</p>
                <p className="text-gray-500 text-[.6rem]">/Per Month</p>
              </div>
              <ol className="text-left space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center space-x-2 text-gray-600">
                    <IoCheckmark /> <span>{feature}</span>
                  </li>
                ))}
              </ol>
              <LinkLoad
                href="/"
                className="mt-6 w-full rounded-none btn btn-secondary">
                Book Know
              </LinkLoad>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
