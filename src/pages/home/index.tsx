import { Header } from "@/components/layout/Header";
import { TaskBoard } from "./components/board";
import { ErrorModal } from "@/components/ErrorModal";
import { useOutlet } from "react-router-dom";

export function HomePage() {
  const outlet = useOutlet();
  return (
    <>
      <Header />
      <div className="flex flex-row bg-[#f5f5f5]">
        <TaskBoard />
        {outlet && (
          <div className="h-full w-[420px] shrink-0 border-l bg-[#f5f5f5]">
            {outlet}
          </div>
        )}
      </div>
      <ErrorModal />
    </>
  );
}
