import { createBrowserRouter } from "react-router-dom";
import { TasksBoard } from "./pages/task_board";
import { Login } from "./pages/login";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/TasksBoard/",
        element: <TasksBoard />,
    },
]);
