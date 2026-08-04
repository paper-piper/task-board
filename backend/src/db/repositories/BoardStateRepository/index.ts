import { getLatestBoardState } from "./methods/getLatestBoardState";
import { getBoardState } from "./methods/getBoardState";
import { doesStateExist } from "./methods/doesStateExist";
import { duplicateBoardState } from "./methods/duplicateBoardState";
import { applyTaskExecution } from "./methods/applyTaskExecution";
import { reorderTask } from "./methods/reorderTask";

export const BoardStateRepository = {
    getLatestBoardState,
    getBoardState,
    doesStateExist,
    duplicateBoardState,
    applyTaskExecution,
    reorderTask,
};
