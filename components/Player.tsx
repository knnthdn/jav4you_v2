"use client";
import { MediaPlayer, MediaProvider } from "@vidstack/react";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { useEffect, useState } from "react";
import { rotateAdsPlyr } from "@/app/services/services";

export default function Player({
  title,
  videoSrc,
  adsLink,
  proxy,
}: {
  title: string;
  videoSrc: string;
  adsLink: string;
  proxy: string;
}) {
  const [videoAds, setVideoAds] = useState<string>("");

  useEffect(() => {
    setVideoAds(adsLink);
  }, [videoSrc, title, adsLink]);

  async function injectAdsPlyr() {
    if (!videoAds) return;
    window.open(videoAds, "_blank");
    setVideoAds("");
    rotateAdsPlyr();
  }

  return (
    <div onClick={injectAdsPlyr}>
      <MediaPlayer
        storage="storage-key"
        src={`${proxy}fetch?url=${videoSrc}`}
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        title={title}
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}
