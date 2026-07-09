import { Header } from "./components/layout/Header";
import { TaskBoard } from "./components/layout/board";
import { ErrorModal } from "./components/ui/ErrorModal/index";
function App() {
  return (
    <>
      <Header />
      <TaskBoard />
      <ErrorModal />
    </>
  );
}

export default App;
