import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/router";
import { ErrorModal } from "@/components/ErrorModal";
import { queryClient } from "@/shared/http/queryClient";

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ErrorModal />
        </QueryClientProvider>
    );
}
