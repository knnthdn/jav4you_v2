function endpoint(title: string, params: string) {
  return `/${title}?q=${params}`;
}

const date = new Date();
export const monthYear = date.toLocaleString("default", {
  month: "short",
  year: "numeric",
});

export const watchJav = [
  {
    title: "Recent update",
    destination: endpoint("recent_update", "new&sortby=published_at"),
  },
  {
    title: "New release",
    destination: endpoint("new_release", "release"),
  },
  {
    title: "Uncensored list",
    destination: endpoint("uncensored_leak", "uncensored-leak"),
  },
  {
    title: "Actress list",
    destination: "/actresses",
  },
  {
    title: `Actress Ranking ${monthYear}`,
    destination: "/actresses/ranking",
  },
  {
    title: "Genre",
    destination: "/genres",
  },
  {
    title: "Maker",
    destination: "/makers",
  },
  {
    title: "VR",
    destination: endpoint("v_r", "genres/VR"),
  },
  {
    title: "Most viewed today",
    destination: endpoint("most_viewed_today", "today-hot"),
  },
  {
    title: "Most viewed by week",
    destination: endpoint("most_viwed_by_week", "weekly-hot"),
  },
  {
    title: "Most viewed by month",
    destination: endpoint("most_viewed_by_month", "monthly-hot"),
  },
];

export const amatuer = [
  {
    title: "SIRO",
    destination: endpoint("amateur_siro", "siro"),
  },
  {
    title: "LUXU",
    destination: endpoint("amateur_luxu", "luxu"),
  },
  {
    title: "GANA",
    destination: endpoint("amateur_gana", "gana"),
  },
  {
    title: "PRESTIGE PREMIUM",
    destination: endpoint("amateur_prestige_premium", "maan"),
  },
  {
    title: "S-CUTE",
    destination: endpoint("amateur_s-cute", "scute"),
  },
  {
    title: "ARA",
    destination: endpoint("amateur_ara", "ara"),
  },
];

export const uncensored = [
  {
    title: "Uncensored leak",
    destination: endpoint("unsensored_leak", "uncensored-leak"),
  },
  {
    title: "FC2",
    destination: endpoint("fc2", "fc2"),
  },
  {
    title: "HEYZO",
    destination: endpoint("heyzo", "heyzo"),
  },
  {
    title: "Tokyo Hot",
    destination: endpoint("tokyohot", "tokyohot"),
  },
  {
    title: "1pondo",
    destination: endpoint("1pondo", "1pondo"),
  },
  {
    title: "Carribbeancom",
    destination: endpoint("caribbeancom", "caribbeancom"),
  },
  {
    title: "Carribbeancompr",
    destination: endpoint("caribbeancompr", "caribbeancompr"),
  },
  {
    title: "10musume",
    destination: endpoint("10musume", "10musume"),
  },
  {
    title: "pacopacomama",
    destination: endpoint("pacopacomama", "pacopacomama"),
  },
  {
    title: "Gachinco",
    destination: endpoint("gachinco", "gachinco"),
  },
  {
    title: "XXX-AV",
    destination: endpoint("xxx_av", "xxxav"),
  },
  {
    title: "Married Slash",
    destination: endpoint("married_slash", "marriedslash"),
  },
  {
    title: "Naughty 4610",
    destination: endpoint("naughty4610", "naughty4610"),
  },
  {
    title: "Naughty 0930",
    destination: endpoint("naughty0930", "naughty0930"),
  },
];

export const asiaAv = [
  {
    title: "Madou",
    destination: endpoint("madou", "madou"),
  },
  {
    title: "TWAV",
    destination: endpoint("twav", "twav"),
  },
  {
    title: "Furuke",
    destination: endpoint("furuke", "furuke"),
  },
  {
    title: "Korean live",
    destination: endpoint("korean_live", "klive"),
  },
  {
    title: "Chinese live",
    destination: endpoint("chinese_live", "clive"),
  },
];
