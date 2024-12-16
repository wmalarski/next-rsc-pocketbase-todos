import { Link } from "@/components/link/link";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { paths } from "@/utils/paths";
import type { ReactNode } from "react";
import { Footer } from "../../modules/common/footer";

const AnonHeader = () => {
	return (
		<header>
			<nav className={css({ padding: "2" })}>
				<ul className={flex({ gap: "2" })}>
					<li>
						<Link href={paths.home} variant="link">
							Home
						</Link>
					</li>
					<li>
						<Link href={paths.signIn} variant="link">
							Sign In
						</Link>
					</li>
					<li>
						<Link href={paths.signUp} variant="link">
							Sign Up
						</Link>
					</li>
				</ul>
			</nav>
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
