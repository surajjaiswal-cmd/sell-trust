"use client";
import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { createPortal } from "react-dom";
import files from "@/app/api/allservices.json";
import Image from "next/image";
import LinkLoad from "@/components/loadingbar/linkload";

interface ServiceType {
  id: number;
  image: string;
  name?: string;
  categories?: string;
  price?: string;
  time?: string;
  reviews?: string;
  vendor?: string;
}

// Extract and filter services
const allServices: ServiceType[] = Object.values(files)
  .flat()
  .filter(
    (service): service is ServiceType =>
      service && "name" in service && typeof service.name === "string"
  );

// Function to remove duplicate service names
const getUniqueServices = (services: ServiceType[]): ServiceType[] => {
  const seen = new Set();
  return services.filter((service) => {
    if (!service.name) return false;
    const isDuplicate = seen.has(service.name.toLowerCase());
    seen.add(service.name.toLowerCase());
    return !isDuplicate;
  });
};

const categories = [
  "Cleaning Services",
  "Salon at Home",
  "Best Electricians",
  "Carpenter",
  "Washing Machine Repair",
  "Need RO Service?",
  "Refrigerator Repair",
  "Microwave Repair",
  "Women Spa",
  "Men Massage",
];

const SearchFixed: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState(categories[0]);
  const [slide, setSlide] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filtered services based on search input (matches both name & category)
  const filteredServices: ServiceType[] = getUniqueServices(
    allServices.filter(
      (service) =>
        service.name &&
        service.price && // Ensure price exists
        (service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (service.categories &&
            service.categories
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (service.vendor &&
            service.vendor.toLowerCase().includes(searchTerm.toLowerCase()))) // Filter by vendor name
    )
  );

  // Change placeholder dynamically every 3 seconds with slide-up effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setSlide(true);
      setTimeout(() => {
        index = (index + 1) % categories.length;
        setPlaceholder(categories[index]);
        setSlide(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full md:w-96 border" ref={searchRef}>
      {/* Search Input */}
      <div
        className="flex items-center w-full bg-white"
        onClick={() => setIsOpen(true)}>
        <CiSearch className="mx-1 " />
        <input
          type="text"
          className="w-full py-1 outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
        />
      </div>

      {/* Slide-Up Effect Placeholder */}
      {!searchTerm && (
        <div
          className={`absolute left-6 top-[.28rem] transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none ${
            slide ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
          }`}>
          Search for <span className="font-medium">{placeholder}</span>
        </div>
      )}

      {/* Dropdown */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50 h-[30rem] overflow-auto w-full mt-2 search-suggetions"
            style={{ top: "100%", left: 0, width: "100%" }}>
            <h3 className="text-lg font-semibold">Matching Services</h3>
            <div className="flex flex-col gap-2 mt-2">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <LinkLoad
                    href={`/servicedetail/${service.id}`}
                    key={service.id}>
                    <div
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className=" flex items-center gap-3 hover:bg-gray-100 transition w-full text-left">
                      <Image
                        width={100}
                        height={70}
                        priority
                        src={service.image}
                        alt={service.name || "service"}
                        className="w-[5rem] h-[4rem] rounded-sm object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {service.name}
                        </span>
                        <p className="text-gray-500 text-xs">
                          By - {service.vendor}
                        </p>
                        {service.price && (
                          <span className="text-gray-500 text-xs">
                            ₹ {service.price} • {service.time}
                          </span>
                        )}
                      </div>
                    </div>
                  </LinkLoad>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No matching results</p>
              )}
            </div>
          </div>,
          searchRef.current!
        )}
    </div>
  );
};

export default SearchFixed;
