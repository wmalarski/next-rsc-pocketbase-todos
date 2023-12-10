import { container } from "@/styled-system/patterns";
import { SignInForm } from "./SignInForm";

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
