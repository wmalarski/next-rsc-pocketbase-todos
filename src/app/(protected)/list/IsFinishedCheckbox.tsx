"use client";
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
  CheckboxProps,
} from "@/components/Checkbox/Checkbox";
import { updateIsFinishedTodo } from "@/server/todos";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

type UpdateTodoFormProps = {
  initialIsFinished: boolean;
  id: string;
};

export const IsFinishedCheckbox = ({
  initialIsFinished,
  id,
}: UpdateTodoFormProps) => {
  const [isFinished, setIsFinished] = useState(initialIsFinished);

  const onCheckedChange: CheckboxProps["onCheckedChange"] = async ({
    checked,
  }) => {
    const isFinished = Boolean(checked);
    setIsFinished(isFinished);
    await updateIsFinishedTodo({ id, isFinished });
  };

  return (
    <Checkbox checked={isFinished} onCheckedChange={onCheckedChange}>
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
