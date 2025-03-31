"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { IoStarOutline, IoArrowBack, IoArrowForward } from "react-icons/io5";
import LinkLoad from "../loadingbar/linkload";
// import LinkLoad from "../loadingbar/linkload";

// Define the type for each repair item
interface MbsType {
  id?: number;
  image?: string;
  name?: string;
  price?: number;
  reviwes?: string;
  time?: string;
  vendor?: string;
}

// Define the props type
interface ShowAllServicesTypes {
  items: MbsType[];
  healding: string;
}

const ShowAllServices: React.FC<ShowAllServicesTypes> = ({
  items,
  healding,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // console.log(items);
  

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
      <h2 className="font-semibold">{healding}</h2>

      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 shadow-md z-10"
          onClick={() => scroll("left")}>
          <IoArrowBack size={24} />
        </button>
      )}
      <div
        ref={scrollRef}
        className="s2-card-part mt-5 flex gap-3  overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth">
        {items.map((item) => (
          <LinkLoad
            href={`/servicedetail/${item.id}`}
            key={item.id}
            className="border-none outline-none">
            <div className="w-full h-auto">
              <div
                className={`md:h-[17rem] md:w-[17rem] h-[14rem] w-[14rem] rounded-md overflow-hidden flex items-center`}>
                <Image
                  width={500}
                  height={500}
                  priority
                  className="mbs-card-img w-full h-full object-cover"
                  src={item.image || "https:placehild.co/1000"}
                  alt={item.name || "service"}
                />
              </div>
              <div className="pt-2 ps-1">
                <p className="  text-black">{item.name}</p>
                {item.reviwes ? (
                  <div>
                    <div className="flex justify-between">
                      <p className="flex items-center  text-[.7rem] text-[#888686] font-thin">
                        <IoStarOutline />
                        {item.reviwes}
                      </p>
                      <p className="flex items-center  text-[.7rem] text-[#888686] font-thin me-2">
                        By - {item.vendor}
                      </p>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <p className="text-[#4d4d4d] text-[.8rem]">
                        ₹{item.price} • {item.time}
                      </p>
                      <p className="btn border-none text-[.9rem] text-[#4d4d4d]  me-1">
                        Book Know
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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

export default ShowAllServices;
