"use client";
import { ActressTypes } from "@/app/services/scrapeDef";
import { CircleChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useDetectResolution from "@/hooks/useDetectResolution";
import { Checkbox } from "./ui/checkbox";
import { useSaveLaterProvider } from "@/context/SaveLaterProvider";

export type ThumbnailTypes = {
  totalPageResults: number;
  data: ThumbnailDataTypes[];
  actress: ActressTypes[];
  extractActressInfo: ActressInfoTypes[];
};

export type ActressInfoTypes = {
  name?: string;
  info?: string;
  image?: string;
};

export type ThumbnailDataTypes = {
  image: string;
  duration: string;
  code: string;
  title: string;
  hasEnglishSub: boolean;
  isUncensored: boolean;
};

export type OnErrorThumnailTypes = {
  status: number;
  message: string;
};

function preview(code: string) {
  return `https://fourhoi.com/${code}/preview.mp4`;
}

export default function ThumbnailContainer({
  data,
  title,
  destination,
  fromRedirect,
  isRecomms,
  isSaveVideos,
}: {
  data: ThumbnailTypes;
  isRecomms?: boolean;
  title?: string;
  destination?: string;
  fromRedirect?: boolean | undefined;
  isSaveVideos?: boolean;
}) {
  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const previewRef = useRef<HTMLVideoElement>(null);
  const width = useDetectResolution();
  const { isEdit, setSelectDelete, handleDelete } = isSaveVideos
    ? useSaveLaterProvider()
    : { isEdit: false, setSelectDelete: () => {}, handleDelete: () => {} };

  useEffect(() => {
    if (active) {
      const playVideo = async () => {
        try {
          if (previewRef.current) {
            await previewRef.current.play();
          }
        } catch {
          // console.error("Video play error:", error);
        }
      };

      playVideo(); //
    }
  }, [active]);

  return (
    <>
      {/* Delete Button in Save Vidoes only shown when isSaveVideo is === true  */}
      {isEdit && (
        <button
          className="w-fit bg-red-800 p-1 rounded hover:bg-red-900 text-sm mb-5 text-white"
          onClick={handleDelete}
        >
          Delete Selected
        </button>
      )}

      {/* Main layout || Thumbnail  */}
      <section className="flex flex-col gap-5">
        {!fromRedirect && (
          <div className="flex justify-between items-center">
            <h2 className="text-light text-2xl font-semibold tracking-wide border-l-2 border-main px-2 sm:text-3xl sm:tracking-wider sm:font-bold">
              {title || "Videos"}
            </h2>

            <Link
              href={destination || "/"}
              className="flex text-light gap-1 text-sm items-center sm:text-lg hover:underline"
            >
              <span className="tracking-wider">More</span>
              <CircleChevronRight color="#EB720D" size={16} />
            </Link>
          </div>
        )}

        <div
          className={`grid gap-y-5 min-[300px]:grid-cols-2  min-[300px]:gap-x-4 min-[400px]:gap-x-5 min-[450px]:grid-cols-3 min-[450px]:gap-x-3 min-[450px]:gap-y-6 sm:gap-x-4 ${
            isRecomms
              ? " "
              : "lg:grid-cols-4 lg:gap-x-5 lg:gap-y-7 2xl:gap-x-6 2xl:gap-y-8"
          }`}
        >
          {data.data.map((items: ThumbnailDataTypes, index: number) => {
            const isActive = items.code === active;

            function handleThumbnailClick() {
              if (isActive || width >= 1024) {
                return router.push(`/watch/${items.code}`);
              } else {
                setActive(items.code);
              }
            }
            return (
              <div
                className={`${isSaveVideos && "flex flex-col gap-2"}`}
                key={`${index}-${items.title}`}
              >
                {/* Checkbox in Save Vidoes only shown when isSaveVideo is === true and isEdit === true  */}
                {isSaveVideos && isEdit && (
                  <Checkbox
                    className="border-white"
                    onCheckedChange={(isChecked) => {
                      setSelectDelete((prev: string[]) => {
                        if (isChecked) {
                          return [...prev, items.code]; // Add the item
                        } else {
                          return prev.filter(
                            (val: string) => val !== items.code
                          ); // Remove the item
                        }
                      });
                    }}
                  />
                )}

                {/* Container of Thumbail  */}
                <div
                  className={`flex flex-col gap-1 cursor-pointer`}
                  onClick={handleThumbnailClick}
                  onMouseEnter={
                    width <= 768
                      ? undefined
                      : () => width >= 1024 && setActive(items.code)
                  }
                  onMouseLeave={width <= 768 ? undefined : () => setActive("")}
                >
                  <div
                    className={`relative w-full h-[55vw] min-[300px]:h-[28vw] min-[450px]:h-[18vw] md:max-h-[140px] xl:max-h-[180px] 2xl:max-h-[210px] rounded-md overflow-hidden mb-[2px]  bg-neutral-800 `}
                  >
                    {!isActive ? (
                      <>
                        <Image
                          src={items.image}
                          alt={items.title}
                          fill
                          className="absolute object-cover "
                          sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
                        />

                        {items.duration !== "0" && (
                          <span className="absolute right-2 bottom-1 z-50 font-bold bg-[#1f2937bf] text-light px-1 py-[1px] rounded min-[300px]:text-[8px] min-[300px]:text-xs min-[340px]:text-xs min-[450px]:text-[10px] sm:text-sm xl:text-base tracking-wider  min-[500px]:text-xs sm:px-2">
                            {items.duration}
                          </span>
                        )}

                        {items.hasEnglishSub && (
                          <span className="absolute left-2 bottom-1 z-50 font-bold bg-[#991b1bb4]  text-light px-1 py-[1px] rounded text-sm min-[300px]:text-[8px] min-[300px]:text-xs sm:text-sm xl:text-base tracking-wider min-[340px]:text-xs min-[450px]:text-[10px] m min-[500px]:text-xs sm:px-2">
                            English sub
                          </span>
                        )}
                        {items.isUncensored && (
                          <span
                            className={`absolute ${
                              items.hasEnglishSub ? "top-1" : "bottom-1"
                            } left-2 z-50 font-bold bg-[#1e40afb4] text-light px-1 py-[1px] rounded text-sm min-[300px]:text-[8px] sm:text-sm xl:text-base tracking-wider  min-[340px]:text-xs min-[450px]:text-[10px]  min-[500px]:text-xs sm:px-2`}
                          >
                            Uncensored
                          </span>
                        )}
                      </>
                    ) : (
                      <video
                        ref={previewRef}
                        src={preview(items.code)}
                        loop
                        muted
                        className="h-full w-full rounded-md absolute object-cover"
                      ></video>
                    )}
                  </div>

                  <a className="text-light text-sm leading-snug line-clamp-2 font-semibold tracking-wide px-1 hover:text-main">
                    {items.title}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
