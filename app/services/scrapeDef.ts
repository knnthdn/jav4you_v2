"use server";

import {
  ThumbnailDataTypes,
  ThumbnailTypes,
} from "@/components/ThumbnailContainer";
import * as cheerio from "cheerio";

export type ActressTypes = {
  image: string;
  actress: string;
  totalVideo: string;
};

export async function getThumbnail(params: string) {
  try {
    // URL to fetch
    const url = `https://missav.ws/dm291/en${params}`;

    // Fetch HTML content using native fetch
    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours (86,400 seconds)
    });

    // Check if the response is OK
    if (!response.ok)
      return { status: 404, message: "Failed to fetch Trending" };

    // Get the HTML text from the response
    const html = await response.text();

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Array to store the extracted data
    const data: ThumbnailDataTypes[] = [];
    const actressRes: ActressTypes[] = [];

    // Iterate over each thumbnail container
    $(".thumbnail").each((_, element) => {
      const $element = $(element);

      // Extract image src (use data-src instead of src)
      const image = $element.find("img").attr("data-src");

      // Extract duration (from the span inside the second <a> tag)
      //   const duration = $element.find("a span").text().trim();

      let hasEnglishSub: boolean = false;
      let isUncensored: boolean = false;
      let duration: string = "";

      $(element)
        .find("a span")
        .each((_, el) => {
          if ($(el).text().trim() === "English subtitle") {
            hasEnglishSub = true;
          }

          if ($(el).text().trim() === "Uncensored") {
            isUncensored = true;
          }

          if (
            $(el).text().trim() !== "Uncensored" ||
            $(el).text().trim() !== "English subtitle"
          ) {
            duration = $(el).text().trim();
          }
        });

      // Extract destination href (from the first <a> tag)
      const href = $element.find("a").attr("href");
      const destination = href ? href.split("/") : [];

      const title = $element
        .find("a.text-secondary.group-hover\\:text-primary")
        .text()
        .trim();

      //Extract actress

      // Select all li items within the specified ul
      $(
        "ul.mx-auto.grid.grid-cols-2.gap-4.gap-y-8.sm\\:grid-cols-3.md\\:gap-6.lg\\:gap-8.lg\\:gap-y-12.xl\\:grid-cols-6.text-center li"
      ).each((_, element) => {
        const $li = $(element);

        // Extract the image URL
        const image = $li.find("img").attr("src");

        // Extract the total number of videos
        const totalVideo = $li.find("p.text-nord10").text().trim();

        // Extract the actress name
        const actress = $li.find("h4.text-nord13").text().trim();

        // Check if all required data exists
        if (image && totalVideo && actress) {
          // Store the extracted data in an object
          actressRes.push({
            image,
            totalVideo,
            actress,
          });
        }
      });

      // Push the extracted data into the array
      if (image && duration && destination) {
        data.push({
          image: image,
          duration: duration,
          code: destination[destination.length - 1],
          title,
          hasEnglishSub,
          isUncensored,
        });
      }
    });

    if (data.length === 0)
      return { status: 404, message: "No data was found." };

    const totalResults = $(
      "div.absolute.inset-y-0.right-0.pr-3.flex.items-center.pointer-events-none"
    )
      .last()
      .text()
      .trim()
      .split("/");

    if (!data || !totalResults)
      return { status: 404, message: "No data was found" };

    const results: ThumbnailTypes = {
      totalResults: +totalResults[1]?.trim() || data.length,
      data,
      actress: actressRes,
    };

    return results;
  } catch (e) {
    return { status: 500, message: "Internal error." };
  }
}
