import { Logo } from "@/app/page";
import dynamic from "next/dynamic";
const WatchLaterMain = dynamic(() => import("@/components/WatchLaterMain"), {
  ssr: false,
});

export default function page() {
  return (
    <div className="px-3 text-gray-300 flex flex-col gap-3 sm:px-6 md:px-16 lg:max-w-screen-lg lg:mx-auto">
      <div className="mb-5">
        <Logo />
      </div>
      <WatchLaterMain />
    </div>
  );
}
