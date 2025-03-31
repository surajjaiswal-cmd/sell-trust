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

// Placeholder options (service names & vendors)
const placeholderOptions = [
  "Cleaning Services",
  "Salon at Home",
  "Best Electricians",
  "Carpenter",
  "Washing Machine Repair",
  "Need RO Service?",
  "Refrigerator Repair ",
  "Microwave Repair",
  "Women Spa",
  "Men Massage",
];

const TopBannerSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState(placeholderOptions[0]);
  const [slide, setSlide] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Dynamic Placeholder Effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setSlide(true);
      setTimeout(() => {
        index = (index + 1) % placeholderOptions.length;
        setPlaceholder(placeholderOptions[index]);
        setSlide(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Filtered services based on search input (name, category, or vendor)
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
            service.vendor.toLowerCase().includes(searchTerm.toLowerCase())))
    )
  );

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

  // Update dropdown position when opening
  useEffect(() => {
    if (isOpen && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 12,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  return (
    <div className=" w-full md:w-[50%] relative" ref={searchRef}>
      {/* Search Input */}
      <div
        className="flex items-center w-full bg-white whitespace-nowrap overflow-hidden py-1 relative"
        onClick={() => setIsOpen(true)}>
        <CiSearch className="text-gray-500 mr-2 " />
        <input
          type="text"
          className="w-full border-nonep outline-none bg-transparent"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          placeholder=""
        />
        {/* Animated Placeholder */}
        {!searchTerm && (
          <div
            className={`absolute left-6 top-[.28rem] transform -translate-y-1/2 text-gray-400 transition-all duration-300 pointer-events-none ${
              slide ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
            }`}>
            Search for <span className="font-medium">{placeholder}</span>
          </div>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="w-full bg-white border border-gray-300 shadow-xl p-4 z-50 h-[30rem] overflow-auto search-suggetions"
            style={{
              position: "absolute",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }}>
            <h3 className="text-lg font-semibold mb-2">Matching Services</h3>
            <div className="flex flex-col gap-3">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <LinkLoad
                    href={`/servicedetail/${service.id}`}
                    key={service.id}
                    className="flex items-center gap-3 hover:bg-gray-100 transition w-full text-left">
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
                      {service.vendor && (
                        <span className="text-gray-500 text-xs">
                          By - {service.vendor}
                        </span>
                      )}
                      {service.price && (
                        <span className="text-gray-500 text-xs">
                          ₹ {service.price} • {service.time}
                        </span>
                      )}
                    </div>
                  </LinkLoad>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No matching results</p>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default TopBannerSearch;
