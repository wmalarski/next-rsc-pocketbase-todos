"use client";
import {
	Card,
	CardBody,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/card/card";
import { Stack } from "@/styled-system/jsx";
import type { ReactNode } from "react";

type ListCardProps = {
	children: ReactNode;
};

export const ListCard = ({ children }: ListCardProps) => {
	return (
		<Card width="2xl">
			<CardHeader>
				<CardTitle>Todo List</CardTitle>
				<CardDescription>Create, update and remove todos</CardDescription>
			</CardHeader>
			<CardBody>
				<Stack gap="4">{children}</Stack>
			</CardBody>
		</Card>
	);
};
