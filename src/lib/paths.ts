import type { UrlObject } from "url";
import { buildSearchParams } from "./searchParams";

export const paths = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  list: ({ page }: { page?: number } = {}): UrlObject => ({
    pathname: "/list",
    search: buildSearchParams({ page }).toString(),
  }),
};
