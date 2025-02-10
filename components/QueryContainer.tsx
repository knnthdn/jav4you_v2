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

type QueryContainerTypes = {
  data: ThumbnailTypes | OnErrorThumnailTypes;
  title: string;
};

export default function QueryContainer({ data, title }: QueryContainerTypes) {
  const params = useParams();
  if (hasData(data)) return;
  return (
    <div className="">
      <h1 className="text-light text-2xl font-semibold px-2 sm:text-3xl sm:tracking-wider sm:font-bold text-center mb-8">
        {title !== "search" ? (
          <>
            Watch <span className="capitalize">{title.replace(/_/g, " ")}</span>{" "}
            <span className="text-main">AV Videos</span>
          </>
        ) : (
          <span>
            Search results of{" "}
            {typeof params.query === "string" &&
              decodeURIComponent(params.query)}
          </span>
        )}
      </h1>

      <div className="flex flex-col gap-2">
        <div className="flex gap-1 justify-between flex-wrap gap-y-2 mb-4 md:justify-end md:gap-4">
          <Filter data={filter} queryName="filters" />
          <Filter data={sortBy} queryName="sortby" />
        </div>

        <ThumbnailContainer data={data} fromRedirect={true} />
      </div>
    </div>
  );
}

function Filter({
  data,
  queryName,
}: {
  data: { name: string; query: string }[];
  queryName: string;
}) {
  const initialActive = queryName === "sortby" ? "Release date" : "All";
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
  }, [query]);

  useEffect(() => {
    if (activeFilter === "string") return;
    onSelectFilter();
  }, [activeFilter]);

  function onFilterSetToAll() {
    const searchParams = new URLSearchParams(window.location.search); // Mutable copy

    searchParams.delete(queryName); // Remove only the 'filter' query param

    const newQueryString = searchParams.toString();
    router.replace(newQueryString ? `${pathname}?${newQueryString}` : pathname);
  }

  function onSelectFilter() {
    if (typeof activeFilter === "string") return;
    const searchParams = new URLSearchParams(window.location.search); // Mutable copy
    searchParams.delete(queryName);
    searchParams.append(queryName, activeFilter.query); // Remove only the 'filter' query param

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
          {queryName === "sortby" ? "Sort by" : "Filter"}:
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
        className="w-fit p-1 px-0 flex flex-col gap-1"
      >
        <button
          className={`text-gray-900 text-start px-1 ${
            typeof activeFilter === "string" && "bg-light"
          }`}
          onClick={() => {
            setActiveFilter(initialActive);
            setPopOverState(false);
            onFilterSetToAll();
          }}
        >
          {initialActive}
        </button>
        {data.map((items) => {
          return (
            <button
              className={`text-gray-900 text-start px-1 ${
                typeof activeFilter !== "string" &&
                activeFilter.name === items.name &&
                "bg-light"
              }`}
              key={items.query}
              onClick={() => {
                setActiveFilter(items);
                setPopOverState(false);
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
