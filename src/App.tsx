import { Header } from "./components/layout/Header";
import { TaskBoard } from "./components/layout/TaskBoard";
import { Task } from "./types";

function App() {
  return (
    <div className="h-screen">
      <Header></Header>
      <TaskBoard />
    </div>
  );
}

export default App;
