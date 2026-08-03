import { ErrorStatuses } from "@/shared/types/error";

export const ERROR_MESSAGES = {
  [ErrorStatuses.ExecutionError]: {
    header: "Unavailable Task",
    details:
      "You cannot execute this task before completing the preceding task.",
  },
  [ErrorStatuses.OrderError]: {
    header: "Unavailable order",
    details: "You have made some invalid changes to your project plan",
  },
  [ErrorStatuses.PriceError]: {
    header: "Insufficient balance",
    details: "You don't have enough budget to aquire this task",
  },
  [ErrorStatuses.AuthError]: {
    header: "Sign in failed",
    details:
      "Check your email and password — password must be at least 6 characters — and try again.",
  },
  [ErrorStatuses.RegisterError]: {
    header: "Registration failed",
    details:
      "Check your email and password — password must be at least 6 characters and match the confirmation — and try again.",
  },
  [ErrorStatuses.ServerError]: {
    header: "Can't reach the server",
    details:
      "We couldn't connect to PMZone. Check your connection and try again shortly.",
  },
};
