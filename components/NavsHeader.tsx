"use client";

import { ChevronDown, ChevronUp, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NavsModal, { ChildTypes } from "./NavsModal";
import { useHeaderProvider } from "@/context/HeaderProvider";
import { amatuer, asiaAv, uncensored, watchJav } from "@/lib/navsList";
import { useNavsProvider } from "@/context/NavsProvider";
import { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

const navs = [
  {
    title: "Watch jav",
    childs: watchJav,
  },
  {
    title: "Amateur",
    childs: amatuer,
  },
  {
    title: "Uncensored",
    childs: uncensored,
  },
  {
    title: "Asia AV",
    childs: asiaAv,
  },
];

export default function NavsHeader() {
  const { onToggleSearch } = useHeaderProvider();

  return (
    <div className="flex justify-between items-center">
      {/* Logo  */}
      <Link href={"/"}>
        <div className="relative w-24 h-5 sm:w-28 sm:h-6 lg:w-36 lg:h-8">
          <Image
            src={"/jav4you_logo_v2.png"}
            alt="Jav4you Logo"
            fill
            className="absolute"
            sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
          />
        </div>
      </Link>

      <div className="flex gap-2 items-center xl:flex-row-reverse xl:gap-5 xl:flex-1">
        <Search
          color="#D8D8D8"
          size={24}
          className="sm:size-7"
          role="button"
          onClick={onToggleSearch}
        />
        <NavsHeaderMobile />
        <NavsHeaderDesktop />
      </div>
    </div>
  );
}

function NavsHeaderDesktop() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);
  const popOverRef = useRef(null);
  const popOverTriggerRef = useRef(null);

  useClickOutside(popOverRef, popOverTriggerRef, () => setActive(0));

  // console.log(isOpen);

  function handleActive(index: number) {
    if (active === index) {
      setActive(0);
      // setIsOpen(false);
    } else {
      setActive(index);
      // setIsOpen(true);
    }
  }

  return (
    <div className="hidden xl:flex gap-5 w-full justify-evenly">
      <Link
        href={"/english-subtitle?q=english-subtitle"}
        className="text-[#e5e9f0] font-semibold tracking-wider flex justify-between gap-8 hover:text-main"
        onClick={() => setActive(0)}
      >
        English subtitle
      </Link>
      {navs.map(
        (items: { title: string; childs: ChildTypes[] }, index: number) => {
          return (
            <Popover
              key={index}
              open={active === index + 1}
              onOpenChange={(val) => {
                const convert = !val ? 0 : index + 1;
                setActive(convert);
              }}
            >
              <PopoverTrigger
                className="text-[#e5e9f0] font-semibold tracking-wider flex justify-between gap-8 hover:text-main"
                onClick={() => handleActive(index + 1)}
                // ref={popOverTriggerRef}
              >
                {items.title}
                <span>
                  {active === index + 1 ? <ChevronUp /> : <ChevronDown />}
                </span>
              </PopoverTrigger>

              {active === index + 1 && (
                <PopoverContent
                  className="hidden xl:block w-40 p-1 bg-[#e5e9f0] z-[999999] px-0 border-0 min-w-[225px]"
                  // ref={popOverRef}
                >
                  <ul className="w-full">
                    {items.childs.map((items: ChildTypes, index: number) => {
                      return (
                        <Link href={items.destination} key={index}>
                          <li
                            className="px-4 py-2 text-[#2e3440] tracking-wider text-sm font-semibold hover:bg-[#b0b2b8cc]"
                            onClick={() => setActive(0)}
                          >
                            {items.title}
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </PopoverContent>
              )}
            </Popover>
          );
        }
      )}
      <Link
        href={"/watch-later"}
        className="text-[#e5e9f0] font-semibold tracking-wider flex justify-between gap-8 hover:text-main"
        onClick={() => setActive(0)}
      >
        Saved Videos
      </Link>
    </div>
  );
}

function NavsHeaderMobile() {
  const { activeNavs, setActiveNavs, isModalOpen, setIsModalOpen } =
    useNavsProvider();
  const popOverRef = useRef(null);
  const popOverTriggerRef = useRef(null);

  useClickOutside(popOverRef, popOverTriggerRef, () => setIsModalOpen(false));

  return (
    <Popover open={isModalOpen} onOpenChange={() => setActiveNavs(0)}>
      <PopoverTrigger
        onClick={() => setIsModalOpen(!isModalOpen)}
        ref={popOverTriggerRef}
        className="xl:hidden"
      >
        <Menu color="#EB720D" size={28} role="button" className="sm:size-8" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-40 p-1 bg-[#e5e9f0] z-[999999] px-0 border-0 min-w-[225px]"
        ref={popOverRef}
      >
        <Link
          href={"/english-subtitle?q=english-subtitle"}
          className="px-4 py-2 text-[#2e3440] font-semibold tracking-wider w-full block"
          onClick={() => setIsModalOpen(false)}
        >
          English subtitle
        </Link>
        {navs.map(
          (items: { title: string; childs: ChildTypes[] }, index: number) => {
            return (
              <NavsModal
                key={index}
                title={items.title}
                child={items.childs}
                isActive={activeNavs === index + 1}
                index={index + 1}
              />
            );
          }
        )}
        <Link
          href={"/watch-later"}
          className="px-4 py-2 text-[#2e3440] font-semibold tracking-wider w-full block"
          onClick={() => setIsModalOpen(false)}
        >
          Saved videos
        </Link>
      </PopoverContent>
    </Popover>
  );
}
