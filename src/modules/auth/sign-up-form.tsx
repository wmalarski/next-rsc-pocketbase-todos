"use client";
import { signUpAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Field } from "@/ui/field";
import { useFormState, useFormStatus } from "react-dom";

export const SignUpForm = () => {
	const { pending } = useFormStatus();

	const [state, formAction] = useFormState(signUpAction, { success: false });

	return (
		<Card.Root width="sm" asChild>
			<form action={formAction}>
				<Card.Header>
					<Card.Title>Sign Up</Card.Title>
					<Card.Description>Sign up using email and password</Card.Description>
				</Card.Header>
				<Card.Body>
					<Stack gap="4">
						{state.error ? (
							<BasicAlert icon="error" title={state.error} />
						) : null}
						<Field.Root gap="1.5">
							<Field.Label htmlFor="email">Email</Field.Label>
							<Field.Input
								disabled={pending}
								id="email"
								name="email"
								placeholder="Email"
								required
								type="email"
							/>
							{state.errors?.email ? (
								<BasicAlert icon="error" title={state.errors?.email} />
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
							{state.errors?.password ? (
								<BasicAlert icon="error" title={state.errors.password} />
							) : null}
						</Field.Root>
						<Field.Root gap="1.5">
							<Field.Label htmlFor="passwordConfirm">
								Confirm password
							</Field.Label>
							<Field.Input
								disabled={pending}
								name="passwordConfirm"
								id="passwordConfirm"
								type="password"
								required
							/>
							{state.errors?.passwordConfirm ? (
								<BasicAlert icon="error" title={state.errors.passwordConfirm} />
							) : null}
						</Field.Root>
					</Stack>
				</Card.Body>
				<Card.Footer gap="3">
					<Button disabled={pending} type="submit">
						Sign Up
					</Button>
				</Card.Footer>
			</form>
		</Card.Root>
	);
};
