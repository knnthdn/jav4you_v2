"use client";
import Image from "next/image";
import { ResultTypes, SearchResponseTypes } from "./MainSection";
import { Checkbox } from "./ui/checkbox";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WatchLaterWrapper({
  toggleDelete,
  setToggleDelete,
}: {
  toggleDelete: boolean;
  setToggleDelete: (val: boolean) => void;
}) {
  const videoList = localStorage.getItem("playList");
  const [selected, setSelected] = useState<SearchResponseTypes[]>([]);

  useEffect(() => {
    if (!toggleDelete) return setSelected([]);

    return () => setSelected([]);
  }, [toggleDelete]);

  const data = videoList ? JSON.parse(videoList) : [];

  if (data.length === 0)
    return (
      <p className="text-white text-xs tracking-wide absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-nowrap gap-1">
        <span className="text-center text-xl text-red-800">￣\_(ツ)_/￣</span>
        You don&apos;t have any saved videos yet.
      </p>
    );

  function handleDelete() {
    if (selected.length === 0) return;
    const filtered = data.filter(
      (item: SearchResponseTypes) =>
        !selected.some(
          (exclude: SearchResponseTypes) =>
            exclude?.results?.code === item?.results?.code
        )
    );
    localStorage.setItem("playList", JSON.stringify([...filtered]));
    setToggleDelete(false);
  }

  return (
    <>
      {toggleDelete && (
        <button
          className="w-fit bg-red-800 p-1 rounded hover:bg-red-900 text-sm"
          onClick={handleDelete}
        >
          delete selected
        </button>
      )}

      <div className="grid grid-cols-2 gap-2 min-[375px]:gap-3 min-[475px]:grid-cols-3 min-[475px]:gap-y-2 sm:gap-y-3 lg:grid-cols-4 md:gap-y-4">
        {data.map((items: SearchResponseTypes, index: number) => {
          const video: ResultTypes | undefined = items?.results;

          return (
            <div key={index}>
              {toggleDelete && (
                <Checkbox
                  id={`${index}`}
                  className="border-white self-end mb-1"
                  onCheckedChange={(isChecked) => {
                    setSelected((prev) => {
                      if (isChecked) {
                        return [...prev, items]; // Add the item
                      } else {
                        return prev.filter(
                          (val: SearchResponseTypes) =>
                            val?.results?.code !== items?.results?.code
                        ); // Remove the item
                      }
                    });
                  }}
                />
              )}

              <Link href="/" passHref>
                <div
                  className="w-full flex flex-col gap-1 relative"
                  onClick={() =>
                    localStorage.setItem("code", JSON.stringify(items))
                  }
                >
                  <div className="relative h-[28vw] w-full min-[475px]:h-[20vw] sm:h-[18vw] md:h-[17vw]  lg:max-h-[134px] overflow-hidden cursor-pointer">
                    <Image
                      src={video?.poster || ""}
                      alt={video?.title || "No alt for this video"}
                      fill
                      className="absolute rounded hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h2 className="line-clamp-2 leading-tight text-xs md:text-sm">
                    {video?.title}
                  </h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
