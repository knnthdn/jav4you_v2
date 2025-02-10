"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchArea() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    router.push(`search/${query}`);

    setQuery("");
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="flex gap-[2px] min-[450px]:px-6 sm:w-[600px] sm:self-center"
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
