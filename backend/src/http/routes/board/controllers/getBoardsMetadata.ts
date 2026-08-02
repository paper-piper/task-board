import { Context } from "koa";
import { BoardTemplateRepository } from "@/db/repositories/BoardTemplateRepository";
import { HTTP_STATUS } from "@/http/shared/status/httpStatus";
import { BoardMetadata } from "@/shared/types";

export async function getBoardsMetadataController(ctx: Context) {
    const boardsMetadata: BoardMetadata[] =
        await BoardTemplateRepository.getBoardSchemas();

    ctx.status = HTTP_STATUS.OK;
    ctx.body = { boardsMetadata };
}
