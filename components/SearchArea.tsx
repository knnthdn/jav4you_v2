import { query } from "@/app/action/action";
import { Search } from "lucide-react";

function SearchArea({ isLoading }: { isLoading: boolean }) {
  return (
    <form
      action={query}
      className="flex w-full bg-[#353535] items-center rounded-[10px] overflow-hidden sm:max-w-[250px] sm:self-end"
      onSubmit={() => localStorage.removeItem("code")}
    >
      <input
        type="text"
        placeholder="Search code"
        name="query"
        required
        className="flex-1 bg-[#353535] py-1 outline-none px-2 text-white focus:bg-none"
        autoComplete="off"
        disabled={isLoading}
      />
      <button className="text-white mr-2 -mt-1" type="submit">
        <Search size={22} />
      </button>
    </form>
  );
}

export default SearchArea;
