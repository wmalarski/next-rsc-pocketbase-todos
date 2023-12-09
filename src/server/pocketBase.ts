"use server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import PocketBase from "pocketbase";
import { serverEnv } from "./serverEnv";

export const PB_COOKIE_NAME = "pb_auth";

// https://github.com/pocketbase/js-sdk/issues/69#issuecomment-1840433737
export function createServerClient(cookieStore?: ReadonlyRequestCookies) {
  if (typeof window !== "undefined") {
    throw new Error(
      "This method is only supposed to call from the Server environment",
    );
  }

  const client = new PocketBase(serverEnv.POCKETBASE_URL);

  if (cookieStore) {
    const authCookie = cookieStore.get(PB_COOKIE_NAME);

    if (authCookie) {
      client.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
    }
  }

  return client;
}
