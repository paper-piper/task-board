import { TaskGrid } from "../task/TaskGrid";
import { Task } from "@/types";

function ContentDetails({title, value}: { title: string | number; value: string | number }){
    return(
        <div className="flex flex-col mx-5">
            <span className="text-gray-500 text-sm font-light">{title}</span>
            <span className="big-value | text-lg font-medium">{value}</span>
        </div>
    )
}

export function TaskBoard({tasks, budget, value}: {tasks: Task[], budget: number, value: number}){
    return(
        <div className="bg-gray-100 p-5 h-screen">
            <div className="flex flex-row p-5 justify-around items-center">
                <div className="flex flex-col mr-5">
                    <span className="font-bold text-3xl">Web Development Project</span>
                    <span className="text-gray-500">Complete the project with a budget under $12,000 and before step 40 on the board.</span>
                </div>
                <button className="h-16 w-52 rounded-md px-5 bg-teal-800 text-white">Execute Task</button>
                
                <div className="bg-white flex ml-5 h-44 w-96 items-center">
                    < ContentDetails title="Budget" value={budget}></ContentDetails>
                    < ContentDetails title="Value" value={value}></ContentDetails>
                </div>
            </div>
            <TaskGrid tasks={tasks}/>
        </div>
    )
}