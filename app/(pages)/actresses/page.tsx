import { OnErrorThumnailTypes } from "@/components/ThumbnailContainer";
import { getActressList } from "../../services/scrapeDef";
import NoResult from "@/components/NoResult";
import PaginateSelect from "@/components/PaginateSelect";
import Image from "next/image";
import { Filter } from "@/components/QueryContainer";
import { age, cup, debut, height } from "@/lib/filterList";
import Link from "next/link";
import { Suspense } from "react";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import { cleanQueryString } from "@/lib/utils";

type ActressListTypes =
  | {
      totalPageResults: number;
      results: Results[];
    }
  | OnErrorThumnailTypes;

export type Results = {
  image: string;
  actress: string;
  totalVideos: string;
  debut: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const urlSet =
    searchParams?.height ||
    searchParams?.cup ||
    searchParams?.age ||
    searchParams?.debut ||
    searchParams?.page
      ? `?height=${searchParams?.height}&cup=${searchParams?.cup}&age=${searchParams?.age}&debut=${searchParams?.debut}&page=${searchParams?.page}`
      : "";

  const url = cleanQueryString(urlSet);

  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <ActressList url={url} />;
    </Suspense>
  );
}

async function ActressList({ url }: { url: string }) {
  const getActress: ActressListTypes = await getActressList(url);

  const hasNoRes =
    "status" in getActress &&
    (getActress.status === 404 || getActress.status === 500);

  const hasError = "status" in getActress;

  if (hasNoRes || hasError) return <NoResult query={`Actress`} />;
  const { results, totalPageResults } = getActress;

  return (
    <div className="flex flex-col mt-5 px-2 gap-1 lg:gap-3">
      <h1 className="text-light text-2xl font-semibold px-2 sm:text-3xl sm:tracking-wider sm:font-bold text-center mb-8">
        Actress
      </h1>
      <div className="grid gap-y-2 min-[500px]:grid-cols-2 min-[500px]:justify-items-center sm:gap-y-4 lg:grid-cols-4">
        <Filter queryName="height" data={height} />
        <Filter queryName="cup" data={cup} />
        <Filter queryName="age" data={age} />
        <Filter queryName="debut" data={debut} />
      </div>

      <div className="grid gap-y-5 px-2 py-8  bg-[#3b4252] rounded-md min-[300px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-y-8">
        {results.length === 0 && (
          <p className="text-[#ebcb8b] font-semibold mb-2 text-center w-full col-span-full">
            No results
          </p>
        )}
        {results.map((items: Results, index: number) => {
          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <Link href={`/actress/${items.actress}`}>
                <div className="relative size-20 overflow-hidden lg:size-24 ">
                  <Image
                    src={items?.image || "/no_image.png"}
                    alt={`${items.actress} cover`}
                    fill
                    className="absolute rounded-full object-cover"
                    sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
                  />
                </div>
              </Link>

              <Link href={`/actress/${items.actress}`}>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[#ebcb8b] font-semibold line-clamp-1">
                    {items.actress}
                  </h4>
                  <p className="text-[#5e81ac] font-semibold">
                    {items.totalVideos}
                  </p>
                  <p className="text-[#5e81ac] font-semibold">{items.debut}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      {totalPageResults > 1 && <PaginateSelect totalPage={totalPageResults} />}
    </div>
  );
}
