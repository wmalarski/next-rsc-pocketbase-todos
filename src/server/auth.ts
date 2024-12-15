"use server";
import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import { email, literal, object, safeParseAsync, string } from "valibot";
import { PB_COOKIE_NAME, createServerClient } from "./pocketBase";
import {
	type FormReturn,
	createRequestError,
	valibotResultToErrors,
} from "./utils";

const USERS_COLLECTION = "users";

export async function signInWithPasswordAction(
	_prevState: FormReturn,
	formData: FormData,
): Promise<FormReturn> {
	const result = await safeParseAsync(
		object({ email: string([email()]), password: string() }),
		decode(formData),
	);

	if (!result.success) {
		return valibotResultToErrors(result.issues);
	}

	const cookiesStore = cookies();
	const pb = createServerClient(cookiesStore);

	let isSuccess = false;

	try {
		const response = await pb
			.collection(USERS_COLLECTION)
			.authWithPassword(result.output.email, result.output.password);

		if (response?.token) {
			cookiesStore.set(PB_COOKIE_NAME, pb.authStore.exportToCookie());
			isSuccess = true;
		}
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return { errors: error.data.data };
		}
	}

	if (isSuccess) {
		redirect(paths.list());
	}

	return createRequestError();
}

export async function signInWithProviderAction(
	_prevState: FormReturn,
	formData: FormData,
): Promise<FormReturn> {
	const result = await safeParseAsync(
		object({ provider: literal("google") }),
		decode(formData),
	);

	if (!result.success) {
		return valibotResultToErrors(result.issues);
	}

	const cookiesStore = await cookies();
	const pb = createServerClient(cookiesStore);

	let isSuccess = false;
	let redirectUrl;

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
			cookiesStore.set(PB_COOKIE_NAME, pb.authStore.exportToCookie());
			isSuccess = true;
		}
	} catch (error) {
		console.log("error", error);
		if (error instanceof ClientResponseError) {
			return { errors: error.data.data };
		}
	}

	if (isSuccess) {
		redirect(paths.list());
	}

	return createRequestError();
}

export async function signUpAction(
	_prevState: FormReturn,
	formData: FormData,
): Promise<FormReturn> {
	const result = await safeParseAsync(
		object({
			email: string([email()]),
			password: string(),
			passwordConfirm: string(),
		}),
		decode(formData),
	);

	if (!result.success) {
		return valibotResultToErrors(result.issues);
	}

	const cookiesStore = cookies();
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

		return { success: true };
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return { errors: error.data.data };
		}
	}

	return createRequestError();
}

export async function signOutAction(
	_prevState: FormReturn,
): Promise<FormReturn> {
	const cookiesStore = cookies();

	const pb = createServerClient(cookiesStore);
	pb.authStore.clear();

	cookiesStore.set(PB_COOKIE_NAME, pb.authStore.exportToCookie());

	redirect(paths.signIn);
}
