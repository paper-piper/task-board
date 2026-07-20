import { Link, useParams } from "react-router-dom";
import { sampleTasksDetails } from "@/mock_data/sampleTasksDetails";
import { sampleTasks } from "@/mock_data/sampleTasks";

export function CardPage() {
  const params = useParams();
  const cardId = params.cardId;
  const card = sampleTasks.find((task) => task.id === cardId);
  const cardDetails = sampleTasksDetails.find((task) => task.id === cardId);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-4xl font-semibold"> {card?.title}</h1>
      <p> {cardDetails?.description}</p>
      <Link to={"/"}>Go back</Link>
    </div>
  );
}
