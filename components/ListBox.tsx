import { GenreListTypes } from "@/app/(pages)/genres/page";
import PaginateSelect from "./PaginateSelect";
import Link from "next/link";
import { getGenre } from "@/app/services/scrapeDef";
import NoResult from "./NoResult";

type ListBoxTypes = {
  title: string;
  page: string;
  url: string;
};

export default async function ListBox({ title, page, url }: ListBoxTypes) {
  const getData = await getGenre(url);

  const hasNoRes =
    "status" in getData && (getData.status === 404 || getData.status === 500);

  const hasError = "status" in getData;

  if (hasNoRes || hasError) return <NoResult query={`Genre page ${page}`} />;

  return (
    <div className="flex flex-col mt-5 px-2">
      <h1 className="text-white text-2xl text-center mb-8">{title}</h1>
      <ul className="grid gap-y-5 px-2 py-8 bg-[#3b4252] rounded-md min-[300px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {getData.genresList.map((items: GenreListTypes, index: number) => {
          const genre = items.genre.toLowerCase();
          return (
            <Link
              key={index}
              href={`/${genre}?q=${title.toLowerCase()}/${genre.toLowerCase()}`}
            >
              <li className="cursor-pointer hover:text-main">
                <span className="text-main_light font-semibold tracking-wide block text-center truncate capitalize">
                  {genre}
                </span>

                <span className="text-center block text-[#5e81ac] font-semibold opacity-80">
                  {items.totalVideos}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>

      <PaginateSelect totalPage={getData.totalPageResults} />
    </div>
  );
}
