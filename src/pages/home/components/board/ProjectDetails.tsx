import network_diagram from "@/assets/landscape_network_diagram.png";
import { DiamondIcon } from "@/assets/icons/DiamondIcon";

export function ProjectDetails({
  budget,
  value,
}: {
  budget: number;
  value: number;
}) {
  return (
    <div className="flex items-center bg-white">
      <FieldDetails title="Budget" value={`$${budget}`}></FieldDetails>
      <FieldDetails title="Value" value={value.toString()}></FieldDetails>
      <img
        className="m-2 h-40 min-w-36 max-w-full object-contain"
        src={network_diagram}
        alt="Project network diagram"
      />
    </div>
  );
}

function FieldDetails({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <div className="mx-5 flex flex-col">
      <span className="font-normal text-gray-500">{title}</span>
      <div className="flex items-center gap-1 text-xl font-bold">
        <span>{value}</span>
        <span className="flex items-center">
          <DiamondIcon />
        </span>
      </div>
    </div>
  );
}
