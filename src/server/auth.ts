"use server";
import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as v from "valibot";
import { createServerClient } from "./pocketbase";
import { exportSessionToCookie } from "./session";
import { type ActionResult, createRequestError, handleAction } from "./utils";

const USERS_COLLECTION = "users";

export async function signInWithPasswordAction(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	return handleAction({
		data: decode(formData),
		schema: v.object({
			email: v.pipe(v.string(), v.email()),
			password: v.string(),
		}),
		handler: async (args) => {
			const cookiesStore = await cookies();
			const pb = createServerClient(cookiesStore);

			let isSuccess = false;

			const response = await pb
				.collection(USERS_COLLECTION)
				.authWithPassword(args.email, args.password);

			if (response?.token) {
				exportSessionToCookie({ client: pb, cookies: cookiesStore });
				isSuccess = true;
			}

			if (isSuccess) {
				redirect(paths.list());
			}

			return createRequestError();
		},
	});
}

export async function signInWithProviderAction(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	return handleAction({
		data: decode(formData),
		schema: v.object({ provider: v.literal("google") }),
		handler: async (args) => {
			const cookiesStore = await cookies();
			const pb = createServerClient(cookiesStore);

			let redirectUrl: string | undefined = undefined;

			const response = await pb.collection(USERS_COLLECTION).authWithOAuth2({
				provider: args.provider,
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
				redirect(paths.list());
			}

			return createRequestError();
		},
	});
}

export async function signUpAction(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	return handleAction({
		data: decode(formData),
		schema: v.object({
			email: v.pipe(v.string(), v.email()),
			password: v.string(),
			passwordConfirm: v.string(),
		}),
		handler: async (args) => {
			const cookiesStore = await cookies();
			const pb = createServerClient(cookiesStore);

			await pb.collection(USERS_COLLECTION).create({
				email: args.email,
				password: args.password,
				passwordConfirm: args.passwordConfirm,
				username: args.email,
			});

			await pb.collection(USERS_COLLECTION).requestVerification(args.email);

			return { success: true, data: {} };
		},
	});
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
