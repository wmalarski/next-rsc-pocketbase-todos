import { NavigationBar } from "@/modules/common/navigation-bar";
import type { ReactNode } from "react";
import { Footer } from "../../modules/common/footer";

const AnonHeader = () => {
	return (
		<header>
			<NavigationBar />
		</header>
	);
};

type AuthLayoutProps = {
	children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<main>
			<AnonHeader />
			{children}
			<Footer />
		</main>
	);
}
