"use client";

import { hasData } from "./HomeContents";

import ThumbnailContainer, {
  OnErrorThumnailTypes,
  ThumbnailTypes,
} from "./ThumbnailContainer";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { useEffect, useState } from "react";

import { filter, sortBy } from "@/lib/filterList";

import { ChevronDown, ChevronUp } from "lucide-react";

import { ActressTypes } from "@/app/services/scrapeDef";
import Image from "next/image";
import Link from "next/link";
import NoResult from "./NoResult";
import PaginateSelect from "./PaginateSelect";

type QueryContainerTypes = {
  data: ThumbnailTypes | OnErrorThumnailTypes;
  title: string;
};

export default function QueryContainer({ data, title }: QueryContainerTypes) {
  const params = useParams();
  if (hasData(data))
    return (
      <NoResult
        query={
          typeof params.query === "string"
            ? decodeURIComponent(params.query)
            : ""
        }
      />
    );

  return (
    <div>
      {/* Section Main Header  */}
      <h1 className="text-light text-2xl font-semibold px-2 sm:text-3xl sm:tracking-wider sm:font-bold text-center mb-8">
        {title === "search" ? (
          <span>
            Search results of{" "}
            {typeof params.query === "string" &&
              decodeURIComponent(params.query)}
          </span>
        ) : title === "actress" ? (
          <p>
            Watch{" "}
            <span className="capitalize">
              {typeof params.query === "string" &&
                decodeURIComponent(params.query)}
              &apos;s Videos
            </span>
          </p>
        ) : (
          <>
            Watch{" "}
            <span className="capitalize">
              {decodeURIComponent(title.replace(/_/g, " "))}
            </span>{" "}
            <span className="text-main">AV Videos</span>
          </>
        )}
      </h1>

      {/* Data Actress Info, shown If extractActressInfo Exist   */}
      {data.extractActressInfo.length > 0 && (
        <div className="bg-[#242933] p-6 rounded mb-8 flex items-center gap-3 justify-center md:py-7 md:gap-5">
          <div className="relative size-20 overflow-hidden lg:size-28 ">
            <Image
              src={data.extractActressInfo[0].image || "/no_image.png"}
              alt={`${data.extractActressInfo[0].name} cover`}
              fill
              className="absolute rounded-full object-cover"
              sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
            />
          </div>

          <div>
            <h4 className="text-[#eceff4] font-semibold tracking-wide lg:text-xl ">
              {data.extractActressInfo[0].name}
            </h4>
            <p className="text-[#81a1c1]">{data.extractActressInfo[0].info}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* Filter And Sort Button  */}
        <div className="flex gap-1 justify-between flex-wrap gap-y-2 mb-4 md:justify-end md:gap-8">
          <Filter data={filter} queryName="filters" />
          <Filter data={sortBy} queryName="sortby" />
        </div>

        {/* shown Actress List in query When actress.length > 0  */}
        {data.actress.length !== 0 && (
          <ul className="grid justify-center gap-y-5 min-[300px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mb-2">
            {data.actress.map((items: ActressTypes, index: number) => {
              return (
                <li
                  key={index}
                  className="w-full flex flex-col items-center gap-3"
                >
                  <Link href={`/actress/${items.actress}`}>
                    <div className="relative size-20 lg:size-24 overflow-hidden">
                      <Image
                        src={items.image}
                        alt={`${items.actress} cover`}
                        fill
                        className="absolute rounded-full object-cover"
                        sizes="(max-width: 300px) 100vw, (max-width: 450px) 50vw, 800px"
                      />
                    </div>
                  </Link>

                  <Link
                    href={`/actress/${items.actress}`}
                    className="text-center"
                  >
                    <h4 className="text-[#ebcb8b] text-wrap line-clamp-1">
                      {items.actress}
                    </h4>
                    <p className="text-[#5e81ac]">{items.totalVideo}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Thumbnails List || Videos   */}
        <ThumbnailContainer data={data} fromRedirect={true} />

        {data.totalPageResults > 1 && (
          <>
            <PaginateSelect totalPage={data.totalPageResults} />
          </>
        )}
      </div>
    </div>
  );
}

export function Filter({
  data,
  queryName,
}: {
  data: { name: string; query: string }[];
  queryName: string;
}) {
  const initialActive =
    queryName === "sortby"
      ? "Release date"
      : queryName === "height"
      ? "Select height"
      : queryName === "cup"
      ? "Select cup size"
      : queryName === "age"
      ? "Select age"
      : queryName === "debut"
      ? "Select debut year"
      : "All";

  const [activeFilter, setActiveFilter] = useState<
    string | { name: string; query: string }
  >(initialActive);
  const [isOpenPopOver, setPopOverState] = useState<boolean>(false);
  const q = useSearchParams();
  const query = q?.get(queryName);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!query) return;
    const findEqual = data.filter((val) => val.query === query)[0];
    setActiveFilter(findEqual);
  }, [query, data]);

  useEffect(() => {
    function onSelectFilter() {
      if (typeof activeFilter === "string") return;
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(queryName);
      searchParams.delete("page");
      searchParams.append(queryName, activeFilter.query); // Remove only the 'filter' query param

      const newQueryString = searchParams.toString();
      router.replace(
        newQueryString ? `${pathname}?${newQueryString}` : pathname
      );
    }

    if (activeFilter === "string") return;
    onSelectFilter();
  }, [activeFilter]);

  function onFilterSetToAll() {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(queryName); // Remove only the 'filter' query param

    const newQueryString = searchParams.toString();
    router.replace(newQueryString ? `${pathname}?${newQueryString}` : pathname);
  }

  return (
    <Popover open={isOpenPopOver} onOpenChange={setPopOverState}>
      <PopoverTrigger
        onClick={() => setPopOverState((c) => !c)}
        className={`flex  gap-[2px] font-semibold tracking-wider ${
          isOpenPopOver ? "text-main" : "text-white"
        }`}
      >
        <span className="mr-1 text-nowrap">
          {queryName === "sortby"
            ? "Sort by"
            : queryName === "height"
            ? "Height"
            : queryName === "cup"
            ? "Cup Size"
            : queryName === "age"
            ? "Age"
            : queryName === "debut"
            ? "Debut"
            : "Filter"}
          :
        </span>

        <span className="">
          {typeof activeFilter === "string"
            ? activeFilter
            : query && query === activeFilter.query && activeFilter.name}
        </span>
        <span className="ml-1 block">
          {isOpenPopOver ? <ChevronUp /> : <ChevronDown />}
        </span>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-30 p-1 flex flex-col gap-2 bg-[#e5e9f0] z-[999999] border-0 px-0 max-h-96 overflow-y-auto"
        // className=" w-fit p-1 bg-[#e5e9f0] z-[999999] px-0 border-0 min-w-[225px] flex flex-col gap-1"
      >
        <button
          className={`text-gray-900 text-start px-3 ${
            typeof activeFilter === "string" && "bg-light"
          }`}
          onClick={() => {
            const searchParams = new URLSearchParams(window.location.search);
            setActiveFilter(initialActive);
            setPopOverState(false);
            onFilterSetToAll();
            searchParams.delete("page");
          }}
        >
          {initialActive}
        </button>
        {data.map((items) => {
          return (
            <button
              className={`text-gray-900 text-start px-3 ${
                typeof activeFilter !== "string" &&
                activeFilter.name === items.name &&
                "bg-light"
              }`}
              key={items.query}
              onClick={() => {
                const searchParams = new URLSearchParams(
                  window.location.search
                );
                setActiveFilter(items);
                setPopOverState(false);
                searchParams.delete("");
              }}
            >
              {items.name}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
