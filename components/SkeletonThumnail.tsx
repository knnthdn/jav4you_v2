import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonThumnail() {
  return (
    <div className="flex flex-col gap-5  mt-5 px-2 ">
      <Skeleton className="bg-neutral-800 w-48 h-4 " />
      <div className="grid gap-y-5 min-[300px]:grid-cols-2  min-[300px]:gap-x-4 min-[400px]:gap-x-5 min-[450px]:grid-cols-3 min-[450px]:gap-x-3 min-[450px]:gap-y-6 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-7 2xl:gap-x-6 2xl:gap-y-8">
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
  );
}
