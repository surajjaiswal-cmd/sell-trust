"use client";

import Link from "next/link";
import { useState } from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

type LoadingActionProps = {
  href: string;
  children: React.ReactNode;
  target?: string; // ✅ Allow optional `target` prop
  className?: string; // ✅ Allow optional `className` prop
};

const LinkLoad = ({
  href,
  children,
  target,
  className,
}: LoadingActionProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    nProgress.start();
    setLoading(true);
  };

  return (
    <Link
      href={href}
      target={target}
      className={className}
      onClick={handleClick}>
      {children}
      {loading && <span className="loading-spinner" />}
    </Link>
  );
};

export default LinkLoad;
