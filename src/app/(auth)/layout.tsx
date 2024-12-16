import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Link } from "@/ui/link";
import { paths } from "@/utils/paths";
import type { ReactNode } from "react";
import { Footer } from "../../modules/common/footer";

const AnonHeader = () => {
	return (
		<header>
			<nav className={css({ padding: "2" })}>
				<ul className={flex({ gap: "2" })}>
					<li>
						<Link href={paths.home}>Home</Link>
					</li>
					<li>
						<Link href={paths.signIn}>Sign In</Link>
					</li>
					<li>
						<Link href={paths.signUp}>Sign Up</Link>
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
