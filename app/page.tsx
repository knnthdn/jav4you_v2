import Annoucement from "@/components/Annoucement";
import MainSection from "@/components/MainSection";
import RootInfo from "@/components/RootInfo";
import Image from "next/image";
import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = await searchParams;

  return (
    <>
      <div className="w-full px-3 h-fit py-1 flex flex-col gap-2 sm:px-6 md:px-16 lg:max-w-screen-lg lg:mx-auto">
        <Annoucement />
        <Logo />
        <MainSection query={query.q} />
        <div className="border border-gray-300 opacity-35 w-full mt-10 mb-5 rounded-md"></div>
        <RootInfo />
      </div>
    </>
  );
}

export function Logo() {
  return (
    <div className="w-full flex justify-center cursor-pointer sm:mb-2">
      <Link href={"/"}>
        <Image
          src={"/jav4u_logo.png"}
          alt="Jav4You Logo"
          width={160}
          height={70}
        />
      </Link>
    </div>
  );
}
