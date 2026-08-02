import bcrypt from "bcrypt";
import { UserRepository } from "@/db/repositories/UserRepository";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { BoardTemplateRepository } from "@/db/repositories/BoardTemplateRepository";
import { ConflictError } from "@/http/shared/error/http_error";
import { Board } from "@/shared/types";

const SALT_ROUNDS = 12;

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

    await BoardTemplateRepository.createBoardFromTemplate(
        board_template_id,
        user_id,
    );
    const board = await BoardStateRepository.getLatestBoardState(
        board_template_id,
        user_id,
    );

    return { user_id, board };
}
