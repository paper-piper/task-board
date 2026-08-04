import bcrypt from "bcrypt";
import { BoardStateRepository } from "@/db/repositories/BoardStateRepository";
import { UserRepository } from "@/db/repositories/UserRepository";
import { NotFoundError } from "@/http/shared/error/http_error";
import { Board, BoardTemplateId, UserId } from "@/shared/types";
import { BoardTemplateRepository } from "@/db/repositories/BoardTemplateRepository";

export async function loginService(
    email: string,
    password: string,
    board_template_id: BoardTemplateId,
): Promise<{ board: Board; user_id: UserId }> {
    const user = await UserRepository.getUser(email);

    if (user === null) {
        throw new NotFoundError("User doesn't exist");
    }
    if (!(await bcrypt.compare(password, user.hashed_password))) {
        throw new NotFoundError("Incorrect password");
    }
    console.log(board_template_id);
    console.log(user.user_id);
    let board = undefined;
    if (
        await BoardTemplateRepository.doesUserHaveBoardStateForTemplate(
            board_template_id,
        )
    ) {
        board = await BoardStateRepository.getLatestBoardState(
            board_template_id,
            user.user_id,
        );
    } else {
        board = await BoardTemplateRepository.createBoardFromTemplate(
            board_template_id,
            user.user_id,
        );
    }
    if (!board) throw new Error("unable to create board");
    return { board, user_id: user.user_id };
}
