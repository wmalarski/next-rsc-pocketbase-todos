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
import { useFormState, useFormStatus } from "react-dom";

type UpdateTodoFormProps = {
  id: string;
  text: string;
};

export const UpdateTodoForm = ({ id }: UpdateTodoFormProps) => {
  const [state, formAction] = useFormState(updateTodo, {});

  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
      className={flex({ gap: 2, justifyContent: "space-between" })}
    >
      <input type="hidden" name="id" value={id} />
      <Stack gap="4" flexGrow={1}>
        {state?.error ? <BasicAlert icon="error" title={state.error} /> : null}
        <Stack gap="1.5">
          <Label htmlFor="text" srOnly>
            Text
          </Label>
          <Editable
            placeholder="Your favorite Framework"
            defaultValue="Double click to edit"
            activationMode="dblclick"
          >
            {(state) => (
              <>
                <EditableLabel asChild>
                  <Label>Text</Label>
                </EditableLabel>
                <EditableArea>
                  <EditableInput />
                  <EditablePreview />
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
                  ) : (
                    <EditableEditTrigger asChild>
                      <Button variant="link">Edit</Button>
                    </EditableEditTrigger>
                  )}
                </EditableControl>
              </>
            )}
          </Editable>
          {state?.errors?.text ? (
            <BasicAlert icon="error" title={state.errors.text.message} />
          ) : null}
        </Stack>
      </Stack>
      <Button disabled={pending} type="submit">
        Update
      </Button>
    </form>
  );
};
