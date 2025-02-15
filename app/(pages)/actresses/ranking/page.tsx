import { getActressRanking } from "@/app/services/scrapeDef";
import { OnErrorThumnailTypes } from "@/components/ThumbnailContainer";
import NoResult from "@/components/NoResult";
import Image from "next/image";
import { monthYear } from "@/lib/navsList";
import { Suspense } from "react";
import SkeletonThumnail from "@/components/SkeletonThumnail";
import Link from "next/link";
import { cleanQueryString } from "@/lib/utils";

export type RankingTypes = {
  image: string;
  actress: string;
  rank: string;
};

export default function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const urlSet =
    searchParams?.page || searchParams.sortby || searchParams?.filters
      ? `?filters=${searchParams.filters}&sortby=${searchParams.sortby}&page=${searchParams.page}`
      : "";
  const url = cleanQueryString(urlSet);

  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <RankingList url={url} />;
    </Suspense>
  );
}

async function RankingList({ url }: { url: string }) {
  const rankingList: RankingTypes[] | OnErrorThumnailTypes =
    await getActressRanking(url);

  const hasNoRes =
    "status" in rankingList &&
    (rankingList.status === 404 || rankingList.status === 500);

  const hasError = "status" in rankingList;

  if (hasNoRes || hasError) return <NoResult query={`Actress Ranking`} />;

  return (
    <div className="flex flex-col mt-5 px-2 gap-1 lg:gap-3">
      <h1 className="text-light text-2xl font-semibold px-2 sm:text-3xl sm:tracking-wider sm:font-bold text-center mb-8">
        Actress Ranking {monthYear}
      </h1>

      <div className="grid gap-y-5 px-2 py-8  bg-[#3b4252] rounded-md min-[300px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-y-8">
        {rankingList.map((items: RankingTypes, index: number) => {
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
                <div className="flex flex-col items-center">
                  <h4 className="text-[#ebcb8b] font-semibold mb-1 line-clamp-1">
                    {items.actress}
                  </h4>

                  <p
                    className={`text-[#5e81ac] font-semibold rounded-md w-fit px-3 py-[2px]  ${
                      index === 0
                        ? "bg-[#ca8a04] text-white"
                        : index === 1
                        ? "bg-[#64748b] text-white"
                        : index === 2
                        ? "bg-[#92400e] text-white"
                        : ""
                    }`}
                  >
                    {items.rank}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
