// "use client";
// import React, { useEffect, useState } from "react";
// import { searchCode } from "@/app/action/action";

// import { MediaPlayer, MediaProvider } from "@vidstack/react";

// import "@vidstack/react/player/styles/default/theme.css";
// import "@vidstack/react/player/styles/default/layouts/audio.css";
// import "@vidstack/react/player/styles/default/layouts/video.css";

// import {
//   defaultLayoutIcons,
//   DefaultVideoLayout,
// } from "@vidstack/react/player/layouts/default";
// import DownloadSection from "./DownloadSection";
// import { Skeleton } from "./ui/skeleton";
// import { getAdsLinkPlayer, rotateAdsPlyr } from "@/app/services/services";
// import AddToWatchLaterBtn from "./AddToWatchLaterBtn";
// import Card from "./Card";

// export type SearchResponseTypes = {
//   status: number;
//   recomms: RecommsTypes[];
//   results?: ResultTypes | undefined;
//   msg?: string;
// } | null;

// interface RecommsTypes {
//   id: string;
//   values: {
//     dm: number;
//     duration: number;
//     has_chinese_subtitle: boolean;
//     has_english_subtitle: boolean;
//     is_uncensored_leak: boolean;
//     title_en: string;
//   };
// }

// export type ResultTypes = {
//   actress: string;
//   src: string;
//   poster: string;
//   code: string;
//   title: string;
//   description: string;
// };

// export default function MainSection({ query }: { query: string }) {
//   const [data, setData] = useState<SearchResponseTypes>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [adsPlyr, setAdsPlyr] = useState<string>("");

//   useEffect(() => {
//     const cachedData = localStorage.getItem("code");
//     if (cachedData) {
//       const parsedData = JSON.parse(cachedData);

//       setData(parsedData);
//     }
//   }, []);

//   useEffect(() => {
//     if (!query) return;

//     // Get cached data from localStorage
//     const cachedData = localStorage.getItem("code");

//     // Clear old cache if the query has changed
//     if (cachedData) {
//       const parsedData = JSON.parse(cachedData);

//       if (parsedData.results?.code !== query) {
//         localStorage.removeItem("code");
//       }
//     }

//     // Function to fetch data
//     const getData = async () => {
//       setIsLoading(true);
//       setData(null); // Clear previous state immediately to prevent showing old data

//       // Re-check localStorage after possible removal
//       const freshCache = localStorage.getItem("code");

//       if (freshCache) {
//         setData(JSON.parse(freshCache));
//         setIsLoading(false);
//         return;
//       }

//       // Fetch new data
//       const res = await searchCode(query);

//       if (res) {
//         setData(res as SearchResponseTypes);

//         // Save new data if valid
//         if (res.status !== 404 && res.status !== 500) {
//           localStorage.setItem("code", JSON.stringify(res));
//         }
//       }

//       setIsLoading(false);
//     };

//     getData();

//     // Cleanup (Only resets state, no need to clear localStorage here)
//     return () => {
//       setData(null);
//       setIsLoading(false);
//     };
//   }, [query]);

//   useEffect(() => {
//     async function plyrAds() {
//       const adsData = await getAdsLinkPlayer();
//       if (adsData) {
//         setAdsPlyr(adsData);
//       } else {
//         setAdsPlyr("");
//       }
//     }

//     plyrAds();
//     // localStorage.removeItem("code");
//   }, [query]);

//   async function injectAdsPlyr() {
//     if (!adsPlyr) return;
//     window.open(adsPlyr, "_blank");
//     setAdsPlyr("");
//     rotateAdsPlyr();
//   }

//   return (
//     <div>
//       <div>
//         <div onClick={injectAdsPlyr}>
//           <MediaPlayer
//             storage="storage-key"
//             src={
//               data?.results
//                 ? `https://goodproxy.danieltiu376.workers.dev/fetch?url=${data.results.src}`
//                 : undefined
//             } //1
//             // src={`https://goodproxy.jv4you.workers.dev/fetch?url=${data.results.src}`} //2
//             // src={`https://goodproxy.anoto083.workers.dev/fetch?url=${data.results.src}`} //3
//             // src={`https://goodproxy.hatdogsamani.workers.dev/fetch?url=${data.results.src}`} //4
//             // src={`https://goodproxy.tymgorvez.workers.dev/fetch?url=${data.results.src}`} //5

//             // src={`https://m3u8-proxy-cors-murex.vercel.app/cors?url=${data.results.src}`}
//             viewType="video"
//             streamType="on-demand"
//             logLevel="warn"
//             crossOrigin
//             playsInline
//             title={data?.results ? data.results.code.toUpperCase() : ""}
//             // poster={data.results.poster}
//           >
//             {data?.results || (!isLoading && data?.status !== 404) ? (
//               <>
//                 <MediaProvider />
//                 <DefaultVideoLayout icons={defaultLayoutIcons} />
//               </>
//             ) : null}

//             {!data || isLoading ? (
//               <Skeleton className="bg-[#363636] h-full w-full" />
//             ) : null}
//           </MediaPlayer>
//         </div>
//         {data?.results && !isLoading && data?.status !== 404 ? (
//           <div className="mb-2 px-1">
//             <h2 className="text-gray-300 text-sm sm:text-base font-bold leading-tight line-clamp-2 mb-2 md:text-xl">
//               {data.results.title}
//             </h2>

//             <div className="text-gray-300 text-xs sm:text-sm">
//               <span className="font-bold">Description:</span>
//               <p className=" max-h-16 overflow-auto flex flex-col gap-[2px]">
//                 {data.results.description}
//               </p>

//               {data.results?.actress && (
//                 <div className="flex gap-1 text-gray-300 text-xs sm:text-sm mt-2">
//                   <span className="font-semibold">Actress:</span>
//                   <span className="text-[#ebcb8b]">
//                     {data.results?.actress}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="border border-gray-300 my-1"></div>

//             {/* Download button && Watch later */}
//             <div className="grid grid-cols-2 gap-2">
//               <AddToWatchLaterBtn data={data} />
//               <DownloadSection src={data.results.src} />
//             </div>

//             {data?.recomms && (
//               <div className="mt-8">
//                 <h2 className="text-2xl text-gray-300 mb-1">Recommendation:</h2>

//                 <Card data={data} />
//               </div>
//             )}
//           </div>
//         ) : (
//           <OnLoadingData />
//         )}
//       </div>
//     </div>
//   );
// }

// function OnLoadingData() {
//   return (
//     <div className="h-full w-full px-1">
//       <Skeleton className="w-full bg-[#363636] rounded-xl py-4 mt-2" />

//       <div className="grid gap-y-3 min-[350px]:grid-cols-2 min-[350px]:gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 mt-6">
//         {Array.from({ length: 12 }).map((_, index) => {
//           return (
//             <Skeleton
//               key={index}
//               className="bg-[#363636] h-[50vw] min-[350px]:h-[30vw] sm:h-[20vw] md:h-[16vw] lg:h-[13vw] min-[1200px]:h-[10vw] min-[1300px]:max-h-[130px] "
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }
