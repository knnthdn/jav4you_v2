"use client";
import { ActressTypes } from "@/app/services/scrapeDef";
import useDetectResolution from "@/hooks/useDetectResolution";
import { CircleChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type ThumbnailTypes = {
  totalResults: number;
  data: ThumbnailDataTypes[];
  actress: ActressTypes[];
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
}: {
  data: ThumbnailTypes;
  title?: string;
  destination?: string;
  fromRedirect?: boolean | undefined;
}) {
  const [active, setActive] = useState<string>("");
  const router = useRouter();
  const previewRef = useRef<HTMLVideoElement>(null);
  const width = useDetectResolution();

  useEffect(() => {
    setActive("");
  }, [width]);

  useEffect(() => {
    if (active) {
      const playVideo = async () => {
        try {
          if (previewRef.current) {
            await previewRef.current.play();
          }
        } catch (error) {
          // console.error("Video play error:", error);
        }
      };

      playVideo(); //
    }
  }, [active]);

  return (
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

      <div className="grid gap-y-5 min-[300px]:grid-cols-2  min-[300px]:gap-x-4 min-[400px]:gap-x-5 min-[450px]:grid-cols-3 min-[450px]:gap-x-3 min-[450px]:gap-y-6 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-7 2xl:gap-x-6 2xl:gap-y-8">
        {data.data.map((items: ThumbnailDataTypes, index: number) => {
          const isActive = items.code === active;

          function handleThumbnailClick() {
            if (isActive) {
              return router.push(`/watch?q=${items.code}`);
            } else {
              setActive(items.code);
            }
          }
          return (
            <div
              key={`${index}-${items.title}`}
              className="flex flex-col gap-1 cursor-pointer"
              onClick={handleThumbnailClick}
              onMouseEnter={() => setActive(items.code)}
              onMouseLeave={() => setActive("")}
            >
              <div className="relative w-full h-[55vw] min-[300px]:h-[28vw] min-[450px]:h-[18vw] md:max-h-[140px] xl:max-h-[180px] 2xl:max-h-[210px] rounded-md overflow-hidden mb-[2px]bg-neutral-800">
                {!isActive ? (
                  <>
                    <Image
                      src={items.image}
                      alt={items.title}
                      fill
                      className="absolute object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
                    />

                    <span className="absolute right-2 bottom-1 z-50 font-bold bg-[#1f2937bf] text-light px-1 py-[1px] rounded min-[300px]:text-[8px] min-[300px]:text-xs min-[340px]:text-xs min-[450px]:text-[10px] sm:text-sm xl:text-base tracking-wider min-[450px]:text-[10px] min-[500px]:text-xs sm:px-2">
                      {items.duration}
                    </span>

                    {items.hasEnglishSub && (
                      <span className="absolute left-2 bottom-1 z-50 font-bold bg-[#991b1bb4]  text-light px-1 py-[1px] rounded text-sm min-[300px]:text-[8px] min-[300px]:text-xs sm:text-sm xl:text-base tracking-wider min-[340px]:text-xs min-[450px]:text-[10px] min-[450px]:text-[10px] min-[500px]:text-xs sm:px-2">
                        English sub
                      </span>
                    )}
                    {items.isUncensored && (
                      <span
                        className={`absolute ${
                          items.hasEnglishSub ? "top-1" : "bottom-1"
                        } left-2 z-50 font-bold bg-[#1e40afb4] text-light px-1 py-[1px] rounded text-sm min-[300px]:text-[8px] sm:text-sm xl:text-base tracking-wider  min-[340px]:text-xs min-[450px]:text-[10px] min-[450px]:text-[10px] min-[500px]:text-xs sm:px-2`}
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
          );
        })}
      </div>
    </section>
  );
}
