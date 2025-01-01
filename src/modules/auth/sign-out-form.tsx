"use client";
import { signOutAction } from "@/server/auth";
import { Button } from "@/ui/button";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export const SignOutForm = () => {
	const [, formAction] = useActionState(signOutAction, { success: false });

	const { pending } = useFormStatus();

	return (
		<form action={formAction}>
			<Button disabled={pending} type="submit">
				Sign Out
			</Button>
		</form>
	);
};
