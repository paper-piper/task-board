import { createMutationErrorHandler } from "@/shared/error/resolveStatus";
import { ErrorStatus } from "@/shared/error/types";
import { useBoardStore } from "@/board_store/boardStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/http/queryKeys";
import { Board } from "@/shared/types/Board";

export function useTaskMutation<TVariables>(
    mutationFn: (variables: TVariables) => Promise<{ board: Board }>,
    errorStatus: ErrorStatus,
) {
    const queryClient = useQueryClient();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            queryClient.setQueryData(QUERY_KEYS.BOARD.all, data.board);
        },
        onError: createMutationErrorHandler(setError, errorStatus),
    });
}
