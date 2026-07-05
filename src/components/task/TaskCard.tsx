import type { ReactNode } from "react";
import { Task } from "@/types";
import { DiamondIcon } from "../ui/DiamondIcon";
function Content({
  title,
  value,
}: {
  title: string | number;
  value: string | number;
}) {
  return (
    <div className="mx-5 flex flex-col">
      <span className="text-sm font-light text-gray-500">{title}</span>
      <span className="text-lg font-medium">{value}</span>
    </div>
  );
}

function CardSection({ children }: { children: ReactNode }) {
  return <div className="flex border-t border-t-gray-400 py-1">{children}</div>;
}

function CardHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="mb-8 flex items-start">
      <span className="ml-1 mt-1 flex aspect-square w-8 items-center justify-center rounded-md border border-gray-300 font-medium text-teal-800">
        {code}
      </span>
      <span className="ml-2 flex items-center font-medium">{title}</span>
      {/* TODO Add the selector here!*/}
    </div>
  );
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="aspect-[5/3] max-w-96 rounded-lg border border-gray-300 pb-5 shadow-[0_0_7px_rgba(10,10,10,0.3)]">
      <CardHeader code={task.code} title={task.title} />
      <CardSection>
        <Content title="Cost" value={`$${task.cost}`} />
      </CardSection>
      <CardSection>
        <Content title="Value" value={task.value} />
        <DiamondIcon />
        <Content title="Steps" value={task.steps} />
      </CardSection>
    </div>
  );
}
