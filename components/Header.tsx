"use client";
import { useEffect, useState } from "react";
import NavsHeader from "./NavsHeader";
import SearchArea from "./SearchArea";
import { useHeaderProvider } from "@/context/HeaderProvider";
import { NavsProvider } from "@/context/NavsProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { toggleSearch } = useHeaderProvider();

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
      className={`px-2 py-3 border-[#4e4d4d] sticky top-0 z-[99999] ${
        isScrolled && "bg-[#171717ad] backdrop-blur-sm"
      }`}
    >
      <NavsProvider>
        <NavsHeader />
      </NavsProvider>

      {toggleSearch && (
        <div className="flex mt-5 w-full justify-center">
          <SearchArea type="header" />
        </div>
      )}
    </header>
  );
}
