import { getVideo } from "@/app/services/scrapeDef";
import { OnErrorThumnailTypes } from "@/components/ThumbnailContainer";
import NoResult from "./NoResult";
import Link from "next/link";
import DownloadSection from "./DownloadSection";
import AddToWatchLaterBtn from "./AddToWatchLaterBtn";
import Recomms from "./Recomms";
import { getAdsLinkPlayer, getM3u8Proxy } from "@/app/services/services";
import Player from "./Player";

export type VideoTypes = {
  poster: string;
  title: string;
  src: string;
  synopsis: string;
  description: DescriptionTypes;
};

export type DescriptionTypes = {
  releaseDate: string;
  code: string;
  title: string;
  actress: string[];
  genre: string[];
  series: string;
  maker: string;
  director: string;
  label: string;
};

export type GetVideoTypes = VideoTypes | OnErrorThumnailTypes;

export default async function MainPlayer({ url }: { url: string }) {
  const video: GetVideoTypes = await getVideo(url);

  const hasNoRes =
    "status" in video && (video.status === 404 || video.status === 500);

  const hasError = "status" in video;

  if (hasNoRes || hasError) return <NoResult query={`Video`} />;

  const thumbnail = {
    image: `https://fourhoi.com/${video.description.code.toLowerCase()}/cover-t.jpg`,
    duration: "0",
    code: video.description.code.toLowerCase(),
    title: video.title,
    hasEnglishSub: false,
    isUncensored: false,
  };

  const adsData = await getAdsLinkPlayer();
  const proxy = await getM3u8Proxy();

  return (
    <div className="xl:mt-3 lg:max-w-screen-md lg:mx-auto xl:max-w-screen-lg ">
      <Player
        title={url}
        adsLink={adsData}
        videoSrc={video.src}
        proxy={proxy}
      />

      <div className="px-2 flex flex-col gap-2">
        <h1 className="text-[#eceff4] line-clamp-4 leading-snug text-lg">
          {video.title}
        </h1>

        <div>
          <h4 className="text-main_light">Description:</h4>

          <div className="text-[#bababc] leading-tight max-h-[90px] line-clamp-4 overflow-y-auto text-sm lg:text-base">
            {video.synopsis}
          </div>

          <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-3">
            <AddToWatchLaterBtn data={thumbnail} />
            <DownloadSection src={video.src} />
          </div>

          <div className="border border-gray-500 opacity-15 my-5"></div>

          <div className="mt-3 space-y-2 bg-[#3b4252] px-2 py-5 rounded-md">
            {video.description?.releaseDate && (
              <DescriptionList
                type="Release date"
                value={video.description.releaseDate}
              />
            )}

            {video.description?.code && (
              <DescriptionList type="Code" value={video.description.code} />
            )}

            {video.description?.title && (
              <DescriptionList type="Title" value={video.description.title} />
            )}

            {video.description?.actress.length !== 0 && (
              <div className="text-gray-200 flex gap-2">
                <span>Actress</span> :{" "}
                <div>
                  {video.description.actress.map(
                    (val: string, index: number) => {
                      return (
                        <Link
                          href={`/actress/${val}`}
                          key={index}
                          className="text-main inline-block mr-2"
                        >
                          {val},
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {video.description.genre.length !== 0 && (
              <div className="text-gray-200 flex gap-2">
                <span>Genre</span> :{" "}
                <div>
                  {video.description.genre.map((val: string, index: number) => {
                    return (
                      <Link
                        href={`/${val}?q=genres/${val}`}
                        key={index}
                        className="text-main inline-block mr-2"
                      >
                        {val},
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {video.description?.maker && (
              <div className="text-gray-200">
                <span>Maker</span> :{" "}
                <Link
                  href={`/${video.description.maker}?q=makers/${video.description.maker}`}
                  className="text-main inline-block mr-2"
                >
                  {video.description.maker}
                </Link>
              </div>
            )}

            {video.description?.series && (
              <div className="text-gray-200">
                <span>Series</span> :{" "}
                <Link
                  href={`/${video.description.series}?q=series/${video.description.series}`}
                  className="text-main inline-block mr-2"
                >
                  {video.description.series}
                </Link>
              </div>
            )}

            {video.description?.director && (
              <div className="text-gray-200">
                <span>Director</span> :{" "}
                <Link
                  href={`/${video.description.director}?q=directors/${video.description.director}`}
                  className="text-main inline-block mr-2"
                >
                  {video.description.director}
                </Link>
              </div>
            )}

            {video.description?.label && (
              <div className="text-gray-200">
                <span>Label</span> :{" "}
                <Link
                  href={`/${video.description.label}?q=labels/${video.description.label}`}
                  className="text-main inline-block mr-2"
                >
                  {video.description.label}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Recomms code={video.description.code} />
    </div>
  );
}

function DescriptionList({ value, type }: { type: string; value: string }) {
  return (
    <div className="text-gray-200">
      <span>{type}</span> : <span>{value}</span>
    </div>
  );
}
