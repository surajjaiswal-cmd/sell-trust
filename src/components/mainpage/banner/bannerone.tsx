import React from "react";
import LinkLoad from "../../loadingbar/linkload";
import Image from "next/image";

const BannerOne = () => {
  return (
    <LinkLoad
            href={`/services?category=${'womensalon'}`}>
      <div className="container p-0 w-full h-[30rem] mt-24 relative overflow-hidden ">
        <div className="w-full h-full ">
          <Image
            src={"/image/women-massage.jpg"}
            alt="Water Purifier"
            width={1000}
            height={500}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-[1.05]"
          />
        </div>

        <div className="absolute bottom-0 p-3 text-white">
          <h1 className="text-4xl font-bold mb-2">Spa for women</h1>
          <p className="text-lg mb-4">Stress & Pain Relif</p>
          <button className="bg-white text-black px-5 py-2 rounded-md text-lg font-medium transition-transform  transform hover:scale-105">
            Book Appoiment Now
          </button>
        </div>
      </div>
    </LinkLoad>
  );
};

export default BannerOne;
