"use client";
import { signInWithPasswordAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Field } from "@/ui/field";
import { Link } from "@/ui/link";
import { paths } from "@/utils/paths";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export const SignInForm = () => {
	const [state, formAction] = useActionState(signInWithPasswordAction, {
		success: false,
	});
	const errorState = state.success ? undefined : state;

	const { pending } = useFormStatus();

	return (
		<Card.Root width="sm" asChild>
			<form action={formAction}>
				<Card.Header>
					<Card.Title>Sign In</Card.Title>
					<Card.Description>Sign in using email and password</Card.Description>
				</Card.Header>
				<Card.Body>
					<Stack gap="4">
						{errorState?.error ? (
							<BasicAlert icon="error" title={errorState.error} />
						) : null}
						{state?.success ? (
							<BasicAlert
								icon="success"
								title="Sign up successful"
								description={<Link href={paths.signIn}>Go to sign in</Link>}
							/>
						) : null}
						<Field.Root gap="1.5">
							<Field.Label htmlFor="email">Email</Field.Label>
							<Field.Input
								disabled={pending}
								name="email"
								id="email"
								type="email"
								placeholder="Email"
								required
							/>
							{errorState?.errors?.email ? (
								<BasicAlert icon="error" title={errorState.errors?.email} />
							) : null}
						</Field.Root>
						<Field.Root gap="1.5">
							<Field.Label htmlFor="password">Password</Field.Label>
							<Field.Input
								disabled={pending}
								name="password"
								id="password"
								type="password"
								required
							/>
							{errorState?.errors?.password ? (
								<BasicAlert icon="error" title={errorState.errors.password} />
							) : null}
						</Field.Root>
					</Stack>
				</Card.Body>
				<Card.Footer gap="3">
					<Button disabled={pending} type="submit">
						Sign In
					</Button>
				</Card.Footer>
			</form>
		</Card.Root>
	);
};
