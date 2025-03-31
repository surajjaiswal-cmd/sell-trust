// adminsidebar.tsx
import React from "react";
import { CiLogout } from "react-icons/ci";
import { FcManager } from "react-icons/fc";

interface SidebarProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  setActiveSection,
  activeSection,
  setShowSidebar,
  isMobile,
}) => {
  const handleClick = (section: string) => {
    setActiveSection(section);
    if (isMobile) setShowSidebar(false); // Hide sidebar on mobile
  };

  return (
    <div className="p-3 bg-white min-h-screen shadow-md  rounded-sm border">
      <div className=" text-lg mb-4 flex justify-start items-end shadow-md rounded-sm border p-2">
        <FcManager className="text-5xl" />
        <div className="ms-1">
          <p className="text-sm">Hello,</p> <p>Admin</p>
        </div>
      </div>
      <ul className="space-y-2">
        <li
          className={`p-2 shadow-md border rounded-sm cursor-pointer ${
            activeSection === "profile"
              ? "bg-gray-300 rounded-sm"
              : "hover:bg-gray-200 rounded-sm"
          }`}
          onClick={() => handleClick("dashboard")}>
          Dashboard
        </li>
        <li
          className={`p-2 shadow-md border rounded-sm cursor-pointer ${
            activeSection === "profile"
              ? "bg-gray-300 rounded-sm"
              : "hover:bg-gray-200 rounded-sm"
          }`}
          onClick={() => handleClick("users")}>
          Manage Users
        </li>
        <li
          className={`p-2 shadow-md border rounded-sm cursor-pointer ${
            activeSection === "profile"
              ? "bg-gray-300 rounded-sm"
              : "hover:bg-gray-200 rounded-sm"
          }`}
          onClick={() => handleClick("orders")}>
          Manage Orders
        </li>
        <li
          className={`p-2 shadow-md border rounded-sm cursor-pointer ${
            activeSection === "profile"
              ? "bg-gray-300 rounded-sm"
              : "hover:bg-gray-200 rounded-sm"
          }`}
          onClick={() => handleClick("services")}>
          Manage Services
        </li>
      </ul>
      <button className="mt-6 w-full  text-left text-red-500 flex justify-start items-center">
        <CiLogout className="me-2" /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
