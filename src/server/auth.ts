"use server";
import { paths } from "@/lib/paths";
import { decode } from "decode-formdata";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { email, object, safeParseAsync, string } from "valibot";
import { PB_COOKIE_NAME, createServerClient } from "./pocketBase";

const USERS_COLLECTION = "users";

export async function signInAction(prevState: any, formData: FormData) {
  const result = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(formData),
  );

  if (!result.success) {
    return { errors: result.issues.map((issue) => issue.message) };
  }

  console.log("Server function", result.output);

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
    console.error("CATCH", error);
    return { errors: ["Invalid data"] };
  }

  console.error("isSuccess", isSuccess);
  if (isSuccess) {
    redirect(paths.list());
  }

  return { errors: ["Invalid request"] };
}

export async function signUpAction(prevState: any, formData: FormData) {
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
    return { errors: result.issues.map((issue) => issue.message) };
  }

  console.log("Server function", result.output);

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

    // if (response?.token) {
    //   cookiesStore.set(PB_COOKIE_NAME, pb.authStore.exportToCookie());
    //   isSuccess = true;
    // }

    const verificationResponse = await pb
      .collection(USERS_COLLECTION)
      .requestVerification(result.output.email);

    console.error("Response", verificationResponse);

    isSuccess = true;
  } catch (error) {
    console.error("CATCH", error);
    return { errors: ["Invalid data"] };
  }

  console.error("isSuccess", isSuccess);
  if (isSuccess) {
    redirect(paths.list());
  }

  return { errors: ["Invalid request"] };
}
