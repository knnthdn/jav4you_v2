"use server";

import {
  ActressInfoTypes,
  ThumbnailDataTypes,
  ThumbnailTypes,
} from "@/components/ThumbnailContainer";
import * as cheerio from "cheerio";
import { GenreListTypes } from "../(pages)/genres/page";
import { Results } from "../(pages)/actresses/page";
import { RankingTypes } from "../(pages)/actresses/ranking/page";
import { DescriptionTypes, VideoTypes } from "@/components/MainPlayer";

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
      // next: { revalidate: 43200 }, // Cache for 24 hours (86,400 seconds)
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
        if (
          image &&
          totalVideo &&
          actress &&
          !actressRes.some(
            (val) =>
              val.actress === actress &&
              val.image === image &&
              val.totalVideo === totalVideo
          )
        ) {
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

    const actressInfo = $(
      "div.flex.justify-center.items-center.space-x-4.lg\\:space-x-6.mb-6.p-6.rounded-md.bg-norddark.hero-pattern"
    );

    const extractActressInfo: ActressInfoTypes[] = [];
    if (actressInfo.length > 0) {
      const name = actressInfo.find("h4.text-nord6").text().trim();
      const info = actressInfo
        .find("div.mt-2.text-sm.xs\\:text-base.text-nord9")
        .find("p")
        .text()
        .replace(/\s+/g, " ")
        .trim();

      const image = actressInfo.find("img").attr("src");

      extractActressInfo.push({ name, info, image });
    }

    if (!data || !totalResults)
      return { status: 404, message: "No data was found" };

    const results: ThumbnailTypes = {
      totalPageResults: +totalResults[1]?.trim() || 0,
      data,
      actress: actressRes,
      extractActressInfo,
    };

    return results;
  } catch {
    return { status: 500, message: "Internal error." };
  }
}

export async function getActressInfo(actress: string) {
  try {
    const url = `https://missav.ws/en/actresses/${actress}`;

    // Fetch HTML content using native fetch
    const response = await fetch(url);

    // Check if the response is OK

    if (!response.ok) {
      return { status: 400, message: "Not Found." };
    }

    // Get the HTML text from the response
    const html = await response.text();

    const $ = cheerio.load(html);

    const parent = $(
      "div.flex.justify-center.items-center.space-x-4.lg\\:space-x-6.mb-6.p-6.rounded-md.bg-norddark.hero-pattern"
    );

    const name = parent.find("h4.text-nord6").text().trim();

    const info = parent
      .find("div.mt-2.text-sm.xs\\:text-base.text-nord9")
      .find("p")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const image = parent.find("img").attr("src");

    if (!name && !image && info) return { status: 404, message: "Not found" };

    return {
      name,
      image,
      info,
    };
  } catch {
    return { status: 500, message: "Internal server error." };
  }
}

export async function getGenre(endpoint: string) {
  try {
    const url = `https://missav.ws/en/${endpoint}`;

    // Fetch HTML content using native fetch
    const response = await fetch(url);

    // Check if the response is OK

    if (!response.ok) {
      return { status: 400, message: "Not Found." };
    }

    // Get the HTML text from the response
    const html = await response.text();

    const $ = cheerio.load(html);

    const genresList: GenreListTypes[] = [];

    $(".grid > div").each((_, element) => {
      const genre = $(element).find("a.text-nord13").text().trim();
      const totalVideos = $(element).find("p.text-nord10 a").text().trim();

      if (genre && totalVideos) {
        genresList.push({
          genre: genre,
          totalVideos: totalVideos,
        });
      }
    });

    const totalResults = $(
      "div.absolute.inset-y-0.right-0.pr-3.flex.items-center.pointer-events-none"
    )
      .last()
      .text()
      .trim()
      .split("/");

    if (genresList.length === 0) return { status: 400, message: "Not Found." };

    return {
      genresList,
      totalPageResults: +totalResults[1]?.trim() || 0,
    };
  } catch {
    return { status: 500, message: "Internal Error" };
  }
}

export async function getActressList(endpoint: string = "") {
  try {
    const url = `https://missav.ws/en/actresses${endpoint}`;

    // Fetch HTML content using native fetch
    const response = await fetch(url);

    // Check if the response is OK

    if (!response.ok) {
      return { status: 400, message: "Not Found." };
    }

    // Get the HTML text from the response
    const html = await response.text();

    const $ = cheerio.load(html);

    const results: Results[] = [];

    $("ul > li").each((_, element) => {
      const image = $(element).find("img").attr("src");
      const actress = $(element).find("h4.text-nord13").text().trim();
      const totalVideos = $(element)
        .find("p.text-nord10")
        .first()
        .text()
        .trim();
      const debut = $(element).find("p.text-nord10").last().text().trim();

      if (image && actress && totalVideos && debut) {
        results.push({
          image: image,
          actress: actress,
          totalVideos: totalVideos,
          debut: debut,
        });
      }
    });

    const totalResults = $(
      "div.absolute.inset-y-0.right-0.pr-3.flex.items-center.pointer-events-none"
    )
      .last()
      .text()
      .trim()
      .split("/");

    if (results.length === 0 && !totalResults)
      return { status: 404, message: "Not found." };

    return {
      totalPageResults: +totalResults[1]?.trim() || results.length,
      results,
    };
  } catch {
    return { status: 500, message: "Internal error" };
  }
}

export async function getActressRanking(endpoint: string) {
  try {
    const url = `https://missav.ws/en/actresses/ranking${endpoint}`;

    // Fetch HTML content using native fetch
    const response = await fetch(url);

    // Check if the response is OK

    if (!response.ok) {
      return { status: 400, message: "Not Found." };
    }

    // Get the HTML text from the response
    const html = await response.text();

    const $ = cheerio.load(html);

    const results: RankingTypes[] = [];

    $("ul > li").each((_, element) => {
      const image = $(element).find("img").attr("src");
      const actress = $(element).find("h4.text-nord13").text().trim();
      const rank = $(element).find("span").text().trim();

      if (image && actress && rank) {
        results.push({
          image: image,
          actress: actress,
          rank: rank,
        });
      }
    });
    return results;
  } catch {
    return { status: 500, message: "Internal error" };
  }
}

export async function getVideo(code: string) {
  try {
    // Step 1: Fetch the HTML content of the page
    const response = await fetch(`https://missav.ws/dm60/en/${code}`);

    if (response.status === 404) {
      return { status: 404, message: "Not Found." };
    }

    const html = await response.text();

    // Step 2: Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Step 3: Locate the script tag containing the `urls` array
    const scriptContent = $('script[type="text/javascript"]')
      .filter((_, el) => $(el).html()?.includes("urls:") ?? false) // Filter for the script containing `urls:`
      .html();

    if (!scriptContent) {
      throw new Error("Script containing `urls` array not found.");
    }

    // Step 4: Extract the `urls` array from the script content
    const urlsMatch = scriptContent.match(/urls:\s*(\[[^\]]+\])/);
    if (!urlsMatch) {
      throw new Error("`urls` array not found in the script.");
    }

    // Parse the `urls` array
    const urls = JSON.parse(urlsMatch[1].replace(/'/g, '"')); // Replace single quotes with double quotes for valid JSON
    const src = urls[0].split("/")[3];

    // Step 5: Get the title and synopsis
    const title = $("h1.text-base.lg\\:text-lg.text-nord6").text().trim();
    const synopsis = $("div.mb-1.text-secondary.break-all.line-clamp-2")
      .text()
      .trim();

    // Step 6: Initialize the description object with default values
    const description: DescriptionTypes = {
      releaseDate: "",
      code: "",
      title: "",
      actress: [],
      genre: [],
      series: "",
      maker: "",
      director: "",
      label: "",
    };

    // Step 7: Populate the description object
    $(".space-y-2 .text-secondary").each((_, element) => {
      let key = $(element).find("span").first().text().replace(":", "").trim();

      // Convert key to camelCase
      key = key
        .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^\w/, (c) => c.toLowerCase());

      // Extract all <a> tags as an array
      const links = $(element)
        .find("a")
        .map((_, el) => $(el).text().trim())
        .get();

      // If no <a> tags, get value from <time> or <span class="font-medium">
      const value =
        links.length > 0
          ? links.length === 1
            ? links[0]
            : links
          : $(element).find("time, span.font-medium").text().trim();

      // Assign values to the description object based on the key
      switch (key) {
        case "releaseDate":
          description.releaseDate = value as string;
          break;
        case "code":
          description.code = value as string;
          break;
        case "title":
          description.title = value as string;
          break;
        case "actress":
          description.actress = links;
          break;
        case "genre":
          description.genre = links;
          break;
        case "series":
          description.series = value as string;
          break;
        case "maker":
          description.maker = value as string;
          break;
        case "director":
          description.director = value as string;
          break;
        case "label":
          description.label = value as string;
          break;
        default:
          // Ignore unknown keys
          break;
      }
    });

    // Step 8: Return the data
    const data: VideoTypes = {
      poster: `https://fourhoi.com/${description.code.toLowerCase()}/cover-n.jpg`,
      title,
      src: `https://surrit.com/${src}/playlist.m3u8`,
      synopsis,
      description,
    };
    return data;
  } catch {
    return { status: 500, message: "Internal error." };
  }
}
