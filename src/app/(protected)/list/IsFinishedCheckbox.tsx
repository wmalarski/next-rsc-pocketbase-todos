"use client";
import { updateTodo } from "@/server/todos";
import { flex } from "@/styled-system/patterns";
import { useFormState, useFormStatus } from "react-dom";

type UpdateTodoFormProps = {
  id: string;
  text: string;
};

export const IsFinishedCheckbox = ({ id }: UpdateTodoFormProps) => {
  const [state, formAction] = useFormState(updateTodo, {});

  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
      className={flex({ gap: 2, justifyContent: "space-between" })}
    >
      <input type="hidden" name="id" value={id} />
    </form>
  );
};
