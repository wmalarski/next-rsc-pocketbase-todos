"use client"; // Error components must be Client Components

import { flex } from "@/styled-system/patterns";
import { Button } from "@/ui/button";
import { Heading } from "@/ui/heading";
import { useEffect } from "react";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	const onReloadClick = () => {
		reset();
	};

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
			<Heading as="h2">Something went wrong!</Heading>
			<Button onClick={onReloadClick}>Try again</Button>
		</div>
	);
}
