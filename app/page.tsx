import {
  NewRelease,
  RecentUpdate,
  Trending,
  Uncensored,
} from "@/components/HomeContents";
import SearchArea from "@/components/SearchArea";
export default async function page() {
  return (
    <div className="mt-10 px-2">
      <div className="w-full flex flex-col gap-4 ">
        <h1 className="font-semibold tracking-wide text-2xl text-center sm:text-4xl">
          <span className="text-light">Search any</span>{" "}
          <span className="text-main">JAV Videos</span>
        </h1>

        <SearchArea type="body" />
      </div>

      <div className="mt-10 flex flex-col gap-[80px] xl:gap-[100px] 2xl:mt-16">
        <NewRelease />
        <RecentUpdate />
        <Trending />
        <Uncensored />
      </div>
    </div>
  );
}
