import bcrypt from "bcrypt";
import { db } from "@/db/buildDb";
import { UserRepository } from "@/db/repositories/UserRepository";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { BoardTemplateRepository } from "@/db/repositories/BoardTemplateRepository";
import { ConflictError } from "@/http/shared/error/http_error";
import { Board, BoardTemplateId, UserId } from "@/shared/types";

const SALT_ROUNDS = 12;

export async function registerService(
    email: string,
    password: string,
    board_template_id: BoardTemplateId,
): Promise<{ user_id: UserId; board: Board }> {
    const hashed_password = await bcrypt.hash(password, SALT_ROUNDS);

    // Creating the user and seeding their board share a transaction, so a
    // failure while building the board cannot leave a user behind that can
    // neither register again nor log in.
    return db.transaction().execute(async (trx) => {
        const { user_id } = await UserRepository.create(
            email,
            hashed_password,
            trx,
        );

        if (user_id === null) {
            throw new ConflictError("User with that email already exists");
        }

        await BoardTemplateRepository.createBoardFromTemplate(
            board_template_id,
            user_id,
            trx,
        );
        const board = await BoardStateRepository.getLatestBoardState(
            board_template_id,
            user_id,
            trx,
        );

        return { user_id, board };
    });
}
