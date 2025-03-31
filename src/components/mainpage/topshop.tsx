"use client";
import { useEffect } from "react";
import Image from "next/image";
import LinkLoad from "../loadingbar/linkload";

const carouselItems = [
  [
    { href: "https://www.amazon.in", img: "/topshop/s8-img1.png", name:'name' },
    { href: "https://www.flipkart.com", img: "/topshop/s8-img2.png", name:'name' },
    { href: "https://www.myntra.com", img: "/topshop/s8-img3.png", name:'name' },
    { href: "https://www.reliancedigital.in", img: "/topshop/s8-img4.png", name:'name' },
    { href: "https://www.tatacliq.com", img: "/topshop/s8-img5.png", name:'name' },
  ],
  [
    { href: "https://cred.club", img: "/topshop/s8-img6.webp", name:'name' },
    { href: "https://www.nykaa.com", img: "/topshop/s8-img7.png", name:'name' },
    { href: "https://www.croma.com", img: "/topshop/s8-img8.webp", name:'name' },
    { href: "https://blinkit.com", img: "/topshop/s8-img9.png", name:'name' },
    { href: "https://www.amazon.in", img: "/topshop/s8-img10.png", name:'name' },
  ],
];

const Carousel = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      const element = document.getElementById("carouselExample");
      if (element) {
        new bootstrap.Carousel(element, {
          interval: 3000,
          ride: "carousel",
        });
      }
    });
  }, []);

  return (
    <div className="container overflow-x-hidden mt-5">
      <div className="mt-16">
        <div className="w-full h-40 mt-12">
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel">
            <div className="carousel-inner">
              {carouselItems.map((group, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="3000">
                  <div className="flex justify-center items-center text-center">
                    {group.map(({name, href, img }, idx) => (
                      <div key={idx} className="w-4/5 md:w-3/5">
                        <LinkLoad href={href}>
                          <Image
                            src={img}
                            alt="social-icon"
                            width={100}
                            height={100}
                            className="w-3/5 h-auto mx-auto"
                          />
                            </LinkLoad>
                            <p className="text-md font-semibold text-gray-500" >{ name}</p>
                        </div>
                        
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-black w-[clamp(1rem,2vw,2rem)] h-[clamp(1rem,2vw,2rem)] opacity-70 rounded-full"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev">
              <span className="carousel-control-prev-icon w-[clamp(.5rem,2vw,1rem)] h-[clamp(.5rem,2vw,1rem)]"></span>
            </button>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-black w-[clamp(1rem,2vw,2rem)] h-[clamp(1rem,2vw,2rem)] opacity-70 rounded-full"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next">
              <span className="carousel-control-next-icon w-[clamp(.5rem,2vw,1rem)] h-[clamp(.5rem,2vw,1rem)]"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
