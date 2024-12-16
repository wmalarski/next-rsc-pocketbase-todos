import { flex } from "@/styled-system/patterns";
import { ProviderSignInForm } from "../../../modules/auth/ProviderSignInForm";
import { SignInForm } from "../../../modules/auth/SignInForm";

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
