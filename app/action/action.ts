"use server";

import run from "../services/puppeteerFunc";
import { redirect } from "next/navigation";

function isSameQuery(query: string) {
  const searchParams = new URLSearchParams({ q: query as string });
  const searchQuery = searchParams.toString();

  return searchQuery === query;
}

export async function searchCode(query: string) {
  if (!query) throw Error("Query cant be empty!");

  if (isSameQuery(query)) return;

  const res = await run(query as string);

  return res;
}

export async function query(formdata: FormData) {
  const query = formdata.get("query");

  // if (!query) throw Error("Query can't be empty!");
  if (!query) return;

  if (isSameQuery(query as string)) return;

  redirect(`../?q=${(query as string).toLowerCase()}`);
}
