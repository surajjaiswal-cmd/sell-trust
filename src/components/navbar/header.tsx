"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BiShoppingBag, BiUser } from "react-icons/bi";
import styles from "@/styles/navbar.module.css";
import Image from "next/image";
import LinkLoad from "@/components/loadingbar/linkload";
import Notifications from "../mainpage/notification";
import SearchFixed from "../mainpage/serchoption/searchfixed";
import MdSearchFixed from "../mainpage/serchoption/mdsearchfixed";
import { useCart } from "@/context/cartcontext";
import { useAuth } from "@/context/authcontext"; // ✅ Import auth context

// Pages where search icon should only appear after scrolling
const HIDE_SEARCH_ON_SCROLL_PAGES = ["/", "/services"];

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { isLogin } = useAuth(); // ✅ Get authentication state
  const pathname = usePathname();
  const [showSearchIcon, setShowSearchIcon] = useState(
    !HIDE_SEARCH_ON_SCROLL_PAGES.includes(pathname)
  );

  useEffect(() => {
    if (!HIDE_SEARCH_ON_SCROLL_PAGES.includes(pathname)) {
      setShowSearchIcon(true);
      return;
    }
    setShowSearchIcon(false);
    const handleScroll = () => {
      setShowSearchIcon(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full px-2 bg-white shadow-md z-50">
      <div className="container flex justify-between items-center py-2">
        <div className="flex justify-between items-baseline">
          <LinkLoad href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={45}
              height={45}
              priority
              className="w-auto h-auto"
            />
          </LinkLoad>

          {pathname !== "/services" && (
            <div className="text-black sm:text-lg text-sm ms-4 items-start">
              <div className="transform translate-y-[-.3rem] ">
                <LinkLoad href="/services" className={styles.navlink}>
                  Services ⌟
                </LinkLoad>
              </div>
            </div>
          )}
        </div>

        <div className="relative flex gap-3 sm:text-2xl text-lg justify-between items-center w-auto h-[1rem] py-2">
          {/* Show search icon only if `showSearchIcon` is true */}
          {showSearchIcon && (
            <>
              <div className="d-md-none d-block">
                <MdSearchFixed />
              </div>
              <div className="text-[1rem] d-none d-md-block">
                <SearchFixed />
              </div>
            </>
          )}

          {/* ✅ Show User Profile if logged in, otherwise show login icon */}
          {isLogin ? (
            <LinkLoad href="/user">
              <BiUser className="cursor-pointer hover:text-gray-500" />
            </LinkLoad>
          ) : (
            <LinkLoad href="/login">
              <BiUser className="cursor-pointer hover:text-gray-500" />
            </LinkLoad>
          )}

          <Notifications />

          <LinkLoad href="/cart">
            <div className="relative">
              <BiShoppingBag className="cursor-pointer hover:text-gray-500" />
              {cartCount > 0 && (
                <div className="absolute top-2 right-0 btn btn-danger font-thin text-[.4rem] sm:text-[.6rem] px-0.5 sm:px-1 py-0 rounded-full">
                  {cartCount}
                </div>
              )}
            </div>
          </LinkLoad>
        </div>
      </div>
    </nav>
  );
};

export default Header;
