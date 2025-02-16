"use client";
import { updateTodo } from "@/server/todos";
import { Stack } from "@/styled-system/jsx";
import { flex } from "@/styled-system/patterns";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Editable } from "@/ui/editable";
import { useActionState, useRef, useState } from "react";

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

	const [state, formAction] = useActionState(updateTodo, { success: false });
	const errorState = state.success ? undefined : state;

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
				{errorState?.error ? (
					<BasicAlert icon="error" title={errorState.error} />
				) : null}
				<Editable.Root
					defaultValue={initialText}
					activationMode={isFinished ? "click" : "focus"}
				>
					<Editable.Label srOnly>Text</Editable.Label>
					<Editable.Area>
						<Editable.Input name="text" minLength={1} />
						<Editable.Preview
							textDecoration={isFinished ? "line-through" : undefined}
							opacity={isFinished ? 0.8 : 1}
						/>
					</Editable.Area>
					<Editable.Control>
						<Editable.Context>
							{(state) =>
								state.editing ? (
									<>
										<Editable.SubmitTrigger asChild>
											<Button variant="link">Save</Button>
										</Editable.SubmitTrigger>
										<Editable.CancelTrigger asChild>
											<Button variant="link">Cancel</Button>
										</Editable.CancelTrigger>
									</>
								) : isFinished ? null : (
									<Editable.EditTrigger asChild>
										<Button variant="link">Edit</Button>
									</Editable.EditTrigger>
								)
							}
						</Editable.Context>
					</Editable.Control>
				</Editable.Root>
				{errorState?.errors?.text ? (
					<BasicAlert icon="error" title={errorState.errors.text} />
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
