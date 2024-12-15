import type { Issues } from "valibot";

export type FormReturn = {
	errors?: Record<string, { message: string }>;
	error?: string;
	success?: boolean;
};

export const valibotResultToErrors = (issues: Issues): FormReturn => {
	const entries = issues.map((issue) => {
		const key = issue.path?.map((item) => String(item.key)).join(".");
		return [key, { message: issue.message }];
	});
	return { errors: Object.fromEntries(entries) };
};

export const createRequestError = (): FormReturn => {
	return { error: "Request error" };
};
