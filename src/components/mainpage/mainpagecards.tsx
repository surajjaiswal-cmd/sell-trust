"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import LinkLoad from "../loadingbar/linkload";

interface mbstype {
  id: number;
  image: string;
  name: string;
  categories: string;
}

// Define the props type
interface ServicesTypes {
  items: mbstype[];
  healding: string;
  wh: string;
}
const MainPageCard: React.FC<ServicesTypes> = ({ items, healding, wh }) => {
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
    <div className="container  relative mt-20">
      <h2 className="container my-5">{healding}</h2>

      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10"
          onClick={() => scroll("left")}>
          <IoArrowBack size={24} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="mt-5 flex gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth">
        {items.map((item: mbstype, index: number) => (
          <LinkLoad
            href={`/services?category=${encodeURIComponent(item.categories)}`}
            key={index}>
            <div className="w-full h-auto">
              <div
                className={`${wh} rounded-md overflow-hidden flex items-center`}>
                <Image
                  width={500}
                  height={500}
                  priority
                  className="mbs-card-img w-full h-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="p-2 font-semibold text-gray-600">
                <p className="s-card-title my-0">{item.name}</p>
              </div>
            </div>
          </LinkLoad>
        ))}
      </div>

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

export default MainPageCard;
