import ListBox from "@/components/ListBox";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import { Suspense } from "react";

export default function page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = searchParams?.page;
  const url = page && page !== "1" ? `makers?page=${page}` : "makers";

  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <ListBox title="Makers" url={url} page={page} />;
    </Suspense>
  );
}
