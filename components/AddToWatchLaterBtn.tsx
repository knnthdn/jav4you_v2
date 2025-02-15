"use client";
import React, { useEffect, useState } from "react";
import { ThumbnailDataTypes } from "./ThumbnailContainer";

export default function AddToWatchLaterBtn({
  data,
}: {
  data: ThumbnailDataTypes;
}) {
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    const videoList = localStorage?.getItem("saveVideos");
    if (videoList) {
      const list = JSON.parse(videoList);
      setIsExist(
        list.some((val: ThumbnailDataTypes) => val.code === data?.code)
      );
    }
  }, [data, isExist]);

  function handleAdd() {
    const videoList = localStorage?.getItem("saveVideos");

    // localStorage.setItem("playList", JSON.stringify([data?.results]));
    if (!videoList) {
      localStorage.setItem("saveVideos", JSON.stringify([data]));
      setIsExist(true);
    } else if (!isExist) {
      setIsExist(true);
      const list = JSON.parse(videoList);
      localStorage.setItem("saveVideos", JSON.stringify([...list, data]));
    } else if (isExist) {
      const list = JSON.parse(videoList);
      const filter = list.filter(
        (item: ThumbnailDataTypes) => item.code !== data?.code
      );
      localStorage.setItem("saveVideos", JSON.stringify([...filter]));
      setIsExist(false);
    }
  }

  return (
    <button
      className="w-full bg-neutral-700 text-white rounded-xl py-1 sm:py-[6px] mt-1 hover:bg-neutral-600 transition duration-200 "
      onClick={handleAdd}
    >
      {!isExist ? "Save to videos" : "Remove from saved"}
    </button>
  );
}
