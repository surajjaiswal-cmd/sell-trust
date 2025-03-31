/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { IoStarOutline } from "react-icons/io5";
import LinkLoad from "../loadingbar/linkload";
import files from "@/app/api/allservices.json";

interface Product {
  id: number;
  image: string;
  bio: string;
  categories: string;
}

interface Service {
  id: number;
  image: string;
  name: string;
  categories: string;
  price: number;
  time: string;
  reviwes: string;
}

// Extracting only valid products
const products: Product[] = files.cartservices.filter(
  (item: any): item is Product => item.id && item.categories
);

// Filtering services based on product categories
const getMatchedFiles = (category: string) => {
  return Object.values(files)
    .flat() // Flatten all service categories
    .filter(
      (file: any): file is Service =>
        file.categories === category && file.price && file.reviwes
    );
};

const ServicesCard: React.FC = () => {
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  function handleFlipped(id: number) {
    setFlippedCardId((prev) => (prev === id ? null : id));
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (!scrollContainerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    e.preventDefault();
  }

  function handleMouseLeaveOrUp() {
    setIsDown(false);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDown || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }

  return (
    <div className="container mt-20">
      <h2 className="container my-5">What Are You Looking For?</h2>

      <div
        ref={scrollContainerRef}
        className="whitespace-nowrap flex overflow-x-auto gap-3 pb-4 scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}>
        {products.map((product) => {
          const matchedFiles = getMatchedFiles(product.categories);

          return (
            <div
              key={product.id}
              className="md:min-w-[23rem] min-w-[19rem] h-[70vh] flex-shrink-0">
              <div
                className={`s-card border-none relative w-full h-full cursor-pointer rounded-md ${
                  flippedCardId === product.id ? "flipped" : ""
                }`}>
                <div className="card-side absolute w-full h-full backface-hidden rounded-md overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    priority
                    src={product.image}
                    className="w-full h-full object-cover"
                    alt={product.bio}
                  />
                  <p className="absolute bottom-5 bg-[#382d2d4c] text-[#ffffff] py-1 px-2 rounded-md m-3">
                    {product.bio}
                  </p>
                  <button
                    className="s-quickview absolute bottom-3 right-3 font-semibold bg-[#ffffffa1] w-20 h-7 text-[.7rem] rounded-3xl border-none"
                    onClick={() => handleFlipped(product.id)}>
                    Quick View
                  </button>
                </div>

                <div className="absolute w-full h-full backface-hidden rounded-sm overflow-y-scroll rotateY text-left p-2 z-10 border-[0.3rem] border-[#00000009]">
                  {matchedFiles.map((item) => (
                    <div key={item.id}>
                      <LinkLoad href={`/servicedetail/${item.id}`}>
                        <div className="bg-[#f0f0f0] w-full h-auto mx-auto mb-4 flex justify-center content-center items-center rounded-sm p-2">
                          <div className="min-w-[30%] h-[4rem] overflow-hidden rounded-sm">
                            <Image
                              width={500}
                              height={1000}
                              priority
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="s-card-details text-[clamp(0.8rem,1.5vw,.9rem)] ms-3 w-[90%]">
                            <p className="s-card-title my-0">{item.name}</p>
                            <p className="flex items-center my-1 text-[.7rem] text-[#888686] font-thin">
                              <IoStarOutline />
                              {item.reviwes}
                            </p>
                            <div className="flex justify-between items-baseline">
                              <p className="text-[#4d4d4d] text-[.7rem]">
                                ₹{item.price} • {item.time}
                              </p>
                              <p className="text-[.7rem] text-[#4d4d4d] me-2">
                                Book Now
                              </p>
                            </div>
                          </div>
                        </div>
                      </LinkLoad>
                    </div>
                  ))}

                  <button
                    onClick={() => handleFlipped(product.id)}
                    className="bg-transparent fs-4 p-0 font-bold border-none btn ms-[90%]">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesCard;
