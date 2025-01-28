"use server";

type infoParams = {
  type: string;
  url: string;
};

export type parseDataType = {
  type: string;
  url: string;
  format: string;
};

// const url =
//   "https://api.scraperapi.com/?api_key=0514fda1b708019e3d90faaeaac67e92&url=https://api.v02.savethevideo.com/tasks";

function url(token: string) {
  return `https://api.scraperapi.com/?api_key=${token}&url=https://api.v02.savethevideo.com/tasks`;
}

async function rotate() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/toggle-active`, {
    method: "POST",
  });
}

export async function getInfo(token: string, params: infoParams) {
  const res = await fetch(url(token), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  rotate();
  const data = await res.json();

  return data;
}

export async function getInfoResult(token: string, id: string) {
  const res = await fetch(`${url(token)}/${id}`);
  const data = await res.json();
  rotate();
  return data;
}

export async function parseData(
  token: string,
  { url, format, type }: parseDataType
) {
  const res = await fetch(
    `https://api.scraperapi.com/?api_key=${token}&url=https://api.v02.savethevideo.com/tasks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, format, type }),
    }
  );

  const data = await res.json();
  rotate();

  return data;
}

export async function getParsedData(token: string, id: string) {
  const res = await fetch(`${url(token)}/${id}`);
  const data = await res.json();
  rotate();

  return data;
}

//get adsLink
export async function getAdsLink() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-adsLink`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.activeLink;
}

export async function getActiveToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-active`);
  const data = await res.json();

  return data.activeToken;
}
