import { flex } from "@/styled-system/patterns";
import { ProviderSignInForm } from "./ProviderSignInForm";
import { SignInForm } from "./SignInForm";

export default function SignInPage() {
	return (
		<div
			className={flex({
				justifyContent: "center",
				py: "16",
				flexDirection: "column",
				alignItems: "center",
				gap: "4",
				md: {
					alignItems: "unset",
					flexDirection: "row",
				},
			})}
		>
			<SignInForm />
			<ProviderSignInForm />
		</div>
	);
}
