import { HttpError, NetworkError } from "@/shared/api";
import { ErrorStatus } from "@/shared/types/error";
import { useBoardStore } from "@/boardStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardKeys } from "@/hooks/board/queryKeys";

export function useTaskMutation<TVariables>(
    mutationFn: (variables: TVariables) => Promise<unknown>,
    errorStatus: ErrorStatus,
) {
    const queryClient = useQueryClient();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: boardKeys.all });
        },
        onError: (error) => {
            if (error instanceof NetworkError) return;
            const details =
                error instanceof HttpError ? error.message : undefined;
            setError(errorStatus, details);
        },
    });
}
