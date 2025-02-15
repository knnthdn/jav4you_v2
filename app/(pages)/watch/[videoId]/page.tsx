import MainPlayer from "@/components/MainPlayer";

export default async function page({
  params,
}: {
  params: { videoId: string };
}) {
  return <MainPlayer url={params.videoId} />;
}
