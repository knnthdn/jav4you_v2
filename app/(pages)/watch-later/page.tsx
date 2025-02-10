import { Logo } from "@/app/page";
import dynamic from "next/dynamic";
const WatchLaterMain = dynamic(() => import("@/components/WatchLaterMain"), {
  ssr: false,
});

export default function page() {
  return (
    <div className=" text-gray-300">
      <div className="mb-5">
        <Logo />
      </div>
      <WatchLaterMain />
    </div>
  );
}
