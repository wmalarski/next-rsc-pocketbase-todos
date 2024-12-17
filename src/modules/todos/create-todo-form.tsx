"use client";
import { createTodo } from "@/server/todos";
import { Stack } from "@/styled-system/jsx";
import { flex } from "@/styled-system/patterns";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Field } from "@/ui/field";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const CreateTodoForm = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const [state, formAction] = useFormState(createTodo, { success: false });

	const { pending } = useFormStatus();

	const action = async (form: FormData) => {
		formAction(form);
		formRef.current?.reset();
	};

	return (
		<form
			ref={formRef}
			action={action}
			className={flex({ gap: 2, justifyContent: "space-between" })}
		>
			<Stack gap="4" flexGrow={1}>
				{state?.error ? <BasicAlert icon="error" title={state.error} /> : null}
				<Field.Root gap="1.5">
					<Field.Label htmlFor="text" srOnly>
						Text
					</Field.Label>
					<Field.Input
						disabled={pending}
						name="text"
						id="text"
						type="text"
						required
					/>
					{state?.errors?.text ? (
						<BasicAlert icon="error" title={state.errors.text} />
					) : null}
				</Field.Root>
			</Stack>
			<Button
				variant="outline"
				// colorPalette="blue"
				disabled={pending}
				type="submit"
			>
				Create
			</Button>
		</form>
	);
};
