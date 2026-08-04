export class HttpError extends Error {
    status: number;
    constructor(status: number, message?: string) {
        super(message || `HTTP ${status}`);
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

async function readErrorMessage(res: Response): Promise<string | undefined> {
    try {
        const body = await res.json();
        const error = body?.error;
        return typeof error === "string" ? error : undefined;
    } catch {
        return undefined;
    }
}

export async function apiFetch(input: string, init?: RequestInit) {
    let res: Response;
    try {
        res = await fetch(input, init);
    } catch (err) {
        throw new NetworkError(err);
    }
    if (!res.ok) throw new HttpError(res.status, await readErrorMessage(res));
    return res.json();
}
