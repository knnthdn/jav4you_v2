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

function url(token: string) {
  return `https://api.scraperapi.com/?api_key=${token}&url=https://api.v02.savethevideo.com/tasks`;
}

async function rotate() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/toggle-active`, {
    method: "POST",
  });
}

export async function rotateAdsPlyr() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rotate-ads-plyr`, {
    method: "POST",
    cache: "no-store",
  });
}
export async function rotateAdsDownload() {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rotate-ads-download`, {
    method: "POST",
    cache: "no-store",
  });
}

export async function getInfo(token: string, params: infoParams) {
  try {
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
  } catch {
    try {
      const res = await fetch(url("f10d8e0938436bba2c51e1f416f3fb16"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      rotate();
      const data = await res.json();

      return data;
    } catch {
      return { code: 502 };
    }
  }
}

export async function getInfoResult(token: string, id: string) {
  try {
    const res = await fetch(`${url(token)}/${id}`);
    const data = await res.json();
    rotate();
    return data;
  } catch {
    try {
      const res = await fetch(
        `${url("f10d8e0938436bba2c51e1f416f3fb16")}/${id}`
      );
      const data = await res.json();
      rotate();
      return data;
    } catch {
      return { code: 502 };
    }
  }
}

export async function parseData(
  token: string,
  { url, format, type }: parseDataType
) {
  try {
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
  } catch {
    try {
      const res = await fetch(
        `https://api.scraperapi.com/?api_key=f10d8e0938436bba2c51e1f416f3fb16&url=https://api.v02.savethevideo.com/tasks`,
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
    } catch {
      return { code: 502 };
    }
  }
}

export async function getParsedData(token: string, id: string) {
  try {
    const res = await fetch(`${url(token)}/${id}`);
    const data = await res.json();
    rotate();

    return data;
  } catch {
    try {
      const res = await fetch(
        `${url("f10d8e0938436bba2c51e1f416f3fb16")}/${id}`
      );
      const data = await res.json();
      rotate();
      return data;
    } catch {
      return { code: 502 };
    }
  }
}

//get adsLink
export async function getAdsLinkPlayer() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-adsLink-plyr`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();

    return data.activeLink;
  } catch {
    return null;
  }
}

export async function getAdsLinkDownload() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-adsLink-download`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();

    return data.activeLink;
  } catch {
    return null;
  }
}

export async function getActiveToken() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-active`
    );
    const data = await res.json();

    return data.activeToken;
  } catch {
    return null;
  }
}

export async function getM3u8Proxy() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-M3u8-Proxy`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    return data.proxy.proxy;
  } catch {
    return "https://goodproxy.anoto083.workers.dev";
  }
}
