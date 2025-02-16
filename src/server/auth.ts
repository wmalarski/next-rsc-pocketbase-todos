"use server";
import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import * as v from "valibot";
import { createServerClient } from "./pocketbase";
import { exportSessionToCookie } from "./session";
import {
	type ActionResult,
	createRequestError,
	parseClientError,
	parseValibotIssues,
} from "./utils";

const USERS_COLLECTION = "users";

export async function signInWithPasswordAction(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const result = await v.safeParseAsync(
		v.object({ email: v.pipe(v.string(), v.email()), password: v.string() }),
		decode(formData),
	);

	if (!result.success) {
		return parseValibotIssues(result.issues);
	}

	const cookiesStore = await cookies();
	const pb = createServerClient(cookiesStore);

	let isSuccess = false;

	try {
		const response = await pb
			.collection(USERS_COLLECTION)
			.authWithPassword(result.output.email, result.output.password);

		if (response?.token) {
			exportSessionToCookie({ client: pb, cookies: cookiesStore });
			isSuccess = true;
		}
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return { errors: error.data.data, success: false };
		}
	}

	if (isSuccess) {
		redirect(paths.list());
	}

	return createRequestError();
}

export async function signInWithProviderAction(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const result = await v.safeParseAsync(
		v.object({ provider: v.literal("google") }),
		decode(formData),
	);

	if (!result.success) {
		return parseValibotIssues(result.issues);
	}

	const cookiesStore = await cookies();
	const pb = createServerClient(cookiesStore);

	let isSuccess = false;
	let redirectUrl: string | undefined = undefined;

	try {
		const response = await pb.collection(USERS_COLLECTION).authWithOAuth2({
			provider: result.output.provider,
			urlCallback: (url) => {
				console.log("urlCallback", url);
				redirectUrl = url;
			},
		});

		console.log({ response, redirectUrl });

		console.log(pb.authStore.isValid);
		console.log(pb.authStore.token);
		console.log(pb.authStore.model?.id);

		if (response?.token) {
			exportSessionToCookie({ client: pb, cookies: cookiesStore });
			isSuccess = true;
		}
	} catch (error) {
		console.log("error", error);
		if (error instanceof ClientResponseError) {
			return { errors: error.data.data, success: false };
		}
	}

	if (isSuccess) {
		redirect(paths.list());
	}

	return createRequestError();
}

export async function signUpAction(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const result = await v.safeParseAsync(
		v.object({
			email: v.pipe(v.string(), v.email()),
			password: v.string(),
			passwordConfirm: v.string(),
		}),
		decode(formData),
	);

	if (!result.success) {
		return parseValibotIssues(result.issues);
	}

	const cookiesStore = await cookies();
	const pb = createServerClient(cookiesStore);

	try {
		const createResponse = await pb.collection(USERS_COLLECTION).create({
			email: result.output.email,
			password: result.output.password,
			passwordConfirm: result.output.passwordConfirm,
			username: result.output.email,
		});

		console.error("Response", createResponse);

		const verificationResponse = await pb
			.collection(USERS_COLLECTION)
			.requestVerification(result.output.email);

		console.error("Response", verificationResponse);

		return { success: true, data: {} };
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return parseClientError(error);
		}
	}

	return createRequestError();
}

export async function signOutAction(
	_prevState: ActionResult,
): Promise<ActionResult> {
	const cookiesStore = await cookies();

	const client = createServerClient(cookiesStore);
	client.authStore.clear();

	exportSessionToCookie({ client, cookies: cookiesStore });

	redirect(paths.signIn);
}
