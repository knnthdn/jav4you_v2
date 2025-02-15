import Link from "next/link";
import React from "react";
export default function Footer() {
  return (
    <footer className="text-white w-full py-8 px-1 lg:px-4 border-t border-[#4e4d4d] text-center mt-16  self-end ">
      <p className="text-xs font-light flex flex-col ">
        <span className="font-semibold">Disclaimer:</span>
        JAV4You.fun does not store any content on our servers. All content
        provided on this website such as image, video and audio&apos;s is hosted
        by non-affiliated third-party website and is publicly available on the
        internet. We do not upload, control, or manage any of the content and
        take no responsibility for its availability, legality, or accuracy. If
        you believe any content violates copyright or other regulations, please
        contact the respective hosting provider directly. By using this website,
        you acknowledge and agree to these terms.
      </p>

      <div className="flex gap-3 justify-center mt-2">
        <Link href={"/privacy-and-policy"} className="underline">
          Privacy and Policy.
        </Link>

        <Link href={"/dmca"} className="underline">
          DMCA
        </Link>
      </div>
    </footer>
  );
}
