"use server";

import * as v from "valibot";

const envSchema = v.object({
	POCKETBASE_URL: v.pipe(v.string(), v.url()),
});

export const serverEnv = v.parse(envSchema, process.env);
