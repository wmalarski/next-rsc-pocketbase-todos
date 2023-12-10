"use client";
import { Button } from "@/components/Button/Button";
import { deleteTodo } from "@/server/todos";
import { useFormState, useFormStatus } from "react-dom";

type DeleteTodoFormProps = {
  id: string;
};

export const DeleteTodoForm = ({ id }: DeleteTodoFormProps) => {
  const [, formAction] = useFormState(deleteTodo, {});

  const { pending } = useFormStatus();

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button disabled={pending} type="submit">
        Delete
      </Button>
    </form>
  );
};
