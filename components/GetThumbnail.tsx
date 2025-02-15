import { getThumbnail } from "@/app/services/scrapeDef";
import QueryContainer from "@/components/QueryContainer";
import { searchParamsSet } from "@/lib/filterList";

export type SearchParamsTypes = {
  filters: string;
  sortby: string;
  page: string;
  q: string;
};

export default async function GetThumbnail({
  query,
  searchParams,
  title,
  endPoint,
}: {
  query: string;
  searchParams: SearchParamsTypes;
  title: string;
  endPoint: string;
}) {
  const res = await getThumbnail(
    `${endPoint}${searchParamsSet(searchParams, query)}`
  );

  return (
    <div className="mt-5 px-2">
      <QueryContainer data={res} title={title} />
    </div>
  );
}
