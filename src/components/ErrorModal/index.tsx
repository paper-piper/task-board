import { useBoardStore } from "@/store/boardStore";
import { ErrorStatuses } from "@/shared/types/error";
import { ERROR_MESSAGES } from "./error_messages";

export function ErrorModal() {
  const setError = useBoardStore((state) => state.setError);
  const error = useBoardStore((state) => state.error);
  if (error === ErrorStatuses.NoError) return <></>;

  const { header, details } = ERROR_MESSAGES[error];

  return (
    <div
      onClick={() => setError(ErrorStatuses.NoError)}
      className="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-white/90"
    >
      <div className="z-20 flex aspect-[7/3] w-3/6 flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-10 shadow-[0_0_7px_rgba(10,10,10,0.3)]">
        <span className="text-3xl font-semibold">{header}</span>
        <span className="mb-8 mt-4 text-center">{details}</span>
        <button
          onClick={() => setError(ErrorStatuses.NoError)}
          className="h-12 w-44 rounded-md bg-[#005857] font-semibold text-white"
        >
          OK, Got It
        </button>
      </div>
    </div>
  );
}
