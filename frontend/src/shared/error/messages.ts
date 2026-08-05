import { ErrorStatuses } from "@/shared/error/types";

const errorMessage = (header: string, details: string) => ({ header, details });

export const ERROR_MESSAGES = {
    [ErrorStatuses.ExecutionError]: errorMessage(
        "Unavailable Task",
        "You cannot execute this task before completing the preceding task.",
    ),
    [ErrorStatuses.OrderError]: errorMessage(
        "Unavailable order",
        "You have made some invalid changes to your project plan",
    ),
    [ErrorStatuses.PriceError]: errorMessage(
        "Insufficient balance",
        "You don't have enough budget to aquire this task",
    ),
    [ErrorStatuses.LoginError]: errorMessage(
        "Sign in failed",
        "We couldn't sign you in. Check your email and password and try again.",
    ),
    [ErrorStatuses.RegisterError]: errorMessage(
        "Registration failed",
        "Check your email and password — password must be at least 6 characters and match the confirmation — and try again.",
    ),
    [ErrorStatuses.ServerError]: errorMessage(
        "Can't reach the server",
        "We couldn't connect to PMZone. Check your connection and try again shortly.",
    ),
    [ErrorStatuses.UnauthorizedError]: errorMessage(
        "Sign in required",
        "Your session has expired or you're not signed in. Please sign in and try again.",
    ),
    [ErrorStatuses.NotFoundError]: errorMessage(
        "Not found",
        "We couldn't find what you were looking for. It may have been moved or deleted.",
    ),
};
