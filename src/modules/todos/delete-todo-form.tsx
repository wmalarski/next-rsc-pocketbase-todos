"use client";
import { Button } from "@/ui/button";
import {} from "react";
import { useFormStatus } from "react-dom";

type DeleteTodoFormProps = {
	id: string;
	onSubmit: (formData: FormData) => void;
};

export const DeleteTodoForm = ({ id, onSubmit }: DeleteTodoFormProps) => {
	const { pending } = useFormStatus();

	return (
		<form action={onSubmit}>
			<input type="hidden" name="id" value={id} />
			<Button variant="outline" disabled={pending} type="submit">
				Delete
			</Button>
		</form>
	);
};
