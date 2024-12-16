import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Link } from "@/ui/link";
import { paths } from "@/utils/paths";
import type { ReactNode } from "react";
import { SignOutForm } from "../../modules/auth/sign-out-form";
import { Footer } from "../../modules/common/footer";

const ProtectedHeader = () => {
	return (
		<header>
			<nav className={css({ padding: "2" })}>
				<ul className={flex({ gap: "2" })}>
					<li>
						<Link href={paths.home}>Home</Link>
					</li>
					<li className={css({ flexGrow: 1 })}>
						<Link href={paths.list()}>Todo list</Link>
					</li>
					<li>
						<SignOutForm />
					</li>
				</ul>
			</nav>
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
