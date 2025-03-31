"use client";
import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import files from "@/app/api/allservices.json";
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

// Function to remove duplicate services
const getUniqueServices = (services: ServiceType[]): ServiceType[] => {
  const seen = new Set();
  return services.filter((service) => {
    if (!service.name) return false;
    const isDuplicate = seen.has(service.name.toLowerCase());
    seen.add(service.name.toLowerCase());
    return !isDuplicate;
  });
};

const MdSearchFixed: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Filter search results dynamically
  const filteredServices = getUniqueServices(
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

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer hover:text-gray-500">
        <BiSearch />
      </div>

      {/* Search Bar Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start pt-16 z-20">
          <div className="bg-white shadow-lg p-4">
            {/* Input Field */}
            <div className="flex items-center border border-gray-300 overflow-hidden text-xl">
              <CiSearch size={24} className="text-gray-500 mx-2" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full py-2 outline-none text-[1rem]"
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm(""); // Clear input on close
                }}
                className="text-lg px-3 text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {/* Search Results */}
            <ul className="mt-2 h-[26rem] w-96 overflow-auto bg-white border-t border-gray-200 search-suggetions">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <LinkLoad
                    href={`/serviceviwe/${service.id}`}
                    key={service.id}
                    className="flex items-center gap-3 p-1 hover:bg-gray-100 transition w-full text-left">
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
                  </LinkLoad>
                ))
              ) : (
                <p className="text-gray-500 text-center py-3">
                  No results found
                </p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MdSearchFixed;
