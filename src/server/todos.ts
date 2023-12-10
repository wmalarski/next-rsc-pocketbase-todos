"use server";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { ClientResponseError } from "pocketbase";
import { object, safeParseAsync, string } from "valibot";
import { createServerClient } from "./pocketBase";
import {
  createRequestError,
  valibotResultToErrors,
  type FormReturn,
} from "./utils";

const TODOS_COLLECTION = "todos";
const TODOS_PER_PAGE = 10;

type ListTodosArgs = {
  page: number;
};

export async function listTodos({ page }: ListTodosArgs) {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  const response = await pb
    .collection(TODOS_COLLECTION)
    .getList(page, TODOS_PER_PAGE);

  console.error("Response", response);

  return response;
}

export async function createTodo(
  _prevState: FormReturn,
  formData: FormData,
): Promise<FormReturn> {
  const result = await safeParseAsync(
    object({ text: string() }),
    decode(formData),
  );

  if (!result.success) {
    return valibotResultToErrors(result.issues);
  }

  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  try {
    const createResponse = await pb.collection(TODOS_COLLECTION).create({
      text: result.output.text,
    });

    console.error("Response", { createResponse });

    return { success: true };
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  return createRequestError();
}
