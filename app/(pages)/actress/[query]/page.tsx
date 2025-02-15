import GetThumbnail, { SearchParamsTypes } from "@/components/GetThumbnail";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import { Suspense } from "react";

export default function page({
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
        title="actress"
        endPoint="/actresses"
      />
    </Suspense>
  );
}
