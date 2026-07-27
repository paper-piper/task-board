export type ErrorStatus =
  "no error" | "order error" | "execution error" | "price error";
export const ErrorStatuses = {
  NoError: "no error",
  OrderError: "order error",
  ExecutionError: "execution error",
  PriceError: "price error",
} as const;
