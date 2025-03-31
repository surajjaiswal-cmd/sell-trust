"use client";

import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import LinkLoad from "@/components/loadingbar/linkload";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-black container-fluid py-3   mt-4 ">
      <div className="container   grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8">
        <div className="content-center ">
          <LinkLoad href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={60}
              priority
              className="h-auto w-auto"
            />
          </LinkLoad>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm flex flex-col gap-2">
            <li>
              <LinkLoad href="/about">About us</LinkLoad>
            </li>
            <li>
              <LinkLoad href="/terms">Terms & conditions</LinkLoad>
            </li>
            <li>
              <LinkLoad href="/privacy">Privacy policy</LinkLoad>
            </li>
           
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">For customers</h3>
          <ul className="space-y-1 text-sm flex flex-col gap-2">
            <li>
              <LinkLoad href="/reviews">UC reviews</LinkLoad>
            </li>
            <li>
              <LinkLoad href="/categories-near-you">Categories near you</LinkLoad>
            </li>
            <li>
              <LinkLoad href="/blog">Blog</LinkLoad>
            </li>
            <li>
              <LinkLoad href="/contact">Contact us</LinkLoad>
            </li>
          </ul>
        </div>

        <div className=" md:mt-0">
          <h3 className="text-md font-semibold mb-2">Social Links</h3>
          <div className="flex space-x-4 text-lg">
            <FaTwitter className="cursor-pointer hover:text-gray-500" />
            <FaFacebook className="cursor-pointer hover:text-gray-500" />
            <FaInstagram className="cursor-pointer hover:text-gray-500" />
            <FaLinkedin className="cursor-pointer hover:text-gray-500" />
          </div>

          <div className="mt-4 flex gap-3 items-center">
            <LinkLoad href="/">
              <Image
                src="/appstore.png"
                alt="App Store"
                width={120}
                height={40}
                className="h-auto w-auto"
              />
            </LinkLoad>
            <LinkLoad href="/">
              <Image
                src="/playstore.png"
                alt="Google Play"
                width={120}
                height={40}
                className="h-auto w-auto"
              />
            </LinkLoad>
          </div>
        </div>
      </div>

      <div className="border-t mt-6 pt-4 text-center text-sm text-gray-500">
        © Copyright 2025 Sell Trust Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
