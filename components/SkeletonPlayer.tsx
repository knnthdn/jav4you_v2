import { MediaPlayer, MediaProvider } from "@vidstack/react";
import { Skeleton } from "./ui/skeleton";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
export default function SkeletonPlayer() {
  return (
    <div className="xl:mt-3 lg:max-w-screen-md lg:mx-auto xl:max-w-screen-lg w-full">
      <MediaPlayer
        src=""
        viewType="video"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        title="Sprite Fight"
        poster=""
      >
        <Skeleton className="bg-neutral-800 h-full w-full" />
      </MediaPlayer>

      <div className="flex flex-col gap-5  mt-5 px-2 ">
        <Skeleton className="bg-neutral-800 w-48 h-4 " />
        <div className="grid gap-y-5 min-[300px]:grid-cols-2  min-[300px]:gap-x-4 min-[400px]:gap-x-5 min-[450px]:grid-cols-3 min-[450px]:gap-x-3 min-[450px]:gap-y-6 sm:gap-x-4 ">
          {Array.from({ length: 12 }).map((_, i) => {
            return (
              <Skeleton
                className="bg-neutral-800  h-[55vw] min-[300px]:h-[28vw] min-[450px]:h-[18vw] md:max-h-[140px] xl:max-h-[180px] 2xl:max-h-[210px] rounded-md overflow-hidden mb-[2px"
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
