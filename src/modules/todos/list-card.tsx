"use client";
import { Stack } from "@/styled-system/jsx";
import { Card } from "@/ui/card";
import type { ReactNode } from "react";

type ListCardProps = {
	children: ReactNode;
};

export const ListCard = ({ children }: ListCardProps) => {
	return (
		<Card.Root width="2xl">
			<Card.Header>
				<Card.Title>Todo List</Card.Title>
				<Card.Description>Create, update and remove todos</Card.Description>
			</Card.Header>
			<Card.Body>
				<Stack gap="4">{children}</Stack>
			</Card.Body>
		</Card.Root>
	);
};
