import type { ClientResponseError } from "pocketbase";
import type * as v from "valibot";

export const createRequestError = (): ActionResult => {
	return { error: "Request error", success: false };
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SuccessResult<T = any> = {
	data: T;
	success: true;
};

export type FailureResult = {
	error?: string;
	errors?: Record<string, string>;
	success: false;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ActionResult<T = any> = SuccessResult<T> | FailureResult;

export const parseValibotIssues = (
	issues: v.BaseIssue<unknown>[],
): ActionResult => {
	return {
		errors: Object.fromEntries(
			issues.map((issue) => [
				issue.path?.map((item) => item.key).join(".") || "global",
				issue.message,
			]),
		),
		success: false,
	};
};

type ErrorData = {
	[key: string]: { code: string; message: string };
};

export const parseClientError = (error: ClientResponseError): ActionResult => {
	const data: ErrorData = error.data.data;
	return {
		errors: Object.fromEntries(
			Object.entries(data).map(([key, value]) => [key, value?.message]),
		),
		error: error.data.message ?? error.message,
		success: false,
	};
};

export const delayResponse = <T>(data: T) => {
	return new Promise<T>((resolve) => setTimeout(() => resolve(data), 500));
};
