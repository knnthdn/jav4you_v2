import Link from "next/link";
import React from "react";
export default function Footer() {
  return (
    <footer className="text-white w-full py-2 px-1 lg:px-4 border-t border-[#4e4d4d] sm:py-2 text-center mt-5 mt-10 sm:mt-8 self-end">
      <p className="text-xs font-light flex flex-col ">
        <span className="font-semibold">Disclaimer:</span>
        JAV4You.fun does not store any content on our servers. All content
        provided on this website is hosted by third-party services and is
        publicly available on the internet. We do not upload, control, or manage
        any of the content and take no responsibility for its availability,
        legality, or accuracy. If you believe any content violates copyright or
        other regulations, please contact the respective hosting provider
        directly. By using this website, you acknowledge and agree to these
        terms.
      </p>
      <Link href={"/privacy-and-policy"} className="underline">
        Privacy and Policy.
      </Link>
    </footer>
  );
}
