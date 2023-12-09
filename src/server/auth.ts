"use server";
import { decode } from "decode-formdata";
import { email, object, safeParseAsync, string } from "valibot";

export async function signInAction(formData: FormData) {
  const result = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(formData),
  );

  if (!result.success) {
    return { errors: result.issues.map((issue) => issue.message) };
  }

  console.log("Server function", result.output);
  return {};
}

export async function signUpAction(formData: FormData) {
  const result = await safeParseAsync(
    object({ email: string([email()]), password: string() }),
    decode(formData),
  );

  if (!result.success) {
    return { errors: result.issues.map((issue) => issue.message) };
  }

  console.log("Server function", result.output);
  return {};
}
