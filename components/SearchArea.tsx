"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchArea() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    router.push(`../?q=${(query as string).toLowerCase()}`);

    setQuery("");
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="flex w-full bg-[#353535] items-center rounded-[10px] overflow-hidden sm:max-w-[250px] sm:self-end"
      // onSubmit={() => localStorage.removeItem("code")}
    >
      <input
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        type="text"
        placeholder="Search code ex: MIAA-230"
        // name="query"
        required
        className="flex-1 bg-[#353535] py-1 outline-none px-2 text-white focus:bg-none"
        autoComplete="off"
      />
      <button className="text-white mr-2 -mt-1" type="submit">
        <Search size={22} />
      </button>
    </form>
  );
}

export default SearchArea;
