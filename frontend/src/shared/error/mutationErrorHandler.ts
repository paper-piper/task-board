import { HttpError, NetworkError } from "@/shared/http/api";
import { ErrorStatus } from "@/shared/error/types";
import { resolveErrorStatus, StatusOverrides } from "@/shared/error/resolveErrorStatus";

export function createMutationErrorHandler(
    setError: (status: ErrorStatus, details?: string) => void,
    errorStatus: ErrorStatus,
    overrides: StatusOverrides = {},
) {
    return (error: unknown) => {
        if (error instanceof NetworkError) return;
        if (error instanceof HttpError) {
            setError(resolveErrorStatus(errorStatus, error.status, overrides), error.message);
            return;
        }
        setError(errorStatus);
    };
}
