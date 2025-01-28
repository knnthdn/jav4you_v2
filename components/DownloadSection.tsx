"use client";

import { useEffect, useReducer } from "react";

import {
  getActiveToken,
  getAdsLink,
  getInfo,
  getParsedData,
  parseData,
} from "@/app/services/services";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


interface InfoData {
  state: string;
  result?: Result[] | Result;
  code?: number;
  message?: string;
  id: string;
}

type Result = {
  link?: string;
  size?: string;
  duration_string: string;
  formats: {
    format: string;
    format_id: string;
    resolution: string;
    ext: string;
  }[];
  progress?: {
    percent: string;
  };
};

type DlSectionTypes = {
  src: string;
};

type State = {
  dlLink: string;
  error: string;
  infoData: InfoData | null;
  infoLoading: boolean;
  quality: string;
  downloadData: InfoData | null;
  onProgressParsing: InfoData | null;
  downloadLoading: boolean;
  token: string;
  adsDlBut: string;
};

type Action =
  | { type: "SET_DL_LINK"; payload: string }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_INFO_DATA"; payload: InfoData | null }
  | { type: "SET_INFO_LOADING"; payload: boolean }
  | { type: "SET_QUALITY"; payload: string }
  | { type: "SET_DOWNLOAD_DATA"; payload: InfoData | null }
  | { type: "SET_ON_PROGRESS_PARSING"; payload: InfoData | null }
  | { type: "SET_DOWNLOAD_LOADING"; payload: boolean }
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_ADS_DL_BUT"; payload: string };

const initialState: State = {
  dlLink: "",
  error: "",
  infoData: null,
  infoLoading: false,
  quality: "",
  downloadData: null,
  onProgressParsing: null,
  downloadLoading: false,
  token: "",
  adsDlBut: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DL_LINK":
      return { ...state, dlLink: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_INFO_DATA":
      return { ...state, infoData: action.payload };
    case "SET_INFO_LOADING":
      return { ...state, infoLoading: action.payload };
    case "SET_QUALITY":
      return { ...state, quality: action.payload };
    case "SET_DOWNLOAD_DATA":
      return { ...state, downloadData: action.payload };
    case "SET_ON_PROGRESS_PARSING":
      return { ...state, onProgressParsing: action.payload };
    case "SET_DOWNLOAD_LOADING":
      return { ...state, downloadLoading: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_ADS_DL_BUT":
      return { ...state, adsDlBut: action.payload };
    default:
      return state;
  }
}

export default function DownloadSection({ src }: DlSectionTypes) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch token and set ads download link
  useEffect(() => {
    async function getToken() {
      try {
        if (!src) return;

        const activeToken = await getActiveToken();
        dispatch({ type: "SET_TOKEN", payload: activeToken });

        if (!activeToken)
          dispatch({
            type: "SET_TOKEN",
            payload: "0514fda1b708019e3d90faaeaac67e92",
          });
      } catch {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching token, Please reload and try again",
        });
      }
    }

    async function getAdsLinkBut() {
      const res = await getAdsLink();
      dispatch({ type: "SET_ADS_DL_BUT", payload: res });
    }

    getToken();
    getAdsLinkBut();

    return () => {
      dispatch({ type: "SET_ERROR", payload: "" });
      dispatch({ type: "SET_DL_LINK", payload: "" });
      dispatch({ type: "SET_DOWNLOAD_DATA", payload: null });
      dispatch({ type: "SET_ON_PROGRESS_PARSING", payload: null });
      dispatch({ type: "SET_QUALITY", payload: "" });
      dispatch({ type: "SET_INFO_LOADING", payload: false });
      dispatch({ type: "SET_DOWNLOAD_LOADING", payload: false });
      dispatch({ type: "SET_ADS_DL_BUT", payload: "" });
    };
  }, [src]);

  //Fetch info data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!state.token)
          throw Error("Cannot fetch Token, Please reload and try again.");

        dispatch({ type: "SET_INFO_LOADING", payload: true });
        const response = await getInfo(state.token, {
          type: "info",
          url: state.dlLink,
        });
        if (response.code === 429)
          throw Error("Too many Request!, try again later");

        dispatch({ type: "SET_INFO_DATA", payload: response });

        if (response.state === "completed") {
          dispatch({ type: "SET_INFO_LOADING", payload: false });
        } else {
          setTimeout(fetchData, 3000);
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: "SET_ERROR", payload: err.message });
        } else {
          dispatch({ type: "SET_ERROR", payload: "An unknown error occurred" });
        }
        dispatch({ type: "SET_INFO_LOADING", payload: false });
      }
    };

    if (state.dlLink) {
      fetchData();
    }
  }, [state.dlLink, state.token]);

  useEffect(() => {
    const parseData = async () => {
      if (!state.downloadData?.id) return;

      if (state.downloadData?.state === "completed")
        return dispatch({
          type: "SET_ON_PROGRESS_PARSING",
          payload: state.downloadData,
        });

      try {
        if (!state.token)
          throw Error("Cannot fetch Token, Please reload and try again.");

        dispatch({ type: "SET_DOWNLOAD_LOADING", payload: true });
        if (!state.downloadData?.id) {
          throw new Error("Download data is not available");
        }
        const response = await getParsedData(
          state.token,
          state.downloadData.id
        );
        if (response.code === 9006)
          throw Error(
            "Video not found!, Refresh your browser or select another quality"
          );

        if (response.code === 429)
          throw Error("Too many Request!, try again later");

        dispatch({ type: "SET_ON_PROGRESS_PARSING", payload: response });

        if (
          response.state === "progress" ||
          response.state === "pending" ||
          response.state === "active"
        ) {
          setTimeout(parseData, 8000);
        } else {
          dispatch({ type: "SET_DOWNLOAD_LOADING", payload: false });
        }
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: "SET_ERROR", payload: err.message });
        } else {
          dispatch({ type: "SET_ERROR", payload: "An unknown error occurred" });
        }
        dispatch({ type: "SET_DOWNLOAD_LOADING", payload: false });
      }
    };

    parseData();
  }, [state.downloadData, state.quality, src, state.token]);

  // useEffect(() => {
  //   async function getAdsLinkBut() {
  //     const adsLink = await getAdsLink();
  //     dispatch({ type: "SET_ADS_DL_BUT", payload: adsLink });
  //   }

  //   getAdsLinkBut();
  // }, [state.dlLink]);

  async function onDownload() {
    try {
      if (!state.token)
        throw Error("Cannot fetch Token, Please reload and try again.");

      if (!state.quality) throw Error("Please select a Quality!");
      dispatch({ type: "SET_DOWNLOAD_LOADING", payload: true });
      const res = await parseData(state.token, {
        url: state.dlLink,
        type: "download",
        format: state.quality,
      });
      if (res.code === 429) throw Error("Too many Request!, try again later");

      dispatch({ type: "SET_DOWNLOAD_DATA", payload: res });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      } else {
        dispatch({ type: "SET_ERROR", payload: "An unknown error occurred" });
      }
      dispatch({ type: "SET_DOWNLOAD_LOADING", payload: false });
    }
  }

  async function handleDownloadBut() {
    dispatch({ type: "SET_DL_LINK", payload: src });
    // const adsLink = await getAdsLink();
    // dispatch({ type: "SET_ADS_DL_BUT", payload: adsLink });

    if (!state.adsDlBut) return;
    window.open(state.adsDlBut, "_blank");
    dispatch({ type: "SET_ADS_DL_BUT", payload: "" });
  }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <button
          className="w-full bg-[#E9E9E9] text-black rounded-xl py-1 mt-1 hover:bg-[#a7a7a7] transition duration-200"
          onClick={handleDownloadBut}
          disabled={state.infoLoading}
        >
          {state.infoData?.state !== "completed" &&
            !state.infoLoading &&
            "Download"}
          {state.infoLoading && "Please wait..."}
          {state.infoData?.state === "completed" && "Start"}
        </button>
      </DialogTrigger>

      {state.infoData?.state === "completed" && (
        <DialogContent className="rounded-sm min-h-[230px] w-full min-[300px]:w-[95vw] min-[400px]:w-[90vw] min-[500px]:w-[85vw] sm:max-w-[420px] ">
          <DialogHeader className="self-start border-b border-[#4e4d4d] w-full">
            <DialogTitle className="text-left font-medium">
              Download
            </DialogTitle>
            <DialogDescription className="text-left">
              Duration:{" "}
              {Array.isArray(state.infoData.result) && (
                <>{state.infoData.result.at(0)?.duration_string}</>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            {state.error && (
              <p className="text-red-500 w-full">{state.error}</p>
            )}
            <div className="flex items-center gap-1 flex-wrap">
              <span>Quality:</span>

              <Select
                disabled={
                  state.onProgressParsing?.state &&
                  state.onProgressParsing.state === "progress" &&
                  state.downloadLoading
                    ? true
                    : false
                }
                onValueChange={(data) => {
                  dispatch({ type: "SET_QUALITY", payload: data });
                  dispatch({ type: "SET_ERROR", payload: "" });
                  dispatch({ type: "SET_DOWNLOAD_DATA", payload: null });
                  dispatch({ type: "SET_ON_PROGRESS_PARSING", payload: null });
                  dispatch({ type: "SET_DOWNLOAD_LOADING", payload: false });
                }}
                value={state.quality}
              >
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a Quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.isArray(state.infoData?.result)
                      ? state.infoData.result[0].formats.map(
                          (
                            items: {
                              format_id: string;
                              ext: string;
                              resolution: string;
                            },
                            index: number
                          ) => {
                            return (
                              <SelectItem value={items.format_id} key={index}>
                                {items.resolution} - {""}
                                {items.format_id}p - {""}
                                {items.ext.toUpperCase()}
                              </SelectItem>
                            );
                          }
                        )
                      : state.infoData?.result?.formats.map(
                          (
                            items: {
                              format_id: string;
                              ext: string;
                              resolution: string;
                            },
                            index: number
                          ) => {
                            return (
                              <SelectItem value={items.format_id} key={index}>
                                {items.resolution} - {""}
                                {items.format_id}p - {""}
                                {items.ext.toUpperCase()}
                              </SelectItem>
                            );
                          }
                        )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {state.onProgressParsing?.state !== "completed" && (
              <button
                onClick={onDownload}
                disabled={!!state.error}
                className="bg-[#1e1e1e] w-full text-white py-1 rounded-xl font-thin mt-3"
              >
                {state.downloadLoading && "Parsing Please wait..."}
                {!state.downloadLoading && "Parse to download"}
              </button>
            )}

            {state.onProgressParsing?.state === "progress" &&
              state.onProgressParsing?.result && (
                <p className="text-sm leading-tight">
                  Parsing won&apos;t use your data. Once done, save it to your
                  device—avoid refreshing during parsing:{" "}
                  {Array.isArray(state.onProgressParsing.result)
                    ? state.onProgressParsing.result[0]?.progress?.percent
                    : state.onProgressParsing.result?.progress?.percent}
                </p>
              )}

            {state.onProgressParsing?.state === "completed" && (
              <a
                onClick={async () => {
                  await fetch(`/api/increment-adsLink-request`);
                }}
                href={
                  Array.isArray(state.onProgressParsing.result)
                    ? state.onProgressParsing.result[0]?.link
                    : state.onProgressParsing.result?.link
                }
                target="_blank"
                className="bg-[#1e1e1e] w-full text-white py-1 rounded-xl font-thin text-center mt-3"
              >
                Download{" "}
                {Array.isArray(state.onProgressParsing.result)
                  ? state.onProgressParsing.result[0]?.size
                  : state.onProgressParsing.result?.size}
              </a>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
