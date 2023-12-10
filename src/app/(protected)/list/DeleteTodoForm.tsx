"use client";
import { Button } from "@/components/Button/Button";
import { createTodo } from "@/server/todos";
import { useFormState, useFormStatus } from "react-dom";

export const DeleteTodoForm = () => {
  const [, formAction] = useFormState(createTodo, {});

  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <Button disabled={pending} type="submit">
        Delete
      </Button>
    </form>
  );
};
