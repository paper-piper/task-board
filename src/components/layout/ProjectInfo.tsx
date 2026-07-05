import network_diagram from "@/assets/landscape_network_diagram.png";

function ContentDetails({ title, value }: { title: string; value: number }) {
  return (
    <div className="mx-5 flex flex-col">
      <span className="text-sm font-light text-gray-500">{title}</span>
      <span className="big-value | text-lg font-medium">{value}</span>
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
    <div className="ml-5 flex h-44 w-96 items-center bg-white">
      <ContentDetails title="Budget" value={budget}></ContentDetails>
      <ContentDetails title="Value" value={value}></ContentDetails>
      <img
        className="w-20"
        src={network_diagram}
        alt="Project network diagram"
      />
    </div>
  );
}
