import { Footer } from "@/modules/common/footer";
import { NavigationBar } from "@/modules/common/navigation-bar";
import { flex } from "@/styled-system/patterns";

export default function HomePage() {
	return (
		<main>
			<header className={flex({ justifyContent: "center", pb: 4 })}>
				<NavigationBar />
			</header>
			<Footer />
		</main>
	);
}
