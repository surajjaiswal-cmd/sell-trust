"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import servicesData from "@/app/api/allservices.json"; // Import JSON file
import Image from "next/image";
import ShowAllServices from "@/components/servicespage/showallservices";
import Reviews from "@/components/servicesdetailspage/reviews";
import AddCartPopup from "@/components/servicesdetailspage/addcartpopup";

interface BaseService {
  id?: number;
  image: string;
  name?: string;
  categories?: string;
}

interface PricedService extends BaseService {
  id: number;
  name: string;
  price: number;
  time?: string;
  reviwes?: string;
  vendor: string;
}

const isPricedService = (service: BaseService): service is PricedService =>
  "id" in service && "name" in service && "price" in service;

const allServices: PricedService[] = Object.values(servicesData)
  .filter((item): item is BaseService[] => Array.isArray(item))
  .flat()
  .filter(isPricedService);

const ServiceView = () => {
  const params = useParams<{ id: string }>();
  const initialServiceId = Number(params.id);

 
  const [selectedService, setSelectedService] = useState<PricedService | null>(
    allServices.find((item) => item.id === initialServiceId) || null
  );
 

  const relatedServices = selectedService
    ? allServices.filter(
        (s) =>
          s.categories === selectedService.categories &&
          s.id !== selectedService.id
      )
    : [];
  //  console.log(relatedServices);
  


  return (
    <div className="flex container-fluid justify-between items-start mx-auto mt-24">
      {/* hide border coustom css in globel css */}
      <div className="w-full hide-borde md:shadow-md p-6">
        {selectedService ? (
          <>
            <div>
              <div className="overflow-hidden w-full h-[25rem] md:h-[30rem] flex justify-center items-center">
                <Image
                  width={500}
                  height={300}
                  priority
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-auto h-full rounded-sm shadow-sm object-cover mb-4"
                />
              </div>
              <div className="my-3">
                <h1 className="text-3xl font-bold mb-4">
                  {selectedService.name}
                </h1>
                <div className="flex justify-between items-center">
                  <p className="text-lg text-gray-700">
                    ₹ {selectedService.price}
                  </p>
                  <AddCartPopup service={selectedService} />
                </div>
                <p className="text-lg text-gray-700">
                  <strong>Time :</strong> {selectedService.time || "N/A"}{" "}
                  <span className="text-[.7rem]">
                    &apos;can increase according to need&apos;
                  </span>
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Vendor :</strong> {selectedService.vendor || "N/A"}
                </p>
              </div>
            </div>
            <div className="d-md-none whitespace-normal">
              <ShowAllServices
                items={relatedServices}
                healding={"Related Services"}
              />
            </div>
            <hr className="my-3" />
            <Reviews />
          </>
        ) : (
          <p className="text-red-500 mt-4">No service selected.</p>
        )}
      </div>
      <div className="d-md-block d-none w-[30rem] p-4 border rounded-sm shadow-md ms-2">
        <h2 className="text-xl font-bold mb-4">Related Services</h2>
        <ul className="space-y-2">
          {relatedServices.map((s) => (
            <li
              key={s.id}
              className={`p-2 rounded-sm shadow-sm cursor-pointer flex items-center gap-2 text-sm ${
                selectedService?.id === s.id
                  ? "bg-gray-400 text-white"
                  : "border text-gray-700"
              }`}
              onClick={() => setSelectedService(s)}>
              <Image
                width={100}
                height={100}
                priority
                src={s.image}
                alt="card"
                className="min-w-20 h-14 rounded-sm object-cover"
              />
              <div className="s-card-details ms-2 w-[90%]">
                <p className="s-card-title text-[.8rem]">{s.name}</p>
                <p className="flex items-center text-[.6rem] text-[#888686] font-thin">
                  By - {s.vendor}
                </p>
                <p className="text-[#4d4d4d] text-[.6rem]">
                  ₹{s.price} • {s.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceView;
