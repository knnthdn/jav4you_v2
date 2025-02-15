import MainPlayer from "@/components/MainPlayer";
import SkeletonPlayer from "@/components/SkeletonPlayer";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: { videoId: string };
}) {
  return (
    <Suspense fallback={<SkeletonPlayer />}>
      <MainPlayer url={params.videoId} />;
    </Suspense>
  );
}
