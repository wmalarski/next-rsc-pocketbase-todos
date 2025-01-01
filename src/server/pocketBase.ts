import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import PocketBase from "pocketbase";
import { serverEnv } from "./server-env";
import { loadSessionFromCookie } from "./session";

// https://github.com/pocketbase/js-sdk/issues/69#issuecomment-1840433737
export function createServerClient(cookies?: ReadonlyRequestCookies) {
	if (typeof window !== "undefined") {
		throw new Error(
			"This method is only supposed to call from the Server environment",
		);
	}

	const client = new PocketBase(serverEnv.POCKETBASE_URL);

	loadSessionFromCookie({ client, cookies });

	return client;
}
