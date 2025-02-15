import GetThumbnail, { SearchParamsTypes } from "@/components/GetThumbnail";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import { Suspense } from "react";

export default async function page({
  params,
  searchParams,
}: {
  searchParams: SearchParamsTypes;
  params: { query: string };
}) {
  return (
    <Suspense
      fallback={<SkeletonThumnail />}
      key={searchParams?.filters || searchParams?.sortby}
    >
      <GetThumbnail
        query={params.query}
        searchParams={searchParams}
        title="search"
        endPoint="/search"
      />
    </Suspense>
  );
}
