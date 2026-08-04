const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
    throw new Error(
        "Missing VITE_API_URL. Set it in frontend/.env (see .env.example).",
    );
}

export const API_BASE_URL = apiUrl;
