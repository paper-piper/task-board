import { Context } from "koa";
import { BoardRepository } from "@/db/repositories/BoardRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { BoardMetadata } from "@/shared/types";

export async function getBoardsMetadataController(ctx: Context) {
    const boardsMetadata: BoardMetadata[] =
        await BoardRepository.getBoardSchemas();

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { boardsMetadata };
}
