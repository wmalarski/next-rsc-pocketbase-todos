"use client";
import type { ActionResult } from "@/server/utils";
import { Stack } from "@/styled-system/jsx";
import { flex } from "@/styled-system/patterns";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Field } from "@/ui/field";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

type CreateTodoFormProps = {
	actionState: ActionResult;
	onCreate: (formData: FormData) => void;
};

export const CreateTodoForm = ({
	actionState,
	onCreate,
}: CreateTodoFormProps) => {
	const formRef = useRef<HTMLFormElement>(null);

	const { pending } = useFormStatus();

	const action = async (form: FormData) => {
		onCreate(form);
		formRef.current?.reset();
	};

	return (
		<form
			ref={formRef}
			action={action}
			className={flex({ gap: 2, justifyContent: "space-between" })}
		>
			<Stack gap="4" flexGrow={1}>
				{actionState?.error ? (
					<BasicAlert icon="error" title={actionState.error} />
				) : null}
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
					{actionState?.errors?.text ? (
						<BasicAlert icon="error" title={actionState.errors.text} />
					) : null}
				</Field.Root>
			</Stack>
			<Button variant="solid" disabled={pending} type="submit">
				Create
			</Button>
		</form>
	);
};
