"use client";

import { useSaveLaterProvider } from "@/context/SaveLaterProvider";
import ThumbnailContainer from "./ThumbnailContainer";
import { useEffect } from "react";

export default function SaveVideos() {
  const videoList = localStorage.getItem("saveVideos");
  const data = videoList ? JSON.parse(videoList) : [];
  const { isEdit } = useSaveLaterProvider();

  const thumbnail = {
    totalPageResults: 0,
    data: data,
    actress: [],
    extractActressInfo: [],
  };

  useEffect(() => {}, [isEdit]);

  if (data.length === 0)
    return (
      <p className="text-white text-xs tracking-wide h-[50vw] w-full grid place-content-center">
        <span className="text-center text-xl text-red-800">￣\_(ツ)_/￣</span>
        You don&apos;t have any saved videos yet.
      </p>
    );

  return (
    <div>
      <ThumbnailContainer
        data={thumbnail}
        fromRedirect={true}
        isSaveVideos={true}
      />
    </div>
  );
}
