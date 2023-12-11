"use client";
import { BasicAlert } from "@/components/Alert/Alert";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { createTodo } from "@/server/todos";
import { Stack } from "@/styled-system/jsx";
import { flex } from "@/styled-system/patterns";
import { FormEvent } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const CreateTodoForm = () => {
  const [state, formAction] = useFormState(createTodo, {});

  const { pending } = useFormStatus();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.currentTarget.reset();
  };

  return (
    <form
      action={formAction}
      className={flex({ gap: 2, justifyContent: "space-between" })}
      onSubmit={onSubmit}
    >
      <Stack gap="4" flexGrow={1}>
        {state?.error ? <BasicAlert icon="error" title={state.error} /> : null}
        <Stack gap="1.5">
          <Label htmlFor="text" srOnly>
            Text
          </Label>
          <Input
            disabled={pending}
            name="text"
            id="text"
            type="text"
            required
          />
          {state?.errors?.text ? (
            <BasicAlert icon="error" title={state.errors.text.message} />
          ) : null}
        </Stack>
      </Stack>
      <Button
        variant="outline"
        colorPalette="blue"
        disabled={pending}
        type="submit"
      >
        Create
      </Button>
    </form>
  );
};
