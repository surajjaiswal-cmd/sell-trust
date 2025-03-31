"use client"; // Ensure it's a client component

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useMemo } from "react";
import ServiceTopBanner from "@/components/servicespage/topbanner";
import files from "@/app/api/allservices.json";
import ShowAllServices from "@/components/servicespage/showallservices";
import Pricing from "@/components/pricing";

const ServicesPage = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // ✅ Get category from URL

  // Create refs for each section
  const cleaningRef = useRef<HTMLDivElement | null>(null);
  const womansalonRef = useRef<HTMLDivElement | null>(null);
  const womanspaRef = useRef<HTMLDivElement | null>(null);
  const mensalonRef = useRef<HTMLDivElement | null>(null);
  const menmassageRef = useRef<HTMLDivElement | null>(null);

  const electricianRef = useRef<HTMLDivElement | null>(null);
  const plumberRef = useRef<HTMLDivElement | null>(null);
  const installationRef = useRef<HTMLDivElement | null>(null);
  const carpenterRef = useRef<HTMLDivElement | null>(null);

  // Memoize the refs object to prevent re-creation
  const sectionsRef = useMemo(
    () => ({
      cleaning: cleaningRef,
      womansalon: womansalonRef,
      womanspa: womanspaRef,
      mensalon: mensalonRef,
      menmassage: menmassageRef,
      electrician: electricianRef,
      plumber: plumberRef,
      installation: installationRef,
      carpenter: carpenterRef,
    }),
    []
  );

  // Scroll to the selected category on load
  useEffect(() => {
    if (
      category &&
      sectionsRef[category as keyof typeof sectionsRef]?.current
    ) {
      sectionsRef[
        category as keyof typeof sectionsRef
      ]?.current?.scrollIntoView({
        block: "start",
      });
    }
  }, [category, sectionsRef]);

  return (
    <>
      <ServiceTopBanner />

      <div ref={cleaningRef}>
        <ShowAllServices
          items={files.homecleaning}
          healding={"Quick Home Cleaning"}
        />
      </div>

      <div ref={womansalonRef}>
        <ShowAllServices
          items={files.womanslone}
          healding={"Salon For Women"}
        />
      </div>

      <div ref={womanspaRef}>
        <ShowAllServices items={files.womanspa} healding={"Spa For Women"} />
      </div>

      <div ref={mensalonRef}>
        <ShowAllServices
          items={files.menkidsalon}
          healding={"Salon For Men & Kids"}
        />
      </div>

      <div ref={menmassageRef}>
        <ShowAllServices items={files.menmassage} healding={"Men Massage"} />
      </div>

      <div ref={electricianRef}>
        <ShowAllServices
          items={files.electrician}
          healding={"Quick Home Repairs"}
        />
      </div>

      <div ref={plumberRef}>
        <ShowAllServices items={files.plumber} healding={"Plumber"} />
      </div>

      <div ref={installationRef}>
        <ShowAllServices items={files.installation} healding={"Installation"} />
      </div>

      <div ref={carpenterRef}>
        <ShowAllServices
          items={files.carpenter}
          healding={"Carpenter Repair & Making"}
        />
      </div>

      <Pricing />
    </>
  );
};

export default ServicesPage;
