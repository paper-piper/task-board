import bcrypt from "bcrypt";
import { db } from "@/db/buildDb";
import { UserRepository } from "@/db/repositories/UserRepository";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { TaskRepository } from "@/db/repositories/TaskRepository";
import { ConflictError } from "@/http/shared/error/http_error";
import { Board } from "@/shared/types";

const SALT_ROUNDS = 12;
const INITIAL_BUDGET = 12000; // TODO: global somewhere
const DEFAULT_BOARD_NAME = "My Board";

export async function registerService(
    email: string,
    password: string,
): Promise<{ user_id: string; board: Board }> {
    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
    const { user_id } = await UserRepository.create(email, hashed_password);

    if (user_id === null) {
        throw new ConflictError("User with that email already exists");
    }

    const board = await db.transaction().execute(async (trx) => {
        const { board_id } = await BoardRepository.createBoard(
            user_id,
            DEFAULT_BOARD_NAME,
            INITIAL_BUDGET,
            trx,
        );
        await TaskRepository.populateBoard(board_id, trx);
        return await BoardRepository.getBoard(board_id, trx);
    });

    return { user_id, board };
}
