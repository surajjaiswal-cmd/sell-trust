"use client";
import AdminSidebar from "@/components/admin/adminsidebar";
import DashboardOverview from "@/components/admin/dashboardoverview";
import ManageOrders from "@/components/admin/manageorders";
import ManageUsers from "@/components/admin/manageusers";
import ManageServices from "@/components/admin/manegeservices";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  //   const router = useRouter();

  // Detect screen size and adjust sidebar visibility
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 640;
      setIsMobile(isSmallScreen);
      setShowSidebar(true); // Show sidebar by default on both mobile & desktop
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle browser back button on mobile
  useEffect(() => {
    const handleBack = () => {
      if (isMobile) {
        setShowSidebar(true); // Show sidebar when pressing back
        setActiveSection(""); // Reset active section
      }
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [isMobile]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      setShowSidebar(false); // Hide sidebar when selecting a section (only on mobile)
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen flex gap-2 mt-24 container p-0">
      {/* Sidebar - Full width on mobile, fixed width on large screens */}
      {showSidebar && (
        <div
          className={`bg-gray-100 shadow-md ${isMobile ? "w-full" : "w-1/4"}`}>
          <AdminSidebar
            setActiveSection={handleSectionChange}
            activeSection={activeSection}
            setShowSidebar={setShowSidebar}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Main Content - Always visible on large screens, hidden on mobile until a section is selected */}
      {!isMobile || !showSidebar ? (
        <main className="flex-1 bg-white p-8 shadow-md transition-all border rounded-sm">
          {activeSection === "dashboard" && <DashboardOverview />}
          {activeSection === "users" && <ManageUsers />}
          {activeSection === "orders" && <ManageOrders />}
          {activeSection === "services" && <ManageServices />}
        </main>
      ) : null}
    </div>
  );
};

export default AdminDashboard;
