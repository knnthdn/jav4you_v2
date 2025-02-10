"use client";

import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NavsTypes = {
  name: string;
  path: string;
};

const navs = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Watch later",
    path: "/watch-later",
  },
  {
    name: "FAQ",
    path: "/faq",
  },
  {
    name: "About",
    path: "/about",
  },
];

export default function NavsHeader() {
  return (
    <div>
      {/* <NavsHeaderDesktop navs={navs} /> */}
      <NavsHeaderMobile navs={navs} />
    </div>
  );
}

function NavsHeaderDesktop({ navs }: { navs: NavsTypes[] }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-5 w-full justify-center text-xs  sm:text-sm">
        {navs.map((el, index) => {
          return (
            <Link href={el.path} key={index} passHref>
              <li
                className={`${
                  pathname === el.path && "underline underline-offset-2"
                }`}
              >
                {el.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}

function NavsHeaderMobile({ navs }: { navs: NavsTypes[] }) {
  return (
    <div className="flex justify-between items-center">
      <Link href={"/"}>
        <div className="relative w-24 h-5 sm:w-28 sm:h-6">
          <Image
            src={"/jav4you_logo_v2.png"}
            alt="Jav4you Logo"
            fill
            className="absolute"
            sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
          />
        </div>
      </Link>

      <div className="flex gap-2 items-center">
        <Search color="#D8D8D8" size={24} className="sm:size-7" role="button" />

        <Popover>
          <PopoverTrigger>
            <Menu
              color="#EB720D"
              size={28}
              role="button"
              className="sm:size-8"
            />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40 p-1">
            Home
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
