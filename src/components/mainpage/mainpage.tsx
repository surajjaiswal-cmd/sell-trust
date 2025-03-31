import BannerOne from "@/components/mainpage/banner/bannerone";
import BannerTWo from "@/components/mainpage/banner/bannertwo";
import TopBanner from "@/components/mainpage/banner/topbanner";
import files from "@/app/api/allservices.json";
import ShowAllServices from "../servicespage/showallservices";
import Pricing from "../pricing";
import MainPageCard from "./mainpagecards";
import ServicesCard from "@/components/mainpage/servicescard";
import TopShop from "./topshop";

function MainPage() {
  return (
    <>

      {/* top sliding  baner =========================*/}
      <TopBanner />

      {/* 180 deegre rotate cards=====================  */}
      <ServicesCard />

      {/* new services =============================== */}

      <MainPageCard
        items={files.newservices}
        healding="New Services"
        wh="md:w-[22rem]  md:h-[13rem] w-[16rem] h-[9rem]"
      />

      {/* most book services  ============================*/}
      <ShowAllServices
        items={files.mostbookservices}
        healding={"Most booked services"}
      />

      {/* noraml banner 1 ========================*/}
      <BannerOne />

      {/* Salon & Spa At Home===================== */}
      <MainPageCard
        items={files.salon_spas}
        healding="Salon & Spa At Home"
        wh="md:w-[17rem]  md:h-[22rem] w-[14rem] h-[18rem]"
      />

      {/* noraml banner 1==================== */}
      <BannerTWo />

      {/* Quick Home==================================== */}
      <MainPageCard
        items={files.quickhome}
        healding="Quick Home"
        wh="md:w-[17rem]  md:h-[22rem] w-[14rem] h-[18rem]"
      />

      

      {/* slider bar for shop */}
      <TopShop />

      {/* Our Pricing Plan================================= */}
      <Pricing />
    </>
  );
}
export default MainPage;
