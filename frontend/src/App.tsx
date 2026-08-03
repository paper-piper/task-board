import { RouterProvider } from "react-router-dom";
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { router } from "./routes/router";
import { ErrorModal } from "@/components/ErrorModal";
import { NetworkError } from "@/shared/api";
import { useBoardStore } from "@/boardStore";
import { ErrorStatuses } from "@/shared/types/error";

function onQueryError(error: unknown) {
    if (error instanceof NetworkError) {
        useBoardStore.getState().setError(ErrorStatuses.ServerError);
    }
}

const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError: onQueryError }),
    mutationCache: new MutationCache({ onError: onQueryError }),
});

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ErrorModal />
        </QueryClientProvider>
    );
}
