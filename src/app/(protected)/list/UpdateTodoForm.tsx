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
  defaultText: string;
  id: string;
};

export const UpdateTodoForm = ({ id, defaultText }: UpdateTodoFormProps) => {
  const [state, formAction] = useFormState(updateTodo, {});

  const { pending } = useFormStatus();

  return (
    <form
      action={formAction}
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
        <Editable defaultValue={defaultText} activationMode="focus">
          {(state) => (
            <>
              <EditableLabel srOnly asChild>
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
      <Button
        variant="outline"
        colorPalette="accent"
        disabled={pending}
        type="submit"
      >
        Update
      </Button>
    </form>
  );
};
