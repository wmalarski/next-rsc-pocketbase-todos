import { Issues } from "valibot";

export type FormReturn = {
  errors?: Record<string, { message: string }>;
  error?: string;
};

export const valibotResultToErrors = (issues: Issues): FormReturn => {
  console.log("issues", JSON.stringify(issues, null, 2));
  const entries = issues.map((issue) => {
    const key = issue.path?.map((item) => String(item.key)).join(".");
    return [key, { message: issue.message }];
  });
  return { errors: Object.fromEntries(entries) };
};

export const createRequestError = (): FormReturn => {
  return { error: "Request error" };
};
