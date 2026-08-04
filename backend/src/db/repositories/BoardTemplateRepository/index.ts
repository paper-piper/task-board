import { createBoardFromTemplate } from "./methods/createBoardFromTemplate";
import { getBoardSchemas } from "./methods/getBoardSchemas";
import { doesUserHaveBoardStateForTemplate } from "./methods/doesUserHaveBoardStateForTemplate";

export const BoardTemplateRepository = {
    createBoardFromTemplate,
    getBoardSchemas,
    doesUserHaveBoardStateForTemplate,
};
