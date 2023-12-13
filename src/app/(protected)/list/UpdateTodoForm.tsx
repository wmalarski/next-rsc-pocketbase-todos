"use client";
import { BasicAlert } from "@/components/Alert/Alert";
import { Button } from "@/components/Button/Button";
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from "@/components/Editable/Editable";
import { Label } from "@/components/Label/Label";
import { updateTodo } from "@/server/todos";
import { Stack } from "@/styled-system/jsx";
import { flex } from "@/styled-system/patterns";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";

type UpdateTodoFormProps = {
  id: string;
  initialText: string;
  isFinished: boolean;
};

export const UpdateTodoForm = ({
  id,
  initialText,
  isFinished,
}: UpdateTodoFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(updateTodo, {});

  const [isDirty, setIsDirty] = useState(false);

  const onFormChange = () => {
    setIsDirty(true);
  };

  const onFormSubmit = () => {
    setIsDirty(false);
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      onChange={onFormChange}
      onSubmit={onFormSubmit}
      className={flex({
        gap: 2,
        justifyContent: "space-between",
        flexGrow: 1,
        alignItems: "center",
      })}
    >
      <input type="hidden" name="id" value={id} />
      <Stack gap="1.5" flexGrow={1}>
        {state?.error ? <BasicAlert icon="error" title={state.error} /> : null}
        <Editable
          defaultValue={initialText}
          activationMode={isFinished ? "none" : "focus"}
        >
          {(state) => (
            <>
              <EditableLabel srOnly asChild>
                <Label>Text</Label>
              </EditableLabel>
              <EditableArea>
                <EditableInput name="text" />
                <EditablePreview
                  textDecoration={isFinished ? "line-through" : undefined}
                  opacity={isFinished ? 0.8 : 1}
                />
              </EditableArea>
              <EditableControl>
                {state.isEditing ? (
                  <>
                    <EditableSubmitTrigger asChild>
                      <Button variant="link">Save</Button>
                    </EditableSubmitTrigger>
                    <EditableCancelTrigger asChild>
                      <Button variant="link">Cancel</Button>
                    </EditableCancelTrigger>
                  </>
                ) : !isFinished ? (
                  <EditableEditTrigger asChild>
                    <Button variant="link">Edit</Button>
                  </EditableEditTrigger>
                ) : null}
              </EditableControl>
            </>
          )}
        </Editable>
        {state?.errors?.text ? (
          <BasicAlert icon="error" title={state.errors.text.message} />
        ) : null}
      </Stack>
      <Button
        variant="outline"
        colorPalette="accent"
        disabled={!isDirty}
        type="submit"
      >
        Update
      </Button>
    </form>
  );
};
