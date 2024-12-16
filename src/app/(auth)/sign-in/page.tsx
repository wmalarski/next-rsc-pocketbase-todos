import { flex } from "@/styled-system/patterns";
import { ProviderSignInForm } from "../../../modules/auth/provider-sign-in-form";
import { SignInForm } from "../../../modules/auth/sign-in-form";

export default function SignInPage() {
	return (
		<div
			className={flex({
				justifyContent: "center",
				py: "16",
				flexDirection: "column",
				alignItems: "center",
				gap: "4",
				// md: {
				// 	alignItems: "unset",
				// 	flexDirection: "row",
				// },
			})}
		>
			<SignInForm />
			<ProviderSignInForm />
		</div>
	);
}
