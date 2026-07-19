import { Task } from "@/types/Task";
import { ReactNode, type ReactElement, type SVGProps } from "react";
import { DiamondIcon } from "../../ui/Icons";

function SectionDetails({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon?: ReactElement<SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-light text-gray-500">{title}</span>
      <span className="flex text-lg font-medium">
        {value}
        {icon}
      </span>
    </div>
  );
}
function CardSection({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-2 border-t border-t-gray-400 px-5 py-2">{children}</div>
  );
}

export function CardContent({
  task,
  predecessorsLabel,
}: {
  task: Task;
  predecessorsLabel: string;
}) {
  return (
    <div>
      <CardSection>
        <SectionDetails title="Cost" value={`$${task.cost}`} />
      </CardSection>
      <div className="flex flex-col">
        <CardSection>
          <div className="flex gap-16">
            <SectionDetails
              title="Value"
              value={task.value}
              icon={<DiamondIcon />}
            />
            <SectionDetails title="Steps" value={task.steps} />
          </div>
          <div className="text-sm font-light">{predecessorsLabel}</div>
        </CardSection>
      </div>
    </div>
  );
}
