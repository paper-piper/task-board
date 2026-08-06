import z from "zod";

export const envSchema = z.object({
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive(),
    POSTGRES_DB: z.string().min(1),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    SERVER_HOST: z.string().min(1),
    SERVER_PORT: z.coerce.number().int().positive(),
    SESSION_SECRET: z.string().min(32),
    CLIENT_ORIGIN: z.url(),
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
});
