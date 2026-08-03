import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";
import { apiFetch } from "@/shared/api";
import { Board } from "@/shared/types/Board";

export function useBoard() {
    return useQuery({
        queryKey: ["board"],
        queryFn: async (): Promise<Board> => {
            const data = await apiFetch(`${API_ROUTE}/board/current`, {
                credentials: "include",
            });
            return data.board;
        },
    });
}
