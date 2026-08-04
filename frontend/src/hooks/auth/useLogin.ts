import { API_ENDPOINTS } from "@/shared/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useAuthMutation } from "./useAuthMutation";

export function useLogin() {
    return useAuthMutation(API_ENDPOINTS.AUTH.LOGIN, ErrorStatuses.LoginError);
}
