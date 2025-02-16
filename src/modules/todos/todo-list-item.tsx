"use client";
import { type TodoModel, deleteTodo } from "@/server/todos";
import { css } from "@/styled-system/css";
import { Spinner } from "@/ui/spinner";
import {
	type PropsWithChildren,
	useActionState,
	useOptimistic,
	useState,
} from "react";
import { DeleteTodoForm } from "./delete-todo-form";
import { IsFinishedCheckbox } from "./is-finished-checkbox";
import { UpdateTodoForm } from "./update-todo-form";

type TodoListItemProps = {
	todo: TodoModel;
};

export const TodoListItem = ({ todo }: TodoListItemProps) => {
	const [isFinished, setIsFinished] = useState(todo.isFinished);

	const [_deleteState, deleteTodoAction] = useActionState(deleteTodo, {
		success: false,
	});

	const [shouldHide, optimisticHideTodo] = useOptimistic(false, () => true);

	const onDeleteSubmit = async (formData: FormData) => {
		optimisticHideTodo({});
		deleteTodoAction(formData);
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
			<DeleteTodoForm id={todo.id} onSubmit={onDeleteSubmit} />
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
