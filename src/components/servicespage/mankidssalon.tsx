"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import items from "@/app/api/mankidsalon.json";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import LinkLoad from "../loadingbar/linkload";

interface mbstype {
  image: string;
  name: string;
}

const ManKidsSalon = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mt-20 relative">
      <h2 className="container my-5">Salon For Men & Kids</h2>

      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10"
          onClick={() => scroll("left")}>
          <IoArrowBack size={24} />
        </button>
      )}

      <LinkLoad href="/">
        <div
          ref={scrollRef}
          className="s2-card-part mt-5 flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth">
          {items.map((item: mbstype, index: number) => (
            <div key={index} className="min-w-[16rem] h-auto relative ">
              <div className="w-full h-[20rem] rounded-md overflow-hidden flex items-center">
                <Image
                  width={500}
                  height={500}
                  priority
                  className="mbs-card-img w-full h-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <p className=" p-3 absolute top-0 left-0 font-semibold text-gray">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </LinkLoad>
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10"
          onClick={() => scroll("right")}>
          <IoArrowForward size={24} />
        </button>
      )}
    </div>
  );
};

export default ManKidsSalon;
