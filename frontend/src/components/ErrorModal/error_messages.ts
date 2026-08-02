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
};
