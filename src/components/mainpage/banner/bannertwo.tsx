"use client";
import React, { useEffect, useState } from "react";
import LinkLoad from "../../loadingbar/linkload";
import Image from "next/image";

const BannerTWo = () => {
  const [imageSrc, setImageSrc] = useState("/image/bannertwo1.jpg");
  useEffect(() => {
    const updateImageSrc = () => {
      if (window.innerWidth >= 768) {
        setImageSrc("/image/bannertwo1.jpg");
      } else {
        setImageSrc("/image/bannertwo1-copy.jpg");
      }
    };
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);
  return (
    <LinkLoad href={`/services?category=${"installation"}`}>
      <div className="container p-0 w-full h-[30rem] mt-24 relative overflow-hidden">
        <div className="w-full h-full ">
          <Image
            src={imageSrc}
            alt="Water Purifier"
            width={1000}
            height={500}
            className="w-full h-full object-cover translate-x-[0rem] transition-transform duration-700 ease-in-out transform hover:scale-[1.05]"
          />
        </div>

        <div className="absolute bottom-0 p-3 text-white">
          <button className="bg-white text-black px-5 py-2 rounded-md text-lg font-medium transition-transform  transform hover:scale-105">
            Book Service Now
          </button>
        </div>
      </div>
    </LinkLoad>
  );
};

export default BannerTWo;
