"use client";
import { useHeaderProvider } from "@/context/HeaderProvider";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type NavHeaderTypes = {
  // setToggleSearchbar: (val: boolean) => void;
  toggleSearchbar: boolean;
};

type SearchAreaTypes = {
  type: "body" | "header";
  // setter?: (val: boolean) => void | undefined;
};

function SearchArea({ type }: SearchAreaTypes) {
  const [query, setQuery] = useState("");
  const { onToggleSearch } = useHeaderProvider();

  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    router.push(`/search/${query}`);

    if (type === "header") {
      onToggleSearch();
    }

    setQuery("");
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className={`flex gap-[2px] min-[450px]:px-6 ${
        type === "header"
          ? "w-full sm:w-[800px]"
          : "  sm:self-center sm:w-[600px]"
      }`}
    >
      <input
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        type="text"
        placeholder="Search..."
        // name="query"
        required
        className="flex-1 bg-[#353535] py-2 outline-none px-2 text-white focus:bg-none placeholder:text-light placeholder:opacity-60 rounded-l-md min-[450px]:self-center xl:py-3"
        autoComplete="off"
      />
      <button
        className="text-white mr-2 bg-[#353535] w-12 grid place-items-center rounded-r-md md:w-16"
        type="submit"
      >
        <Search size={22} />
      </button>
    </form>
  );
}

export default SearchArea;
