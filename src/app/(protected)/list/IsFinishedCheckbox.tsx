"use client";
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from "@/components/Checkbox/Checkbox";
import { updateTodo } from "@/server/todos";
import { CheckIcon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

type UpdateTodoFormProps = {
  defaultChecked: boolean;
  id: string;
};

export const IsFinishedCheckbox = ({
  defaultChecked,
  id,
}: UpdateTodoFormProps) => {
  const [state, formAction] = useFormState(updateTodo, {});

  // updateTodo.bind({ id })

  const { pending } = useFormStatus();

  return (
    <Checkbox defaultChecked={defaultChecked}>
      {(state) => (
        <>
          <CheckboxControl>
            {state.isChecked ? <CheckIcon /> : null}
          </CheckboxControl>
          <CheckboxLabel srOnly>Is Finished</CheckboxLabel>
        </>
      )}
    </Checkbox>
  );
};
