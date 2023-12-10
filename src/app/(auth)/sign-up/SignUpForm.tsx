"use client";
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
import { signUpAction } from "@/server/auth";
import { Stack } from "@/styled-system/jsx";
import { useFormState, useFormStatus } from "react-dom";

export const SignUpForm = () => {
  const { pending, action, data, method } = useFormStatus();

  const [state, formAction] = useFormState(signUpAction, { errors: [] });

  console.log({
    pending,
    action,
    data,
    method,
    state,
    isAction: action === formAction,
  });

  return (
    <Card width="sm" asChild>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up using email and password</CardDescription>
        </CardHeader>
        <CardBody>
          <Stack gap="4">
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
            </Stack>
          </Stack>
        </CardBody>
        <CardFooter gap="3">
          <Button disabled={pending}>Sign Up</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
