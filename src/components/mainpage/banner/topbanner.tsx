"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import LocationPopup from "../../location/locationpopup";
import files from "@/app/api/allservices.json";
import TopBannerSearch from "../serchoption/topbannersearch";

const bannerImages = files.topbannerr;

const TopBanner: React.FC = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error: Bootstrap does not have TypeScript definitions for dynamic import.
      import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
        const carouselElement = document.querySelector(
          "#carouselExampleSlidesOnly"
        );
        if (carouselElement) {
          new bootstrap.Carousel(carouselElement, {
            interval: 3000,
            ride: "carousel",
          });
        }
      });
    }
  }, []);

  return (
    <div className={`relative w-full h-[80vh] overflow-hidden mt-[3.5rem]`}>
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide w-full h-full"
        data-bs-ride="carousel">
        <div className="carousel-inner w-full h-full object-cover flex items-center overflow-hidden">
          {bannerImages.map((banner, index) => (
            <div
              key={index}
              className={`carousel-item w-full h-full ${
                index === 0 ? "active" : ""
              }`}>
              <Image
                width={1000}
                height={500}
                src={banner.image}
                className="w-full h-full object-cover object-center"
                alt={`Slide ${index + 1}`}
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-[80vh] p-[5%] bg-gradient-to-r from-black via-transparent to-transparent`}>
        <div className="flex flex-col items-start justify-center h-full">
          <div className="text-white text-start">
            <h1>Connect with Nearby Top-rated Professionals</h1>
          </div>

          <div className="flex justify-between flex-col md:flex-row items-start md:items-center px-2 mt-2 bg-[#ffffff] py-1 rounded-sm w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <TopBannerSearch/>
            <LocationPopup />

            {/* <button className="btn btn-secondary  rounded-0 py-0.5 w-full px-1 my-2 md:w-auto">
              Search
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
