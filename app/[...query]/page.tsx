import { redirect } from "next/navigation";
import { getThumbnail } from "../services/scrapeDef";
import QueryContainer from "@/components/QueryContainer";
import {
  OnErrorThumnailTypes,
  ThumbnailTypes,
} from "@/components/ThumbnailContainer";
import { Suspense } from "react";
import SkeletonThumnail from "@/components/SkeletonThumnail";

type SearchParamsTypes = {
  q: string;
  filters: string;
  sortby: string;
};

export default async function page({
  params,
  searchParams,
}: {
  searchParams: SearchParamsTypes;
  params: { query: string[] };
}) {
  const query = searchParams.q;
  const title = params.query[0];

  if (!query) redirect("/");

  return (
    <Suspense
      fallback={<SkeletonThumnail />}
      key={searchParams?.filters || searchParams?.sortby}
    >
      <GetQueried query={query} title={title} searchParams={searchParams} />;
    </Suspense>
  );
}

async function GetQueried({
  query,
  title,
  searchParams,
}: {
  query: string;
  title: string;
  searchParams: SearchParamsTypes;
}) {
  if (!query) redirect("/");

  const url =
    searchParams?.filters && searchParams?.sortby
      ? `/${query}?filters=${searchParams.filters}&sort=${searchParams.sortby}`
      : searchParams?.filters
      ? `/${query}?filters=${searchParams.filters}`
      : searchParams?.sortby
      ? `/${query}?sort=${searchParams.sortby}`
      : `/${query}`;

  const thumbnails: ThumbnailTypes | OnErrorThumnailTypes = await getThumbnail(
    url
  );

  return (
    <div className="mt-5 px-2">
      <QueryContainer data={thumbnails} title={title} />;
    </div>
  );
}
