import { API_ENDPOINTS } from "@/shared/http/routes";
import { ErrorStatuses } from "@/shared/error/types";
import { useAuthMutation } from "./useAuthMutation";

export function useLogin() {
    return useAuthMutation(API_ENDPOINTS.AUTH.LOGIN, ErrorStatuses.LoginError);
}
