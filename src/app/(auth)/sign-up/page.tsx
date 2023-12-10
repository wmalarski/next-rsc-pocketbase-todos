import { container } from "@/styled-system/patterns";
import { SignUpForm } from "./SignUpForm";

export default function SignUpPage() {
  return (
    <div
      className={container({
        justifyContent: "center",
        display: "flex",
        py: "16",
      })}
    >
      <SignUpForm />
    </div>
  );
}
