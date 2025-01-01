import { NavigationBar } from "@/modules/common/navigation-bar";
import { grid } from "@/styled-system/patterns";
import type { ReactNode } from "react";
import { SignOutForm } from "../../modules/auth/sign-out-form";
import { Footer } from "../../modules/common/footer";

const ProtectedHeader = () => {
	return (
		<header className={grid({ gridTemplateColumns: "1fr auto" })}>
			<NavigationBar />
			<SignOutForm />
		</header>
	);
};

type AuthLayoutProps = {
	children: ReactNode;
};

export default function ProtectedLayout({ children }: AuthLayoutProps) {
	return (
		<main>
			<ProtectedHeader />
			{children}
			<Footer />
		</main>
	);
}
