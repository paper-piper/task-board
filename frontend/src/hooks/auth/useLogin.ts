import { API_ROUTE } from "@/config";
import { ErrorStatuses } from "@/shared/types/error";
import { useBoardStore } from "@/store/boardStore";
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
            fetch(`${API_ROUTE}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" }, // todo: neccery?
                body: JSON.stringify(credentials),
            }).then((res) => {
                if (!res.ok) throw new Error(res.status.toString());
                return res.json();
            }),
        onSuccess: (data) => {
            queryClient.setQueryData(["board"], data.board);
            navigate("/TasksBoard");
        },
        onError: () => {
            setError(ErrorStatuses.AuthError);
        },
    });
}
