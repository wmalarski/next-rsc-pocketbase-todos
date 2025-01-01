import type { cookies } from "next/headers";
import type Client from "pocketbase";

const PB_COOKIE_NAME = "pb_auth";

type ReadonlyRequestCookies = Awaited<ReturnType<typeof cookies>>;

type LoadSessionFromCookieArgs = {
	cookies?: ReadonlyRequestCookies;
	client: Client;
};

export function loadSessionFromCookie({
	client,
	cookies,
}: LoadSessionFromCookieArgs) {
	if (cookies) {
		const authCookie = cookies.get(PB_COOKIE_NAME);

		if (authCookie) {
			client.authStore.loadFromCookie(authCookie.value);
		}
	}
}

type ExportSessionToCookieArgs = {
	cookies?: ReadonlyRequestCookies;
	client: Client;
};

export function exportSessionToCookie({
	cookies,
	client,
}: ExportSessionToCookieArgs) {
	cookies?.set(PB_COOKIE_NAME, client.authStore.exportToCookie());
}
