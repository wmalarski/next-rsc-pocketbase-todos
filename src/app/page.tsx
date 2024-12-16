import { Button } from "@/components/button/button";
import { Link } from "@/components/link/link";
import { css } from "@/styled-system/css";
import { paths } from "@/utils/paths";
import { Footer } from "../modules/common/footer";

export default function Home() {
	return (
		<main>
			<div>
				<div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
					Hello 🐼!
				</div>
				<Button>Click me</Button>
				<Link href={paths.signIn}>Sign In</Link>
				<Link href={paths.signUp}>Sign Up</Link>
				<Link href={paths.list()}>Todo list</Link>
			</div>
			<Footer />
		</main>
	);
}
