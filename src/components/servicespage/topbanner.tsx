import Image from "next/image";
import React from "react";
import SearchInput from "../mainpage/serchoption/topbannersearch";

const ServiceTopBanner = () => {
  return (
    <div className="mt-[3.4rem] relative">
      <div className="w-full h-[80vh] overflow-hidden ">
        <Image
          src={"/servicepage/team.jpg"}
          width={1000}
          height={500}
          alt="banner"
          className=" w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-[80vh] p-[5%] bg-gradient-to-r from-black via-transparent to-transparent">
        <div className=" flex flex-col items-start justify-center h-full">
          <div className="text-white text-start">
            <h1>Connect with Nearby Top-rated Professionals</h1>
          </div>

          <div className="flex justify-start flex-col  md:flex-row items-start md:items-center px-2 mt-2 bg-white py-1 rounded-sm    w-full sm:w-[70%] md:w-[60%] lg:w-[50%]">
            <div></div>
            <SearchInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTopBanner;
