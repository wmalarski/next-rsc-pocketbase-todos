"use client";
import { deleteTodo } from "@/server/todos";
import { Button } from "@/ui/button";
import { useEvent } from "@/utils/use-event";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

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
	const [state, formAction] = useActionState(deleteTodo, { success: false });

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
