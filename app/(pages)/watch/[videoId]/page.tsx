import MainPlayer from "@/components/MainPlayer";
// import SkeletonPlayer from "@/components/SkeletonPlayer";
// import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: { videoId: string };
}) {
  return <MainPlayer url={params.videoId} />;
}
