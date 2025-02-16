"use server";

import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as v from "valibot";
import { createServerClient } from "./pocketbase";
import { type ActionResult, delayResponse, handleAction } from "./utils";

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
	return handleAction({
		data: decode(formData),
		schema: v.object({ text: v.string() }),
		handler: async (args) => {
			const { pb, user } = await createAuthorizedServerClient();

			await pb.collection(TODOS_COLLECTION).create({
				text: args.text,
				user: user.id,
			});

			revalidatePath(paths.list());

			return delayResponse({ success: true, data: {} });
		},
	});
}

export async function updateTodo(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	return handleAction({
		data: decode(formData),
		schema: v.object({ text: v.string(), id: v.string() }),
		handler: async (args) => {
			const { pb, user } = await createAuthorizedServerClient();

			await pb.collection(TODOS_COLLECTION).update(args.id, {
				text: args.text,
				user: user.id,
			});

			revalidatePath(paths.list());

			return delayResponse({ success: true, data: {} });
		},
	});
}

export async function deleteTodo(
	_prevState: ActionResult,
	formData: FormData,
): Promise<ActionResult> {
	return handleAction({
		data: decode(formData),
		schema: v.object({ id: v.string() }),
		handler: async (args) => {
			const { pb } = await createAuthorizedServerClient();

			await pb.collection(TODOS_COLLECTION).delete(args.id);

			revalidatePath(paths.list());

			return delayResponse({ success: true, data: {} });
		},
	});
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
	return handleAction({
		data: args,
		schema: updateIsFinishedTodoSchema(),
		handler: async (args) => {
			const { pb } = await createAuthorizedServerClient();

			await pb.collection(TODOS_COLLECTION).update(args.id, {
				isFinished: args.isFinished,
			});

			revalidatePath(paths.list());

			return delayResponse({ success: true, data: {} });
		},
	});
}
