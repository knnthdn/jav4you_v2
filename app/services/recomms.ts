"use server";

// export const revalidate = 0;

const endpoint: string[] = [
  "frontend_timestamp=1739556506&frontend_sign=15ac481fda664e9bde6de2053cecd2713fe9f5bb",
  "frontend_timestamp=1739556574&frontend_sign=e103c05d0115c2243482d040956ff844d8b9879b",
  "frontend_timestamp=1739556614&frontend_sign=3a3c319a215d79f6fb27ae93c28b3a8f9487f7b4",
  "frontend_timestamp=1739556680&frontend_sign=28062bbf26f740329f44d601713deac4758f56fb",
  "frontend_timestamp=1739556703&frontend_sign=8f0ded1fab945f69a1f96a37e00a174f8591d6d3",
  "frontend_timestamp=1739556722&frontend_sign=6bec0fe5655fbfe881232b1ac36fed28be42e38f",
  "frontend_timestamp=1739556742&frontend_sign=689601fd6a063f9b81da71a0436f55bbfc17e9e0",
  "frontend_timestamp=1739556755&frontend_sign=b455f098afe291c2f4dd2fbf0d8cbf6c1f70f4ff",
  "frontend_timestamp=1739556773&frontend_sign=8cfaf429e9b668bad7e240a013bc59281ee137a3",
  "frontend_timestamp=1739556798&frontend_sign=35d407537e42ab464a2c7f206c6cdb671683ae61",
  "frontend_timestamp=1739556824&frontend_sign=62b2907486d0ac34dbc58b7af75343828ab1b6be",
  "frontend_timestamp=1739556918&frontend_sign=b2880cf4fdfe3276fe7562d87327ae4bc0e86290",
  "frontend_timestamp=1739557240&frontend_sign=5f36c12b8de90b8a9d6269bf87c2d7c2913d8436",
  "frontend_timestamp=1739557336&frontend_sign=14c14c9bea0c9a4b8f0011398a32e0df1ed25be2",
  "frontend_timestamp=1739557358&frontend_sign=2c662848d3a9d1ff8edc5b50d115f03229435165",
  "frontend_timestamp=1739557404&frontend_sign=73de10f0ec7e66f87d837e0ecb378c5b8e6c7f93",
  "frontend_timestamp=1739557436&frontend_sign=5de368dbb7c98743c6afdb04e4b0ca12c2aa09eb",
  "frontend_timestamp=1739557459&frontend_sign=60ba2d49d91168fc276ce8b503b7e6d8fd422ad4",
  "frontend_timestamp=1739557479&frontend_sign=ea4de52d6f2f55f0821a1a4ca36f6d1f79caacfb",
  "frontend_timestamp=1739557497&frontend_sign=14fdc7f88ed92607770b05a5521a983fbd81f468",
  "frontend_timestamp=1739557534&frontend_sign=631f7fd58350b32b0e126baf92876a0ffa367f3d",
  "frontend_timestamp=1739557555&frontend_sign=69f8292d61ee4b87172b2000012aacac5c2b3f66",
  "frontend_timestamp=1739557723&frontend_sign=52a1b465d691ddc14cf8409cd4e562c9ba7bc08c",
  "frontend_timestamp=1739557777&frontend_sign=0f37d3e620926e55f46e9ad519ed783cffc19f94",
  "frontend_timestamp=1739557832&frontend_sign=3db1eccfe3b5a50336a587101ac9fb3fb8ae2f0b",
  "frontend_timestamp=1739557852&frontend_sign=e8b80fb9fbe62790dbf6212446fa2f9d23cdc150",
  "frontend_timestamp=1739557869&frontend_sign=4bd078f3d65a9e3e59dcfa40ecef82d82c83f7d1",
  "frontend_timestamp=1739557883&frontend_sign=dc78aaf451694306b393eee587d8820e8cf0619c",
  "frontend_timestamp=1739557908&frontend_sign=022b55a28ea2b027669348df799f3479299bd533",
  "frontend_timestamp=1739557961&frontend_sign=cabb53eb154f78653bb4183e02d4923d344237f2",
  "frontend_timestamp=1739557983&frontend_sign=9c75f0cca0168ba11f709d3d39947715afd32f03",
];

export async function getRecomms(code: string, active: number) {
  try {
    let index = 0;

    if (active >= endpoint.length - 1) {
      index = 0;
    } else {
      index = active;
    }
    const res = await fetch(
      `https://client-rapi-missav.recombee.com/missav-default/batch/?${endpoint[index]}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              method: "POST",
              path: `/recomms/items/${code}/items/`,
              params: {
                count: 12,
                returnProperties: true,
                includedProperties: [
                  "title_en",
                  "duration",
                  "has_chinese_subtitle",
                  "has_english_subtitle",
                  "is_uncensored_leak",
                  "dm",
                ],
                cascadeCreate: true,
              },
            },
          ],
          distinctRecomms: true,
        }),
      }
    );

    if (res.status !== 200) {
      return { status: 404, message: "Recomms not found", newActive: index };
    }

    const [data] = await res.json();

    return {
      code: data.code,
      recomms: data.json.recomms,
      newActive: index + 1, // Always increment `index`
    };
  } catch {
    return { status: 500, message: "Internal error", newActive: active };
  }
}
