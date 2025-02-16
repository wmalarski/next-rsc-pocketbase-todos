"use server";

import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import * as v from "valibot";
import { createServerClient } from "./pocketbase";
import {
	type ActionResult,
	createRequestError,
	delayResponse,
	parseClientError,
	parseValibotIssues,
} from "./utils";

const TODOS_COLLECTION = "todos";
const TODOS_PER_PAGE = 10;

export type TodoModel = {
	collectionId: string;
	collectionName: typeof TODOS_COLLECTION;
	created: string;
	id: string;
	isFinished: boolean;
	text: string;
	updated: string;
	user: string;
};

const createAuthorizedServerClient = async () => {
	const cookiesStore = await cookies();
	const pb = createServerClient(cookiesStore);
	const user = pb.authStore.model;

	if (!user) {
		redirect(paths.signIn);
	}

	return { pb, user };
};

type ListTodosArgs = {
	page: number;
	perPage?: number;
};

export async function listTodos({ page, perPage }: ListTodosArgs) {
	const { pb } = await createAuthorizedServerClient();

	const result = await pb
		.collection(TODOS_COLLECTION)
		.getList<TodoModel>(page, perPage || TODOS_PER_PAGE, {
			sort: "created",
		});

	return delayResponse(result);
}

export async function createTodo(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const parsed = await v.safeParseAsync(
		v.object({ text: v.string() }),
		decode(formData),
	);

	if (!parsed.success) {
		return parseValibotIssues(parsed.issues);
	}

	const { pb, user } = await createAuthorizedServerClient();

	try {
		await pb.collection(TODOS_COLLECTION).create({
			text: parsed.output.text,
			user: user.id,
		});

		revalidatePath(paths.list());

		return delayResponse({ success: true, data: {} });
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return parseClientError(error);
		}
	}

	return createRequestError();
}

export async function deleteTodo(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const parsed = await v.safeParseAsync(
		v.object({ id: v.string() }),
		decode(formData),
	);

	if (!parsed.success) {
		return parseValibotIssues(parsed.issues);
	}

	const { pb } = await createAuthorizedServerClient();

	try {
		await pb.collection(TODOS_COLLECTION).delete(parsed.output.id);

		revalidatePath(paths.list());

		return delayResponse({ success: true, data: {} });
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return parseClientError(error);
		}
	}

	return createRequestError();
}

export async function updateTodo(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	const parsed = await v.safeParseAsync(
		v.object({ text: v.string(), id: v.string() }),
		decode(formData),
	);

	if (!parsed.success) {
		return parseValibotIssues(parsed.issues);
	}

	const { pb } = await createAuthorizedServerClient();

	try {
		await pb.collection(TODOS_COLLECTION).update(parsed.output.id, {
			text: parsed.output.text,
		});

		revalidatePath(paths.list());

		return delayResponse({ success: true, data: {} });
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return parseClientError(error);
		}
	}

	return createRequestError();
}

const updateIsFinishedTodoSchema = () => {
	return v.object({ isFinished: v.boolean(), id: v.string() });
};

type UpdateIsFinishedTodoArgs = v.InferInput<
	ReturnType<typeof updateIsFinishedTodoSchema>
>;

export async function updateIsFinishedTodo(
	args: UpdateIsFinishedTodoArgs,
): Promise<ActionResult> {
	const parsed = await v.safeParseAsync(updateIsFinishedTodoSchema(), args);

	if (!parsed.success) {
		return parseValibotIssues(parsed.issues);
	}

	const { pb } = await createAuthorizedServerClient();

	try {
		await pb.collection(TODOS_COLLECTION).update(parsed.output.id, {
			isFinished: parsed.output.isFinished,
		});

		revalidatePath(paths.list());

		return delayResponse({ success: true, data: {} });
	} catch (error) {
		if (error instanceof ClientResponseError) {
			return parseClientError(error);
		}
	}

	return createRequestError();
}
