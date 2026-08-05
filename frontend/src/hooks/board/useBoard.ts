import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/api";
import { API_ENDPOINTS } from "@/shared/routes";
import { Board } from "@shared/types/Board";
import { boardKeys } from "@/hooks/board/queryKeys";

export function useBoard() {
    return useQuery({
        queryKey: boardKeys.all,
        queryFn: async (): Promise<Board> => {
            const data = await apiFetch(API_ENDPOINTS.BOARD.CURRENT, {
                credentials: "include",
            });
            return data.board;
        },
    });
}
