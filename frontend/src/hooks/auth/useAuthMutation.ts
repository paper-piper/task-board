import { API_ROUTE } from "@/config";
import { apiFetch, NetworkError } from "@/shared/api";
import { ErrorStatus } from "@/shared/types/error";
import { AuthCredentials } from "@/shared/types/auth";
import { useBoardStore } from "@/boardStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAuthMutation(route: string, errorStatus: ErrorStatus) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn: (credentials: AuthCredentials) =>
            apiFetch(`${API_ROUTE}${route}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(["board"], data.board);
            navigate("/TasksBoard");
        },
        onError: (error) => {
            if (error instanceof NetworkError) return;
            setError(errorStatus);
        },
    });
}
