import { API_ROUTES } from "@/shared/routes";
import { ErrorStatuses } from "@/shared/types/error";
import { useAuthMutation } from "./useAuthMutation";

export function useRegister() {
    return useAuthMutation(
        API_ROUTES.AUTH.REGISTER,
        ErrorStatuses.RegisterError,
    );
}
