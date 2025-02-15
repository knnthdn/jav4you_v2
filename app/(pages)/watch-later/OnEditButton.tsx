"use client";

import { useSaveLaterProvider } from "@/context/SaveLaterProvider";

export default function OnEditButton() {
  const { isEdit, handleOnEdit } = useSaveLaterProvider();
  return (
    <div>
      <button
        onClick={handleOnEdit}
        className={`bg-white text-gray-900 w-14 px-1 rounded text-sm`}
      >
        {isEdit ? "Cancel" : "Edit"}
      </button>
    </div>
  );
}
