import network_diagram from "@/assets/landscape_network_diagram.png";
import { DiamondIcon } from "../ui/DiamondIcon";

function ContentDetails({
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
      <span className="text-sm font-normal text-gray-500">{title}</span>
      <span className="big-value | flex items-center gap-1 text-lg font-bold">
        {value}
        {icon}
      </span>
    </div>
  );
}

export function ProjectInfo({
  budget,
  value,
}: {
  budget: number;
  value: number;
}) {
  return (
    <div className="ml-5 flex items-center bg-white">
      <ContentDetails title="Budget" value={`$${budget}`}></ContentDetails>
      <ContentDetails
        title="Value"
        value={value.toString()}
        icon={<DiamondIcon />}
      ></ContentDetails>
      <img
        className="m-5 h-40 object-cover"
        src={network_diagram}
        alt="Project network diagram"
      />
    </div>
  );
}
