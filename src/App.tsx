import { Header } from "./components/layout/Header";
import { TaskBoard } from "./components/layout/board";
import { ErrorModal } from "./components/ui/ErrorModal";
function App() {
  return (
    <div className="h-screen">
      <Header></Header>
      <TaskBoard />
      <ErrorModal />
    </div>
  );
}

export default App;
