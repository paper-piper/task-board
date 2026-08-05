import { API_ENDPOINTS } from "@/shared/http/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useAuthMutation } from "./useAuthMutation";

export function useRegister() {
    return useAuthMutation(
        API_ENDPOINTS.AUTH.REGISTER,
        ErrorStatuses.RegisterError,
    );
}
