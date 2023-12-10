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
import { Input } from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import { Link } from "@/components/Link/Link";
import { signInAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { paths } from "@/utils/paths";
import { useFormState, useFormStatus } from "react-dom";

export const SignInForm = () => {
  const [state, formAction] = useFormState(signInAction, {});

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
                <BasicAlert icon="error" title={state.errors?.email.message} />
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
                <BasicAlert
                  icon="error"
                  title={state.errors.password.message}
                />
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
