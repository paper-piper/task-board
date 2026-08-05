export type ErrorStatus =
    | "no error"
    | "order error"
    | "execution error"
    | "price error"
    | "login error"
    | "register error"
    | "server error"
    | "unauthorized error"
    | "not found error";
export const ErrorStatuses = {
    NoError: "no error",
    OrderError: "order error",
    ExecutionError: "execution error",
    PriceError: "price error",
    LoginError: "login error",
    RegisterError: "register error",
    ServerError: "server error",
    UnauthorizedError: "unauthorized error",
    NotFoundError: "not found error",
} as const;
