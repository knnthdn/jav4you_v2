import React, { Suspense } from "react";
import ThumbnailContainer, {
  OnErrorThumnailTypes,
  ThumbnailTypes,
} from "./ThumbnailContainer";
import { getThumbnail } from "@/app/services/scrapeDef";
import SkeletonThumnail from "./SkeletonThumnail";

export function hasData(res: ThumbnailTypes | OnErrorThumnailTypes) {
  const hasNoRes =
    "status" in res && (res.status === 404 || res.status === 500);
  const hasError = "status" in res;

  return hasNoRes || hasError;
}

export function Trending() {
  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <FetchTrending />
    </Suspense>
  );
}

export function NewRelease() {
  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <FetchNewRelease />
    </Suspense>
  );
}

export function RecentUpdate() {
  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <FetchRecentUpdate />
    </Suspense>
  );
}

export function Uncensored() {
  return (
    <Suspense fallback={<SkeletonThumnail />}>
      <FetchUncensored />
    </Suspense>
  );
}

async function FetchTrending() {
  const path = "today-hot";
  const getTrending: ThumbnailTypes | OnErrorThumnailTypes = await getThumbnail(
    "/" + path
  );

  if (hasData(getTrending)) return;

  return (
    <ThumbnailContainer
      title="Trending"
      destination={`trending?q=${path}`}
      data={getTrending}
    />
  );
}

async function FetchNewRelease() {
  const path = "release";
  const getNewRelease: ThumbnailTypes | OnErrorThumnailTypes =
    await getThumbnail("/" + path);

  if (hasData(getNewRelease)) return;

  return (
    <ThumbnailContainer
      title="New Release"
      destination={`new_release?q=${path}`}
      data={getNewRelease}
    />
  );
}

async function FetchRecentUpdate() {
  const path = "new";
  const getRecentUpdate: ThumbnailTypes | OnErrorThumnailTypes =
    await getThumbnail("/" + path);

  if (hasData(getRecentUpdate)) return;

  return (
    <ThumbnailContainer
      title="Recent Update"
      destination={`recent_update?q=${path}`}
      data={getRecentUpdate}
    />
  );
}

async function FetchUncensored() {
  const path = "fc2";
  const getUncensored: ThumbnailTypes | OnErrorThumnailTypes =
    await getThumbnail("/" + path);

  if (hasData(getUncensored)) return;

  return (
    <ThumbnailContainer
      title="Uncensored"
      destination={`uncensored?q=${path}`}
      data={getUncensored}
    />
  );
}
