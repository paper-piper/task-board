import { getTaskFromPrevState } from "./methods/getTaskFromPrevState";
import { markTaskCompleted } from "./methods/markTaskCompleted";

export const TaskRepository = {
    getTaskFromPrevState,
    markTaskCompleted,
};
