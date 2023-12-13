"use server";
import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import { Input, boolean, object, safeParseAsync, string } from "valibot";
import { createServerClient } from "./pocketBase";
import {
  createRequestError,
  valibotResultToErrors,
  type FormReturn,
} from "./utils";

const TODOS_COLLECTION = "todos";
const TODOS_PER_PAGE = 3;

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

type ListTodosArgs = {
  page: number;
  perPage?: number;
};

export async function listTodos({ page, perPage }: ListTodosArgs) {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  return pb
    .collection(TODOS_COLLECTION)
    .getList<TodoModel>(page, perPage || TODOS_PER_PAGE);
}

const createAuthorizedServerClient = () => {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);
  const user = pb.authStore.model;

  if (!user) {
    redirect(paths.signIn);
  }

  return { pb, user };
};

export async function createTodo(
  _prevState: FormReturn,
  formData: FormData,
): Promise<FormReturn> {
  const parsed = await safeParseAsync(
    object({ text: string() }),
    decode(formData),
  );

  if (!parsed.success) {
    return valibotResultToErrors(parsed.issues);
  }

  const { pb, user } = createAuthorizedServerClient();

  try {
    await pb.collection(TODOS_COLLECTION).create({
      text: parsed.output.text,
      user: user.id,
    });

    revalidatePath(paths.list());

    return { success: true };
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  return createRequestError();
}

export async function deleteTodo(
  _prevState: FormReturn,
  formData: FormData,
): Promise<FormReturn> {
  const parsed = await safeParseAsync(
    object({ id: string() }),
    decode(formData),
  );

  if (!parsed.success) {
    return valibotResultToErrors(parsed.issues);
  }

  const { pb } = createAuthorizedServerClient();

  try {
    await pb.collection(TODOS_COLLECTION).delete(parsed.output.id);

    revalidatePath(paths.list());

    return { success: true };
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  return createRequestError();
}

export async function updateTodo(
  _prevState: FormReturn,
  formData: FormData,
): Promise<FormReturn> {
  const parsed = await safeParseAsync(
    object({ text: string(), id: string() }),
    decode(formData),
  );

  if (!parsed.success) {
    return valibotResultToErrors(parsed.issues);
  }

  const { pb } = createAuthorizedServerClient();

  try {
    await pb.collection(TODOS_COLLECTION).update(parsed.output.id, {
      text: parsed.output.text,
    });

    revalidatePath(paths.list());

    return { success: true };
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  return createRequestError();
}

const updateIsFinishedTodoSchema = () => {
  return object({ isFinished: boolean(), id: string() });
};

type UpdateIsFinishedTodoArgs = Input<
  ReturnType<typeof updateIsFinishedTodoSchema>
>;

export async function updateIsFinishedTodo(
  args: UpdateIsFinishedTodoArgs,
): Promise<FormReturn> {
  const parsed = await safeParseAsync(updateIsFinishedTodoSchema(), args);

  if (!parsed.success) {
    return valibotResultToErrors(parsed.issues);
  }

  const { pb } = createAuthorizedServerClient();

  try {
    await pb.collection(TODOS_COLLECTION).update(parsed.output.id, {
      isFinished: parsed.output.isFinished,
    });

    revalidatePath(paths.list());

    return { success: true };
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  return createRequestError();
}
