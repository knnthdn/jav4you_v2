"use client";
import React, { useEffect, useState } from "react";
import SearchArea from "./SearchArea";
import { searchCode } from "@/app/action/action";

import { MediaPlayer, MediaProvider } from "@vidstack/react";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import DownloadSection from "./DownloadSection";
import { Skeleton } from "./ui/skeleton";
import { getAdsLink } from "@/app/services/services";
import Image from "next/image";
import { formatDuration } from "@/lib/utils";
import Link from "next/link";

type SearchResponseTypes = {
  status: number;
  recomms: RecommsTypes[];
  results?:
    | {
        actress: string;
        src: string;
        // poster: string;
        code: string;
        title: string;
        description: string;
      }
    | undefined;
  msg?: string;
} | null;

interface RecommsTypes {
  id: string;
  values: {
    dm: number;
    duration: number;
    has_chinese_subtitle: boolean;
    has_english_subtitle: boolean;
    is_uncensored_leak: boolean;
    title_en: string;
  };
}

export default function MainSection({ query }: { query: string }) {
  const [data, setData] = useState<SearchResponseTypes>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adsPlyr, setAdsPlyr] = useState<string>("");

  useEffect(() => {
    if (!query) return;
    const cachedData = localStorage.getItem("code");

    if (cachedData) {
      if (JSON.parse(cachedData).results?.code !== query) {
        localStorage.removeItem("code");
      }
      //call automatically
    }

    const getData = async () => {
      setIsLoading(true);

      // Check if data exists in local storage
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setIsLoading(false);

        // (async () => {
        //   const adsData = await getAdsLink();

        //   if (adsData) {
        //     setAdsPlyr(adsData);
        //   } else {
        //     setAdsPlyr("");
        //   }
        // })();

        return;
      }

      // const adsData = await getAdsLink();

      // if (adsData) {
      //   setAdsPlyr(adsData);
      // } else {
      //   setAdsPlyr("");
      // }

      const res = await searchCode(query);

      if (res) {
        setData(res as SearchResponseTypes);
        if (res.status !== 404 && res.status !== 500) {
          localStorage.setItem("code", JSON.stringify(res));
        }
      }

      // Save data to local storage
      setIsLoading(false);
    };
    getData();

    return () => {
      setData(null);
      setIsLoading(false);
      localStorage.removeItem("code");
    };
  }, [query]);

  useEffect(() => {
    async function plyrAds() {
      const adsData = await getAdsLink();

      if (adsData) {
        setAdsPlyr(adsData);
      } else {
        setAdsPlyr("");
      }
    }

    plyrAds();
  }, [query]);

  function injectAdsPlyr() {
    if (!adsPlyr) return;
    window.open(adsPlyr, "_blank");
    setAdsPlyr("");
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Searchbar  */}
        <SearchArea isLoading={isLoading} />

        {/* Player: will Shown when there is src    */}
        <div className={`${!data && "h-[60vw] md:h-[50vw] lg:max-h-[512px]"}`}>
          {/* Shown when there is no query  */}
          {!data && !isLoading && (
            <div className="h-full w-full grid place-content-center border border-[#4e4d4d]">
              <span className="text-white text-xl">
                Video will appear here:
              </span>
            </div>
          )}

          {/* Not Found response */}
          {data?.status === 404 && (
            <div className="h-full w-full grid place-content-center border border-[#4e4d4d]">
              <span className="text-red-500 text-xl text-center">
                Not Found! check your code and try again.
              </span>
            </div>
          )}

          {/* Timeout responese  */}
          {data?.status === 500 && (
            <div className="h-full w-full grid place-content-center border border-[#4e4d4d]">
              <span className="text-red-500 text-xl text-center">
                Request timeout, Please reload your browser or click retry.
              </span>
              <button
                className="text-white underline"
                onClick={() => window.location.reload()}
              >
                retry.
              </button>
            </div>
          )}

          {/* Loading indicator  */}
          {isLoading && <OnLoadingData />}

          {/* Player and download buttoon */}
          {data?.results && !isLoading && data.status !== 404 && (
            <>
              <div className="h-full w-full">
                <div className="h-full w-full mb-1" onClick={injectAdsPlyr}>
                  <MediaPlayer
                    className="absolute top-0 left-0 w-full h-full z-index-0"
                    storage="storage-key"
                    src={`https://goodproxy.danieltiu376.workers.dev/fetch?url=${data.results.src}`}
                    viewType="video"
                    streamType="on-demand"
                    logLevel="warn"
                    crossOrigin
                    playsInline
                    title={data.results.code.toUpperCase()}
                    // poster={data.results.poster}
                  >
                    <MediaProvider />

                    <DefaultVideoLayout icons={defaultLayoutIcons} />
                  </MediaPlayer>
                </div>
              </div>

              <div className="mb-2">
                <h2 className="text-gray-300 text-sm sm:text-base font-bold leading-tight line-clamp-2 mb-2 md:text-xl">
                  {data.results.title}
                </h2>

                <div className="text-gray-300 text-xs sm:text-sm">
                  <span className="font-bold">Description:</span>
                  <p className=" max-h-16 overflow-auto flex flex-col gap-[2px]">
                    {data.results.description}
                  </p>

                  {data.results?.actress && (
                    <div className="flex gap-1 text-gray-300 text-xs sm:text-sm mt-2">
                      <span className="font-semibold">Actress:</span>
                      <span className="text-[#ebcb8b]">
                        {data.results?.actress}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-gray-300 my-1"></div>

              <DownloadSection src={data.results.src} />
            </>
          )}
        </div>
      </div>

      {/* Recommendation */}
      {data?.recomms && (
        <div className="mt-8">
          <h2 className="text-2xl text-gray-300 mb-1">Recommendation:</h2>

          <div className="grid gap-y-3 min-[350px]:grid-cols-2 min-[350px]:gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {data.recomms.map((items, index) => {
              return (
                <Link
                  href={`../?q=${items.id.toLowerCase()}`}
                  key={index}
                  onClick={() => localStorage.removeItem("code")}
                  passHref
                >
                  <div>
                    <div className="relative w-full h-[60vw] min-[350px]:h-[30vw] sm:h-[20vw] md:h-[16vw] lg:h-[13vw] min-[1200px]:h-[10vw] min-[1300px]:max-h-[130px] rounded-md overflow-hidden cursor-pointer">
                      <Image
                        src={`https://fourhoi.com/${items.id}/cover-n.jpg`}
                        alt={`${items.values.title_en} cover`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="absolute hover:scale-105 transition-transform duration-300"
                      />
                      <span className="px-[3px] min-[350px]:text-xs min-[420px]:text-base rounded-sm absolute bottom-1 right-1 text-white bg-[#1e1e1eb0]">
                        {formatDuration(items.values.duration)}
                      </span>

                      {items.values.is_uncensored_leak && (
                        <span
                          className={`absolute min-[350px]:text-xs min-[420px]:text-base ${
                            !items.values.has_english_subtitle
                              ? "bottom-1"
                              : "top-1"
                          } left-1 px-[3px] rounded-sm  text-white bg-[#1e40afb0] font-semibold`}
                        >
                          uncensored
                        </span>
                      )}

                      <span className="px-[3px] min-[350px]:text-xs rounded-sm min-[420px]:text-base absolute bottom-1 left-1 text-white bg-[#b91c1cb0]">
                        english subtitle
                      </span>
                      {/* {items.values.has_english_subtitle && (
                      )} */}
                    </div>

                    <span className="text-gray-300 line-clamp-1">
                      {items.values.title_en}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

function OnLoadingData() {
  return (
    <div className="h-full w-full ">
      <Skeleton className="h-full w-full bg-[#4b4b4b]" />
      <Skeleton className="w-full bg-[#4b4b4b] rounded-xl py-4 mt-2" />
    </div>
  );
}
