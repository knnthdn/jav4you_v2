"use client";
import React, { useEffect, useState } from "react";
import { ResultTypes, SearchResponseTypes } from "./MainSection";

export default function AddToWatchLaterBtn({
  data,
}: {
  data: SearchResponseTypes;
}) {
  const videoList = localStorage.getItem("playList");
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    if (videoList) {
      const list = JSON.parse(videoList);
      setIsExist(
        list.some(
          (val: { results: ResultTypes }) =>
            val.results.code === data?.results?.code
        )
      );
    }
  }, [data, videoList, isExist]);

  function handleAdd() {
    // localStorage.setItem("playList", JSON.stringify([data?.results]));
    if (!videoList) {
      localStorage.setItem("playList", JSON.stringify([data]));
      setIsExist(true);
    } else if (!isExist) {
      setIsExist(true);
      const list = JSON.parse(videoList);
      localStorage.setItem("playList", JSON.stringify([...list, data]));
    } else if (isExist) {
      const list = JSON.parse(videoList);
      const filter = list.filter(
        (item: { results: ResultTypes }) =>
          item.results.code !== data?.results?.code
      );
      localStorage.setItem("playList", JSON.stringify([...filter]));
      setIsExist(false);
    }
  }

  return (
    <button
      className="w-full bg-neutral-700 text-white rounded-xl py-1 mt-1 hover:bg-neutral-600 transition duration-200 "
      onClick={handleAdd}
    >
      {!isExist ? "Save to watch later" : "Remove to watch later"}
    </button>
  );
}
