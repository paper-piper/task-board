import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TasksBoard } from "./pages/home";
import { Login } from "./pages/login";
// TODO: split router to seperate file
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/TasksBoard/",
        element: <TasksBoard />,
    },
]);

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
