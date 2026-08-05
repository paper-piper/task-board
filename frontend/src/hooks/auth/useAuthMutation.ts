import { apiFetch } from "@/shared/http/api";
import { HTTP_STATUS } from "@/shared/http/httpStatus";
import { createMutationErrorHandler } from "@/shared/error/mutationErrorHandler";
import { ErrorStatus } from "@/shared/error/types";
import { AuthCredentials } from "@/shared/types/auth";
import { useBoardStore } from "@/board_store/boardStore";
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
        onError: createMutationErrorHandler(setError, errorStatus, {
            [HTTP_STATUS.UNAUTHORIZED]: errorStatus,
        }),
    });
}
