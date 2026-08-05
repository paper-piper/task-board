import { HTTP_STATUS } from "@/shared/http/httpStatus";
import { ErrorStatus, ErrorStatuses } from "@/shared/error/types";

export type StatusOverrides = Partial<Record<number, ErrorStatus>>;

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
