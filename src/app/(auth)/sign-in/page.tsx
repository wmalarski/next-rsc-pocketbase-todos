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
import { Stack } from "@/styled-system/jsx";
import { container } from "@/styled-system/patterns";
import { email, object, string } from "valibot";

async function signIn(formData: FormData) {
  "use server";

  object({
    email: string([email()]),
    password: string(),
  });

  console.log("Server function", formData);
}

const SignInForm = () => {
  return (
    <Card width="sm" asChild>
      <form action={signIn}>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in using email and password</CardDescription>
        </CardHeader>
        <CardBody>
          <Stack gap="4">
            <Stack gap="1.5">
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" placeholder="Email" />
            </Stack>
            <Stack gap="1.5">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </Stack>
          </Stack>
        </CardBody>
        <CardFooter gap="3">
          <Button>Sign In</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default function SignInPage() {
  return (
    <div
      className={container({
        justifyContent: "center",
        display: "flex",
        py: "16",
      })}
    >
      <SignInForm />
    </div>
  );
}
