"use client";
import { useEffect, useState } from "react";
import NavsHeader from "./NavsHeader";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`px-2 py-3 border-[#4e4d4d] sticky top-0 z-50 ${
        isScrolled && "bg-[#171717ad] backdrop-blur-sm"
      }`}
    >
      <NavsHeader />
    </header>
  );
}
