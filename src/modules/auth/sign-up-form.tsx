"use client";
import { BasicAlert } from "@/components/alert/alert";
import { Button } from "@/components/button/button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/card/card";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { signUpAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { useFormState, useFormStatus } from "react-dom";

export const SignUpForm = () => {
	const { pending } = useFormStatus();

	const [state, formAction] = useFormState(signUpAction, { success: false });

	return (
		<Card width="sm" asChild>
			<form action={formAction}>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>Sign up using email and password</CardDescription>
				</CardHeader>
				<CardBody>
					<Stack gap="4">
						{state.error ? (
							<BasicAlert icon="error" title={state.error} />
						) : null}
						<Stack gap="1.5">
							<Label htmlFor="email">Email</Label>
							<Input
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
						</Stack>
						<Stack gap="1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								disabled={pending}
								name="password"
								id="password"
								type="password"
								required
							/>
							{state.errors?.password ? (
								<BasicAlert icon="error" title={state.errors.password} />
							) : null}
						</Stack>
						<Stack gap="1.5">
							<Label htmlFor="passwordConfirm">Confirm password</Label>
							<Input
								disabled={pending}
								name="passwordConfirm"
								id="passwordConfirm"
								type="password"
								required
							/>
							{state.errors?.passwordConfirm ? (
								<BasicAlert icon="error" title={state.errors.passwordConfirm} />
							) : null}
						</Stack>
					</Stack>
				</CardBody>
				<CardFooter gap="3">
					<Button disabled={pending} type="submit">
						Sign Up
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
