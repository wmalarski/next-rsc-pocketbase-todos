"use client";
import { Button } from "@/components/Button/Button";
import { signOutAction } from "@/server/auth";
import { useFormState, useFormStatus } from "react-dom";

export const SignOutForm = () => {
	const [, formAction] = useFormState(signOutAction, {});

	const { pending } = useFormStatus();

	return (
		<form action={formAction}>
			<Button disabled={pending} type="submit">
				Sign Out
			</Button>
		</form>
	);
};
