import { flex } from "@/styled-system/patterns";
import { Spinner } from "@/ui/spinner";

export default function Loading() {
	return (
		<div
			className={flex({
				gap: 4,
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: 4,
			})}
		>
			<Spinner />
		</div>
	);
}
