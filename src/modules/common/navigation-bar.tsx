import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { Link } from "@/ui/link";
import { paths } from "@/utils/paths";

export const NavigationBar = () => {
	return (
		<nav className={css({ padding: 4 })}>
			<ul className={flex({ gap: 4 })}>
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
	);
};
