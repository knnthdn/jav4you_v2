import { SearchParamsTypes } from "@/components/GetThumbnail";

export const filter = [
  { name: "Single actress", query: "individual" },
  { name: "Multiple actress", query: "multiple" },
  { name: "English subtitle", query: "english-subtitle" },
];

export const sortBy = [
  { name: "Recent update", query: "published_at" },
  { name: "Saved", query: "saved" },
  { name: "Today views", query: "today_views" },
  { name: "Weekly views", query: "weekly_views" },
  { name: "Monthy views", query: "monthly_views" },
  { name: "Total views", query: "views" },
];

export const height = [
  { name: "131-135", query: "131-135" },
  { name: "136-140", query: "136-140" },
  { name: "141-145", query: "141-145" },
  { name: "146-150", query: "146-150" },
  { name: "151-155", query: "151-155" },
  { name: "156-160", query: "156-160" },
  { name: "161-170", query: "161-165" },
  { name: "166-171", query: "166-171" },
  { name: "171-175", query: "171-175" },
  { name: "176-180", query: "176-180" },
  { name: "181-185", query: "181-185" },
  { name: "186-190", query: "186-190" },
];

export const cup = [
  { name: "A cup", query: "A " },
  { name: "B cup", query: "B " },
  { name: "C cup", query: "C " },
  { name: "D cup", query: "D " },
  { name: "E cup", query: "E " },
  { name: "F cup", query: "F " },
  { name: "G cup", query: "G " },
  { name: "H cup", query: "H " },
  { name: "I cup", query: "I " },
  { name: "J cup", query: "J " },
  { name: "K cup", query: "K " },
  { name: "L cup", query: "L " },
  { name: "M cup", query: "M " },
  { name: "N cup", query: "N " },
  { name: "O cup", query: "O " },
  { name: "P cup", query: "P " },
  { name: "Q cup", query: "Q " },
];

export const age = [
  { name: "< 20", query: "0-20" },
  { name: "20 - 30", query: "20-30" },
  { name: "30 - 40", query: "30-40" },
  { name: "40 - 50", query: "40-50" },
  { name: "50 - 60", query: "50-60" },
  { name: "> 60", query: "60-99" },
];

export const debut = Array.from({ length: 26 })
  .map((_, index) => {
    return { name: `Before ${index + 2000}`, query: `${index + 2000}` };
  })
  .sort((a, b) => +b.query - +a.query);

export function searchParamsSet(
  searchParams: SearchParamsTypes,
  query: string
) {
  const url =
    searchParams?.filters && searchParams?.sortby && searchParams.page
      ? `/${query}?filters=${searchParams.filters}&sort=${searchParams.sortby}&page=${searchParams.page}`
      : searchParams?.filters && searchParams?.sortby
      ? `/${query}?filters=${searchParams.filters}&sort=${searchParams.sortby}`
      : searchParams?.filters && searchParams?.page
      ? `/${query}?filters=${searchParams.filters}&page=${searchParams.page}`
      : searchParams?.sortby && searchParams?.page
      ? `/${query}?sort=${searchParams.sortby}&page=${searchParams.page}`
      : searchParams?.page
      ? `/${query}?page=${searchParams.page}`
      : searchParams?.filters
      ? `/${query}?filters=${searchParams.filters}`
      : searchParams?.sortby
      ? `/${query}?sort=${searchParams.sortby}`
      : `/${query}`;
  return url;
}
