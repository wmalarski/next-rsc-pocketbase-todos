"use client";
import { signInWithProviderAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Link } from "@/ui/link";
import { paths } from "@/utils/paths";
import { useFormState, useFormStatus } from "react-dom";

export const ProviderSignInForm = () => {
	const [state, formAction] = useFormState(signInWithProviderAction, {
		success: false,
	});

	const { pending } = useFormStatus();

	return (
		<Card.Root width="sm" asChild>
			<form action={formAction}>
				<input type="hidden" name="provider" value="google" />
				<Card.Header>
					<Card.Title>Sign In</Card.Title>
					<Card.Description>Sign in using provider</Card.Description>
				</Card.Header>
				<Card.Body>
					<Stack gap="4">
						{state?.error ? (
							<BasicAlert icon="error" title={state.error} />
						) : null}
						{state?.success ? (
							<BasicAlert
								icon="success"
								title="Sign up successful"
								description={<Link href={paths.signIn}>Go to sign in</Link>}
							/>
						) : null}
					</Stack>
				</Card.Body>
				<Card.Footer gap="3">
					<Button disabled={pending} type="submit">
						Sign In using Google
					</Button>
				</Card.Footer>
			</form>
		</Card.Root>
	);
};
