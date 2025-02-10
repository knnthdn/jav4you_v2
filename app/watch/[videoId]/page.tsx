import MainSection from "@/components/MainSection";

export default function page({ params }: { params: { videoId: string } }) {
  const videoId = params.videoId;

  return <MainSection query={videoId} />;
}
