"use client";
import { ThumbnailDataTypes } from "@/components/ThumbnailContainer";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SaveLaterContext = createContext({
  selectDelete: [] as any[],
  setSelectDelete: (value: any) => {},
  isEdit: false,
  handleOnEdit: () => {},
  handleDelete: () => {},
});

function SaveLaterProvider({ children }: { children: ReactNode }) {
  const [selectDelete, setSelectDelete] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function handleOnEdit() {
    setIsEdit((c) => !c);
    setSelectDelete([]);
  }

  function handleDelete() {
    const videos = localStorage.getItem("saveVideos");
    if (!videos) return;
    const saved = JSON.parse(videos);
    const filtered = saved.filter(
      (val: ThumbnailDataTypes) => !selectDelete.includes(val.code)
    );
    localStorage.setItem("saveVideos", JSON.stringify([...filtered]));
    setSelectDelete([]);
    handleOnEdit();
  }

  useEffect(() => {
    setIsEdit(false);
    setSelectDelete([]);
  }, []);

  return (
    <SaveLaterContext.Provider
      value={{
        selectDelete,
        setSelectDelete,
        isEdit,
        handleOnEdit,
        handleDelete,
      }}
    >
      {children}
    </SaveLaterContext.Provider>
  );
}

function useSaveLaterProvider() {
  const context = useContext(SaveLaterContext);
  return context;
}

export { SaveLaterProvider, useSaveLaterProvider };
