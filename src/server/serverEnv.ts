import { url, object, parse, string } from "valibot";

const envSchema = object({
	POCKETBASE_URL: string([url()]),
});

export const serverEnv = parse(envSchema, process.env);
