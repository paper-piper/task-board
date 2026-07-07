import { useBoardStore } from "@/store/UseBoardStore";
import { ErrorStatuses } from "@/types";
import { useState } from "react";

export function ErrorModal() {
  const EscapeErrorModalfn = useBoardStore((state) => state.ResetError);

  const error = useBoardStore((state) => state.error);
  if (error === ErrorStatuses.NoError) return <></>;

  let header = "";
  let details = "";
  if (error === ErrorStatuses.ExecutionError) {
    header = "Unavailable Task";
    details =
      "You cannot execute this task before completing the preceding task. Or you do not have enough budget to execute this task.";
  } else {
    header = "Unavailable order";
    details = "You have made some invalid changes to your project plan";
  }

  return (
    <div
      onClick={EscapeErrorModalfn}
      className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-white/90"
    >
      <div className="z-20 flex aspect-[7/3] flex-col items-center rounded-lg border border-gray-300 bg-white p-10 shadow-[0_0_7px_rgba(10,10,10,0.3)]">
        <span className="text-3xl font-semibold">{header}</span>
        <span className="mb-6 mt-2">{details}</span>
        <button
          onClick={EscapeErrorModalfn}
          className="h-12 w-44 rounded-md bg-[#005857] font-semibold text-white"
        >
          OK, Got It
        </button>
      </div>
    </div>
  );
}
