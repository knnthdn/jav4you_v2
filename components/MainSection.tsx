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
import { getAdsLinkPlayer, rotateAdsPlyr } from "@/app/services/services";
import AddToWatchLaterBtn from "./AddToWatchLaterBtn";
import Card from "./Card";
import Link from "next/link";

export type SearchResponseTypes = {
  status: number;
  recomms: RecommsTypes[];
  results?: ResultTypes | undefined;
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

export type ResultTypes = {
  actress: string;
  src: string;
  poster: string;
  code: string;
  title: string;
  description: string;
};

export default function MainSection({ query }: { query: string }) {
  const [data, setData] = useState<SearchResponseTypes>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adsPlyr, setAdsPlyr] = useState<string>("");

  useEffect(() => {
    const cachedData = localStorage.getItem("code");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);

      setData(parsedData);
    }
  }, []);

  useEffect(() => {
    if (!query) return;

    // Get cached data from localStorage
    const cachedData = localStorage.getItem("code");

    // Clear old cache if the query has changed
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);

      if (parsedData.results?.code !== query) {
        localStorage.removeItem("code");
      }
    }

    // Function to fetch data
    const getData = async () => {
      setIsLoading(true);
      setData(null); // Clear previous state immediately to prevent showing old data

      // Re-check localStorage after possible removal
      const freshCache = localStorage.getItem("code");

      if (freshCache) {
        setData(JSON.parse(freshCache));
        setIsLoading(false);
        return;
      }

      // Fetch new data
      const res = await searchCode(query);

      if (res) {
        setData(res as SearchResponseTypes);

        // Save new data if valid
        if (res.status !== 404 && res.status !== 500) {
          localStorage.setItem("code", JSON.stringify(res));
        }
      }

      setIsLoading(false);
    };

    getData();

    // Cleanup (Only resets state, no need to clear localStorage here)
    return () => {
      setData(null);
      setIsLoading(false);
    };
  }, [query]);

  useEffect(() => {
    async function plyrAds() {
      const adsData = await getAdsLinkPlayer();
      if (adsData) {
        setAdsPlyr(adsData);
      } else {
        setAdsPlyr("");
      }
    }

    plyrAds();
    // localStorage.removeItem("code");
  }, [query]);

  async function injectAdsPlyr() {
    if (!adsPlyr) return;
    window.open(adsPlyr, "_blank");
    setAdsPlyr("");
    rotateAdsPlyr();
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Searchbar  */}
        <SearchArea />

        {/* Player: will Shown when there is src    */}
        <div
          className={`${
            !data || data?.status === 404
              ? "h-[60vw] md:h-[50vw] lg:max-h-[512px]"
              : null
          }`}
        >
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
                <Link href={"/"} className="flex justify-end mr-1">
                  <button
                    onClick={() => {
                      localStorage.removeItem("code");
                      setData(null);
                    }}
                    className="text-gray-900 bg-white px-1 rounded text-sm mb-1 hover:bg-gray-300"
                  >
                    clear
                  </button>
                </Link>
                <div className="h-full w-full mb-1" onClick={injectAdsPlyr}>
                  <MediaPlayer
                    className="absolute top-0 left-0 w-full h-full z-index-0"
                    storage="storage-key"
                    // src={`https://goodproxy.danieltiu376.workers.dev/fetch?url=${data.results.src}`} //1
                    // src={`https://goodproxy.jv4you.workers.dev/fetch?url=${data.results.src}`} //2
                    // src={`https://goodproxy.anoto083.workers.dev/fetch?url=${data.results.src}`} //3
                    // src={`https://goodproxy.hatdogsamani.workers.dev/fetch?url=${data.results.src}`} //4
                    // src={`https://goodproxy.tymgorvez.workers.dev/fetch?url=${data.results.src}`} //5

                    src={`https://m3u8-proxy-cors-murex.vercel.app/cors?url=${data.results.src}`}
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

              <div className="grid grid-cols-2 gap-2">
                <AddToWatchLaterBtn data={data} />
                <DownloadSection src={data.results.src} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recommendation */}
      {data?.recomms && (
        <div className="mt-8">
          <h2 className="text-2xl text-gray-300 mb-1">Recommendation:</h2>

          <Card data={data} />
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
