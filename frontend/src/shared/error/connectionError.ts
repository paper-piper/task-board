import { HttpError, NetworkError } from "@/shared/http/api";
import { resolveErrorStatus } from "@/shared/error/resolveErrorStatus";
import { useBoardStore } from "@/board_store/boardStore";
import { ErrorStatuses } from "@/shared/error/types";

export function setAndParseError(error: unknown) {
    if (error instanceof NetworkError) {
        useBoardStore.getState().setError(ErrorStatuses.ServerError);
        return;
    }
    if (error instanceof HttpError) {
        const status = resolveErrorStatus(ErrorStatuses.ServerError, error.status);
        useBoardStore.getState().setError(status, error.message);
    }
}
