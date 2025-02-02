"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
