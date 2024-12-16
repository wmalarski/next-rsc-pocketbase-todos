"use client";
import { signOutAction } from "@/server/auth";
import { Button } from "@/ui/button";
import { useFormState, useFormStatus } from "react-dom";

export const SignOutForm = () => {
	const [, formAction] = useFormState(signOutAction, { success: false });

	const { pending } = useFormStatus();

	return (
		<form action={formAction}>
			<Button disabled={pending} type="submit">
				Sign Out
			</Button>
		</form>
	);
};
