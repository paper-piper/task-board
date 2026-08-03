export type ErrorStatus =
  | "no error"
  | "order error"
  | "execution error"
  | "price error"
  | "auth error"
  | "register error"
  | "server error";
export const ErrorStatuses = {
  NoError: "no error",
  OrderError: "order error",
  ExecutionError: "execution error",
  PriceError: "price error",
  AuthError: "auth error",
  RegisterError: "register error",
  ServerError: "server error",
} as const;
