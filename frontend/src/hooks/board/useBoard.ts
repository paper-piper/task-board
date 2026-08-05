import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/shared/http/api";
import { API_ENDPOINTS } from "@/shared/http/routes";
import { Board } from "@/shared/types/Board";
import { QUERY_KEYS } from "@/shared/http/queryKeys";

export function useBoard() {
    return useQuery({
        queryKey: QUERY_KEYS.BOARD.all,
        queryFn: async (): Promise<Board> => {
            const data = await apiFetch(API_ENDPOINTS.BOARD.CURRENT, {
                credentials: "include",
            });
            return data.board;
        },
    });
}
