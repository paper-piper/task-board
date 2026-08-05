import { apiFetch, HttpError, NetworkError } from "@/shared/http/api";
import { ErrorStatus } from "@/shared/types/error";
import { AuthCredentials } from "@/shared/types/auth";
import { useBoardStore } from "@/boardStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "@/shared/http/queryKeys";

export function useAuthMutation(route: string, errorStatus: ErrorStatus) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn: (credentials: AuthCredentials) =>
            apiFetch(route, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(QUERY_KEYS.BOARD.all, data.board);
            navigate("/TasksBoard");
        },
        onError: (error) => {
            if (error instanceof NetworkError) return;
            const details =
                error instanceof HttpError ? error.message : undefined;
            setError(errorStatus, details);
        },
    });
}
