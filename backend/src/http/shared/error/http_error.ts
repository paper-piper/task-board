import { HTTP_STATUS } from "../status/httpStatus";

export class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}

export class BadRequestError extends HttpError {
    constructor(message = "Bad Request") {
        super(HTTP_STATUS.BAD_REQUEST, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message = "Not Found") {
        super(HTTP_STATUS.NOT_FOUND, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message = "Conflict") {
        super(HTTP_STATUS.CONFLICT, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = "Unauthorized") {
        super(HTTP_STATUS.UNAUTHRIZED, message);
    }
}

export class UnprocessableEntityError extends HttpError {
    constructor(message = "Unprocessable Entity") {
        super(HTTP_STATUS.UNPROCESSABLE_ENTITY_ERROR, message);
    }
}
