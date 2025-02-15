"use client";
import { getRecomms } from "@/app/services/recomms";
import ThumbnailContainer, { OnErrorThumnailTypes } from "./ThumbnailContainer";
import { formatDuration } from "@/lib/utils";
import { useEffect, useState } from "react";
import { RecommsSkeleton } from "./SkeletonPlayer";

type RecommsTypes = {
  code: number;
  recomms: RecommsResultTypes[] | [];
};

type RecommsResultTypes = {
  id: string;
  values: RecommsValuesTypes;
};

type RecommsValuesTypes = {
  dm: string;
  duration: string;
  has_chinese_subtitle: string;
  has_english_subtitle: boolean;
  is_uncensored_leak: boolean;
  title_en: string;
};

const initRecomms = {
  code: 0,
  recomms: [],
};

export default function Recomms({ code }: { code: string }) {
  // const recomms: RecommsTypes | OnErrorThumnailTypes = await getRecomms(
  //   code.toLowerCase()
  // );

  const [recomms, setRecomms] = useState<RecommsTypes | OnErrorThumnailTypes>(
    initRecomms
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function onGetRecomms() {
      setIsLoading(true);
      const res = await getRecomms(code.toLocaleLowerCase());
      setRecomms(res);
      setIsLoading(false);
    }
    onGetRecomms();

    return () => {
      setRecomms(initRecomms);
      setIsLoading(false);
    };
  }, []);

  const hasNoRes =
    "status" in recomms && (recomms.status === 404 || recomms.status === 500);

  const hasError = "status" in recomms;

  if (hasNoRes || hasError) return;

  if (isLoading) return <RecommsSkeleton />;

  const thumbnail = recomms.recomms.map((items: RecommsResultTypes) => {
    return {
      image: `https://fourhoi.com/${items.id}/cover-t.jpg`,
      duration: formatDuration(+items.values.duration),
      code: items.id,
      title: items.values.title_en,
      hasEnglishSub: items.values.has_english_subtitle,
      isUncensored: items.values.is_uncensored_leak,
    };
  });

  const data = {
    totalPageResults: 0,
    data: thumbnail,
    actress: [],
    extractActressInfo: [],
  };

  return (
    <div className="px-2 mt-8">
      <h2 className="text-main text-2xl mb-2">Recommendation:</h2>
      <ThumbnailContainer data={data} fromRedirect={true} isRecomms={true} />
    </div>
  );
}
