import { NetworkError } from "@/shared/api";
import { ErrorStatus } from "@/shared/types/error";
import { useBoardStore } from "@/boardStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTaskMutation<TVariables>(
    mutationFn: (variables: TVariables) => Promise<unknown>,
    errorStatus: ErrorStatus,
) {
    const queryClient = useQueryClient();
    const setError = useBoardStore((state) => state.setError);

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["board"] });
        },
        onError: (error) => {
            if (error instanceof NetworkError) return;
            setError(errorStatus);
        },
    });
}
