import ListBox from "@/components/ListBox";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import { Suspense } from "react";

export type GenreListTypes = {
  genre: string;
  totalVideos: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams?.page;
  const url = page && page !== "1" ? `genres?page=${page}` : "genres";

  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <ListBox title="Genres" url={url} page={page} />;
    </Suspense>
  );
}
