import { getThumbnail } from "@/app/services/scrapeDef";
import { hasData } from "@/components/HomeContents";
import QueryContainer from "@/components/QueryContainer";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import { Suspense } from "react";

type SearchParamsTypes = {
  filters: string;
  sortby: string;
};

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
        key={searchParams?.filters || searchParams?.sortby}
      />
      ;
    </Suspense>
  );
}

async function GetThumbnail({
  query,
  searchParams,
}: {
  query: string;
  searchParams: SearchParamsTypes;
}) {
  const url =
    searchParams?.filters && searchParams?.sortby
      ? `/${query}?filters=${searchParams.filters}&sort=${searchParams.sortby}`
      : searchParams?.filters
      ? `/${query}?filters=${searchParams.filters}`
      : searchParams?.sortby
      ? `/${query}?sort=${searchParams.sortby}`
      : `/${query}`;

  const res = await getThumbnail(`/search${url}`);

  return (
    <div className="mt-5 px-2">
      <QueryContainer data={res} title="search" />;
    </div>
  );
}
