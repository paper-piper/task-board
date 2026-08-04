import { API_ROUTES } from "@/shared/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useAuthMutation } from "./useAuthMutation";

export function useLogin() {
    return useAuthMutation(API_ROUTES.AUTH.LOGIN, ErrorStatuses.LoginError);
}
