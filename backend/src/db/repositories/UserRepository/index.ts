import { create } from "./methods/create";
import { deleteUser } from "./methods/deleteUser";
import { getUser } from "./methods/getUser";
import { doesExist } from "./methods/doesExist";

export const UserRepository = {
    create,
    deleteUser,
    getUser,
    doesExist,
};
