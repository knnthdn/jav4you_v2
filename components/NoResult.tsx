import Image from "next/image";

export default function NoResult({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <h2 className="text-white capitalize text-xl ">
        No results were found for &apos;{query}&apos;
      </h2>

      <Image
        src={"/notFoundIcon.png"}
        alt="Not Found icon"
        width={56}
        height={56}
        className="mx-auto"
      />
    </div>
  );
}
