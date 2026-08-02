import bcrypt from "bcrypt";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { UserRepository } from "@/db/repositories/UserRepository";
import { NotFoundError } from "@/http/shared/error/http_error";
import { Board } from "@/shared/types";

export async function loginService(
    email: string,
    password: string,
    board_template_id: string,
): Promise<{ board: Board; user_id: string }> {
    const user = await UserRepository.getUser(email);

    if (user === null) {
        throw new NotFoundError("User doesn't exist");
    }
    if (!(await bcrypt.compare(password, user.hashed_password))) {
        throw new NotFoundError("Incorrect password");
    }
    const board = await BoardStateRepository.getLatestBoardState(
        board_template_id,
        user.user_id,
    );
    return { board, user_id: user.user_id };
}
