"use client";
import { useState } from "react";
import { Title } from "./RootInfo";
import WatchLaterWrapper from "./WatchLaterWrapper";

export default function WatchLaterMain() {
  const videoList = localStorage.getItem("playList");

  const [toggleDelete, setToggleDelete] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between">
        <Title>Watch later</Title>
        {videoList && (
          <button
            onClick={() => setToggleDelete(!toggleDelete)}
            className={`bg-white text-gray-900 w-14 px-1 rounded text-sm`}
          >
            {toggleDelete ? "Cancel" : "Edit"}
          </button>
        )}
      </div>

      <WatchLaterWrapper
        toggleDelete={toggleDelete}
        setToggleDelete={setToggleDelete}
      />
    </>
  );
}
