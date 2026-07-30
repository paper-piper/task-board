import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TasksBoard } from "./pages/home";
import { Login } from "./pages/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/TasksBoard/:id", //todo: is it path or actual login
        element: <TasksBoard />,
    },
]);
export function App() {
    return <RouterProvider router={router} />;
}
