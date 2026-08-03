import { API_ROUTE } from "@/config";
import { apiFetch, NetworkError } from "@/shared/api";
import { ErrorStatuses } from "@/shared/types/error";
import { useBoardStore } from "@/boardStore";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn: (credentials: {
            email: string;
            password: string;
            board_template_id: string;
        }) =>
            apiFetch(`${API_ROUTE}/auth/login`, {
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
            setError(ErrorStatuses.AuthError);
        },
    });
}
