import puppeteer from "puppeteer";

async function run(query: string) {
  const browser = await puppeteer.launch({
    headless: true,
    // executablePath: "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--single-process",
      "--no-zygote",
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
  );

  let recomms;

  try {
    await page.setRequestInterception(true);
    const networkUrls: string[] = [];

    page.on("request", (request) => {
      // networkUrls.push(request.url());
      // request.continue();
      if (
        request.url().includes("https://missav.ws/img/") ||
        request.url().includes("https://missav.ws/fonts")
      ) {
        request.abort();
      } else if (
        request.url().includes("https://surrit.com/") ||
        request.url().includes("https://cdnjs.cloudflare.com/") ||
        request.url().startsWith("https://client-rapi-missav.recombee.com/") ||
        request.url().startsWith("https://missav.ws/") ||
        request.url().startsWith("https://fourhoi.com/")
      ) {
        networkUrls.push(request.url());
        request.continue();
      } else {
        request.abort();
      }
    });

    page.on("response", async (response) => {
      if (
        response
          .url()
          .includes(
            "https://client-rapi-missav.recombee.com/missav-default/batch/?frontend_timestamp="
          )
      ) {
        try {
          const responseBody = await response.json(); // Ensure the response is JSON
          recomms = responseBody[0].json.recomms;
        } catch {
          // console.error("Error parsing response:", err);
        }
      }
    });

    const res = await page.goto(`https://missav.ws/dm13/en/${query}`, {
      waitUntil: "networkidle2",
    });

    if (res?.status() === 404) {
      await browser.close();
      return { status: 404, results: {} };
    }

    //get the title
    let title;
    try {
      await page.waitForSelector("h1.text-base.lg\\:text-lg.text-nord6");
      title = await page.$eval(
        "h1.text-base.lg\\:text-lg.text-nord6",
        (element) =>
          element.textContent ? element.textContent.trim() : "No Title"
      );
    } catch {
      title = "No title";
    }

    //  Extract the description
    let description;
    try {
      await page.waitForSelector("div.text-secondary");
      description = await page.$eval("div.text-secondary", (element) =>
        element.textContent ? element.textContent.trim() : "No Description"
      );
    } catch {
      description = "No description";
    }

    // get the actress name
    let actress;
    try {
      const checkTitle = await page.waitForSelector(
        "div.text-secondary a.text-nord13"
      );
      if (!checkTitle) {
        actress = "No Actress Name";
      } else {
        actress = await page.$eval(
          "div.text-secondary a.text-nord13",
          (element) =>
            element.textContent ? element.textContent.trim() : "No Actress Name"
        );
      }
    } catch {
      actress = "No Actress Name";
    }

    const poster = networkUrls.filter((items) =>
      items.startsWith("https://fourhoi.com/")
    );

    //filter and extract the video source
    const regex = /^https:\/\/surrit\.com.*\/playlist\.m3u8$/;

    const vidSrc = networkUrls.filter((str) =>
      str.startsWith("https://surrit.com/")
    );
    const matchingUrls = vidSrc.filter((url) => regex.test(url));
    // Search Result
    if (matchingUrls.length !== 0 || !vidSrc) {
      const data = {
        status: 200,
        recomms,
        results: {
          actress,
          title,
          description,
          code: query,
          src: matchingUrls[0],
          poster: poster[0],
        },
      };

      await browser.close();
      return data;
    } else {
      await browser.close();
      return { status: 404, results: {} };
    }
  } catch (error) {
    console.error(`Puppeteer Error: ${error}`);
    await browser.close();
    return { status: 500, msg: "Server Error" };
  }
}

export default run;
