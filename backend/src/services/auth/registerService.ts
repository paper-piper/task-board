import bcrypt from "bcrypt";
import { db } from "@/db/buildDb";
import { UserRepository } from "@/db/repositories/UserRepository";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { BoardTemplateRepository } from "@/db/repositories/BoardTemplateRepository";
import { TaskRepository } from "@/db/repositories/TaskRepository";
import { ConflictError } from "@/http/shared/error/http_error";
import { Board } from "@/shared/types";

const SALT_ROUNDS = 12;
const INITIAL_BUDGET = 12000; // TODO: global somewhere
const DEFAULT_BOARD_NAME = "My Board";

export async function registerService(
    email: string,
    password: string,
    board_template_id: string,
): Promise<{ user_id: string; board: Board }> {
    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);
    const { user_id } = await UserRepository.create(email, hashed_password);

    if (user_id === null) {
        throw new ConflictError("User with that email already exists");
    }

    await BoardTemplateRepository.createBoardFromTemplate(board_template_id, user_id);
    const board = await BoardStateRepository.getLatestBoardState(
        board_template_id,
        user_id,
    );

    return { user_id, board };
}
