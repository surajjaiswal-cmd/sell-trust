"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { FcBusinessman, FcBusinesswoman } from "react-icons/fc";
import ProfileInfo from "./profileinfo";
import MyOrders from "./myoreder";
import { CiLogout } from "react-icons/ci";
import BeeService from "./beeservice";
import { useAuth } from "@/context/authcontext";

const UserProfile = () => {
  const { setIsLogin } = useAuth(); // Use context
  const [activeSection, setActiveSection] = useState("profile");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); // ✅ Use useRouter for navigation

  // User Details
  const [user, setUser] = useState({
    firstName: "Suraj",
    lastName: "Jaiswal",
    gender: "Male",
    email: "surajjaiswal0963@gmail.com",
    mobile: "+919165076563",
    address1: "123 Street, City",
    address2: "Apartment 456",
  });

  // Order Data
  const [orders] = useState([
    { id: 1, item: "Laptop", date: "2024-03-01", status: "Delivered" },
    { id: 2, item: "Smartphone", date: "2024-02-25", status: "Shipped" },
  ]);

  const [editField, setEditField] = useState<string | null>(null);

  // Load active section from localStorage on first render
  useEffect(() => {
    const savedSection = localStorage.getItem("userActiveSection");
    if (savedSection) {
      setActiveSection(savedSection);
    }
  }, []);

  // Detect screen size and adjust sidebar visibility
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      setShowSidebar(true); // Show sidebar by default
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle browser back button on mobile
  useEffect(() => {
    const handleBack = () => {
      if (isMobile) {
        setShowSidebar(true);
        setActiveSection("");
      }
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [isMobile]);

  // Function to handle logout
  const handleLogout = () => {
    setIsLogin(false); // ✅ Update state
    localStorage.removeItem("userToken"); // ✅ Clear stored user session
    router.push("/"); // ✅ Redirect to login page
  };


  return (
    <div className="min-h-screen flex mt-24 gap-2 container p-0">
      {/* Sidebar */}
      {showSidebar && (
        <aside
          className={`bg-white p-3 shadow-md rounded-sm border ${
            isMobile ? "w-full" : "w-1/4"
          }`}>
          <div className="text-lg mb-4 flex justify-start items-end shadow-md rounded-sm border p-2">
            {user.gender === "Male" ? (
              <FcBusinessman className="text-5xl" />
            ) : (
              <FcBusinesswoman className="text-5xl" />
            )}

            <div className="ms-1">
              <p className="text-sm">Hello,</p>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <nav>
            <ul className="space-y-2">
              <li
                className={`p-2 shadow-md border rounded-sm cursor-pointer ${
                  activeSection === "profile"
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("profile")}>
                Profile Information
              </li>
              <li
                className={`p-2 cursor-pointer shadow-md border rounded-sm ${
                  activeSection === "orders"
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("orders")}>
                My Orders
              </li>
              <li
                className={`p-2 shadow-md rounded-sm border cursor-pointer ${
                  activeSection === "beeService"
                    ? "bg-gray-300"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("beeService")}>
                Bee Service Providers
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <button
            className="mt-6 w-full text-left text-red-500 flex justify-start items-center"
            onClick={handleLogout}>
            <CiLogout className="me-2" /> Logout
          </button>
        </aside>
      )}

      {/* Main Content */}
      {!isMobile || !showSidebar ? (
        <main className="flex-1 bg-white p-8 shadow-md border rounded-sm">
          {activeSection === "profile" && (
            <ProfileInfo
              user={user}
              editField={editField}
              handleEdit={setEditField}
              handleSave={() => setEditField(null)}
              handleChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
          )}
          {activeSection === "orders" && <MyOrders orders={orders} />}
          {activeSection === "beeService" && <BeeService />}
        </main>
      ) : null}
    </div>
  );
};

export default UserProfile;
