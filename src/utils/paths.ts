import { buildSearchParams } from "./search-params";

export const paths = {
	home: "/",
	signIn: "/sign-in",
	signUp: "/sign-up",
	list: ({ page }: { page?: number } = {}) =>
		`/list?${buildSearchParams({ page })}`,
};
