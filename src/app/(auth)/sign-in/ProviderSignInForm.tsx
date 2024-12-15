"use client";
import { BasicAlert } from "@/components/Alert/Alert";
import { Button } from "@/components/Button/Button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/Card/Card";
import { Link } from "@/components/Link/Link";
import { signInWithProviderAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { paths } from "@/utils/paths";
import { useFormState, useFormStatus } from "react-dom";

export const ProviderSignInForm = () => {
	const [state, formAction] = useFormState(signInWithProviderAction, {});

	const { pending } = useFormStatus();

	return (
		<Card width="sm" asChild>
			<form action={formAction}>
				<input type="hidden" name="provider" value="google" />
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Sign in using provider</CardDescription>
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
					</Stack>
				</CardBody>
				<CardFooter gap="3">
					<Button disabled={pending} type="submit">
						Sign In using Google
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
