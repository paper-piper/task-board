import { getSession } from "./methods/getSession";
import { setSession } from "./methods/setSession";
import { deleteSession } from "./methods/deleteSession";

export const SessionRepository = {
    getSession,
    setSession,
    deleteSession,
};
