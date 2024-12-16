"use client";
import { signInWithPasswordAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { BasicAlert } from "@/ui/alert";
import { Button } from "@/ui/button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Link } from "@/ui/link";
import { paths } from "@/utils/paths";
import { useFormState, useFormStatus } from "react-dom";

export const SignInForm = () => {
	const [state, formAction] = useFormState(signInWithPasswordAction, {
		success: false,
	});

	const { pending } = useFormStatus();

	return (
		<Card width="sm" asChild>
			<form action={formAction}>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Sign in using email and password</CardDescription>
				</CardHeader>
				<CardBody>
					<Stack gap="4">
						{state?.error ? (
							<BasicAlert icon="error" title={state.error} />
						) : null}
						{state?.success ? (
							<BasicAlert
								icon="success"
								title="Sign up successful"
								description={
									<Link href={paths.signIn} variant="link">
										Go to sign in
									</Link>
								}
							/>
						) : null}
						<Stack gap="1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								disabled={pending}
								name="email"
								id="email"
								type="email"
								placeholder="Email"
								required
							/>
							{state?.errors?.email ? (
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
							{state?.errors?.password ? (
								<BasicAlert icon="error" title={state.errors.password} />
							) : null}
						</Stack>
					</Stack>
				</CardBody>
				<CardFooter gap="3">
					<Button disabled={pending} type="submit">
						Sign In
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
