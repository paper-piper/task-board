import { Task } from "@/types";
import "./TaskCard.css"

function ContentDetails({title, value}: { title: string | number; value: string | number }){
    return(
        <div className="flex flex-col mx-5">
            <span className="text-gray-500 text-sm font-light">{title}</span>
            <span className="big-value | text-lg font-medium">{value}</span>
        </div>
    )
}
export function TaskCard({task}: {task: Task}){
    return(
    <div className="shadow-[0_0_7px_rgba(10,10,10,0.3)] pb-5 rounded-lg aspect-[5/3] border border-gray-300 max-w-96">
        <div className="card-section | mb-8 flex">
            <span className="font-medium mt-1 ml-1 w-8 aspect-square flex justify-center items-center text-teal-800 rounded-md border border-gray-300">{task.code}</span>
            <span className="ml-2 font-medium items-center flex">{task.title}</span>
            {/* TODO Add the selector here!*/}
        </div>
        <div className="card-section | flex py-1">
            <ContentDetails title="Cost" value={`$${task.cost}`} />
        </div>
        <div className="card-section | flex gap-10 py-1">
            <ContentDetails title="Value" value={task.value} />
            {/* TODO: add diamond*/}
            <ContentDetails title="Steps" value={task.steps} />
        </div>
    </div>
    )
}