import { useBoardStore } from "@/board_store/boardStore";
import { ErrorStatuses } from "@/shared/error/types";
import { ERROR_MESSAGES } from "@/shared/error/messages";

export function ErrorModal() {
    const setError = useBoardStore((state) => state.setError);
    const error = useBoardStore((state) => state.error);
    const errorDetails = useBoardStore((state) => state.errorDetails);

    if (error === ErrorStatuses.NoError) return <></>;

    const { header, details } = ERROR_MESSAGES[error];

    return (
        <div
            onClick={() => setError(ErrorStatuses.NoError)}
            className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/90"
        >
            <div className="z-50 flex aspect-[7/3] w-3/6 flex-col items-center justify-center rounded-lg border border-gray-300 bg-white p-10 shadow-[0_0_7px_rgba(10,10,10,0.3)]">
                <span className="font-display text-3xl font-semibold">
                    {header}
                </span>
                <span className="mb-8 mt-4 text-center">
                    {errorDetails || details}
                </span>
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
