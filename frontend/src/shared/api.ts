export class HttpError extends Error {
    status: number;
    constructor(status: number) {
        super(`HTTP ${status}`);
        this.status = status;
    }
}

export class NetworkError extends Error {
    cause: unknown;
    constructor(cause: unknown) {
        super("Network request failed");
        this.cause = cause;
    }
}

export async function apiFetch(input: string, init?: RequestInit) {
    let res: Response;
    try {
        res = await fetch(input, init);
    } catch (err) {
        throw new NetworkError(err);
    }
    if (!res.ok) throw new HttpError(res.status);
    return res.json();
}
