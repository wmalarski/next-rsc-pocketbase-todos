"use client";
import { Button } from "@/components/Button/Button";
import { deleteTodo } from "@/server/todos";
import { useEvent } from "@/utils/useEvent";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

type DeleteTodoFormProps = {
	id: string;
	onFailure: VoidFunction;
	onSubmit: VoidFunction;
};

export const DeleteTodoForm = ({
	id,
	onFailure,
	onSubmit,
}: DeleteTodoFormProps) => {
	const [state, formAction] = useFormState(deleteTodo, { success: false });

	const { pending } = useFormStatus();

	const onFailureRef = useEvent(onFailure);

	useEffect(() => {
		if (state.error || state.errors) {
			onFailureRef();
		}
	}, [onFailureRef, state.error, state.errors]);

	return (
		<form action={formAction} onSubmit={onSubmit}>
			<input type="hidden" name="id" value={id} />
			<Button
				variant="outline"
				// colorPalette="red"
				disabled={pending}
				type="submit"
			>
				Delete
			</Button>
		</form>
	);
};
