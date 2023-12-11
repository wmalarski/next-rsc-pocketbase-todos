"use server";
import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import { boolean, object, optional, safeParseAsync, string } from "valibot";
import { createServerClient } from "./pocketBase";
import {
  createRequestError,
  valibotResultToErrors,
  type FormReturn,
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

type ListTodosArgs = {
  page: number;
};

export async function listTodos({ page }: ListTodosArgs) {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  return pb
    .collection(TODOS_COLLECTION)
    .getList<TodoModel>(page, TODOS_PER_PAGE);
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
    object({
      text: optional(string()),
      isFinished: optional(boolean()),
      id: string(),
    }),
    decode(formData, { booleans: ["isFinished"] }),
  );

  if (!parsed.success) {
    return valibotResultToErrors(parsed.issues);
  }

  const { pb } = createAuthorizedServerClient();

  try {
    await pb.collection(TODOS_COLLECTION).update(parsed.output.id, {
      text: parsed.output.text,
      isFinished: parsed.output.isFinished,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  return createRequestError();
}
