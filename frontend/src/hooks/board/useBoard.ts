import { useQuery } from "@tanstack/react-query";
import { API_ROUTE } from "@/config";
import { apiFetch } from "@/shared/api";
import { API_ROUTES } from "@/shared/routes";
import { Board } from "@/shared/types/Board";

export function useBoard() {
    return useQuery({
        queryKey: ["board"],
        queryFn: async (): Promise<Board> => {
            const data = await apiFetch(`${API_ROUTE}${API_ROUTES.BOARD.CURRENT}`, {
                credentials: "include",
            });
            return data.board;
        },
    });
}
