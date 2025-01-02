"use client";
import type { TodoModel } from "@/server/todos";
import { css } from "@/styled-system/css";
import { Spinner } from "@/ui/spinner";
import { type PropsWithChildren, useState } from "react";
import { DeleteTodoForm } from "./delete-todo-form";
import { IsFinishedCheckbox } from "./is-finished-checkbox";
import { UpdateTodoForm } from "./update-todo-form";

type TodoListItemProps = {
	todo: TodoModel;
};

export const TodoListItem = ({ todo }: TodoListItemProps) => {
	const [isFinished, setIsFinished] = useState(todo.isFinished);

	const [shouldHide, setShouldHide] = useState(false);

	const onDeleteSubmit = () => {
		setShouldHide(true);
	};

	const onDeleteFailure = () => {
		setShouldHide(false);
	};

	return (
		<TodoListItemContainer isHidden={shouldHide}>
			<IsFinishedCheckbox
				id={todo.id}
				isFinished={isFinished}
				onIsFinishedChange={setIsFinished}
			/>
			<UpdateTodoForm
				id={todo.id}
				initialText={todo.text}
				isFinished={isFinished}
			/>
			<DeleteTodoForm
				id={todo.id}
				onFailure={onDeleteFailure}
				onSubmit={onDeleteSubmit}
			/>
		</TodoListItemContainer>
	);
};

type TodoListItemPlaceholderProps = {
	text: string;
};

export const TodoListItemPlaceholder = ({
	text,
}: TodoListItemPlaceholderProps) => {
	return (
		<TodoListItemContainer>
			<Spinner />
			{text}
		</TodoListItemContainer>
	);
};

type TodoListItemContainerProps = PropsWithChildren<{
	isHidden?: boolean;
}>;

const TodoListItemContainer = ({
	children,
	isHidden,
}: TodoListItemContainerProps) => {
	return (
		<li
			className={css({
				gap: 3,
				alignItems: "center",
				minH: 14,
				display: isHidden ? "none" : "flex",
			})}
		>
			{children}
		</li>
	);
};
