"use server";
import { paths } from "@/utils/paths";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import { email, object, safeParseAsync, string } from "valibot";
import {
  createRequestError,
  valibotResultToErrors,
  type FormReturn,
} from "./errors";
import { PB_COOKIE_NAME, createServerClient } from "./pocketBase";

const USERS_COLLECTION = "users";

export async function signInAction(
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

    console.error("Response", response);

    if (response?.token) {
      cookiesStore.set(PB_COOKIE_NAME, pb.authStore.exportToCookie());
      isSuccess = true;
    }
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  console.error("isSuccess", isSuccess);
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

  console.log(JSON.stringify(result.issues, null, 2));

  if (!result.success) {
    return valibotResultToErrors(result.issues);
  }

  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  let isSuccess = false;

  try {
    const createResponse = await pb.collection(USERS_COLLECTION).create({
      email: result.output.email,
      password: result.output.password,
      passwordConfirm: result.output.passwordConfirm,
    });

    console.error("Response", createResponse);

    const verificationResponse = await pb
      .collection(USERS_COLLECTION)
      .requestVerification(result.output.email);

    console.error("Response", verificationResponse);

    isSuccess = true;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return { errors: error.data.data };
    }
  }

  console.error("isSuccess", isSuccess);
  if (isSuccess) {
    redirect(paths.list());
  }

  return createRequestError();
}
