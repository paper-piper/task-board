import { HttpError, NetworkError } from "@/shared/http/api";
import { HTTP_STATUS } from "@/shared/http/httpStatus";
import { ErrorStatus, ErrorStatuses } from "@/shared/error/types";

type StatusOverrides = Partial<Record<number, ErrorStatus>>;

export function resolveErrorStatus(
    fallback: ErrorStatus,
    status: number,
    overrides: StatusOverrides = {},
): ErrorStatus {
    if (status in overrides) return overrides[status]!;
    if (status === HTTP_STATUS.UNAUTHORIZED) return ErrorStatuses.UnauthorizedError;
    if (status === HTTP_STATUS.NOT_FOUND) return ErrorStatuses.NotFoundError;
    if (status >= HTTP_STATUS.INTERNAL_SERVER_ERROR) return ErrorStatuses.ServerError;
    return fallback;
}

export function createMutationErrorHandler(
    setError: (status: ErrorStatus, details?: string) => void,
    errorStatus: ErrorStatus,
    resolveStatus: (
        fallback: ErrorStatus,
        status: number,
    ) => ErrorStatus = resolveErrorStatus,
) {
    return (error: unknown) => {
        if (error instanceof NetworkError) return;
        if (error instanceof HttpError) {
            setError(resolveStatus(errorStatus, error.status), error.message);
            return;
        }
        setError(errorStatus);
    };
}
