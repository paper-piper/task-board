import dotenv from "dotenv";
import z from "zod";
import { envSchema } from "./schema";

export let env: z.infer<typeof envSchema>;

export function loadEnv() {
    dotenv.config({ quiet: true });
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        throw new Error(
            `Invalid environment variables.\n${z.prettifyError(result.error)}`,
        );
    }

    env = result.data;
}
