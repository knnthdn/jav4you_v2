import Link from "next/link";
import React from "react";
export default function Footer() {
  return (
    <footer className="text-white w-full py-1 border-t border-[#4e4d4d] sm:py-2 text-center mt-5 sm:mt-8 self-end">
      <Link href={"/privacy-and-policy"} className="underline">
        Privacy and Policy.
      </Link>
    </footer>
  );
}
