"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const LoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    if (loading) NProgress.start(); 
    return () => {
      NProgress.done(); 
      setLoading(false);
    };
  }, [loading]);

  useEffect(() => {
    setLoading(true); 
  }, [pathname]);

  return null;
};

export default LoadingBar;
