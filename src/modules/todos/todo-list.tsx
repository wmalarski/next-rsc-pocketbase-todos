"use client";

import { CreateTodoForm } from "@/modules/todos/create-todo-form";
import { ListPagination } from "@/modules/todos/list-pagination";
import {
	TodoListItem,
	TodoListItemPlaceholder,
} from "@/modules/todos/todo-list-item";
import { createTodo, type TodoModel } from "@/server/todos";
import { flex } from "@/styled-system/patterns";
import type { ListResult } from "pocketbase";
import { Fragment, useActionState, useOptimistic } from "react";

type TodoListProps = {
	page: number;
	todos: ListResult<TodoModel>;
};

export const TodoList = ({ page, todos }: TodoListProps) => {
	const [createTodoActionState, createTodoAction] = useActionState(createTodo, {
		success: false,
	});

	const items = todos.items.map((item) => ({ item, sending: false }));

	const [optimisticTodos, addOptimisticTodo] = useOptimistic(
		items,
		(state, newMessage: TodoModel) => [
			...state,
			{ item: newMessage, sending: true },
		],
	);

	const onCreate = async (form: FormData) => {
		addOptimisticTodo({
			collectionId: "",
			collectionName: "todos",
			created: "",
			id: "",
			isFinished: false,
			text: form.get("text") as string,
			updated: "",
			user: "",
		});
		createTodoAction(form);
	};

	return (
		<>
			<CreateTodoForm actionState={createTodoActionState} onCreate={onCreate} />
			<ul className={flex({ direction: "column", gap: 1 })}>
				{optimisticTodos.map(({ item, sending }) => (
					<Fragment key={item.id}>
						{sending ? (
							<TodoListItemPlaceholder text={item.text} />
						) : (
							<TodoListItem todo={item} />
						)}
					</Fragment>
				))}
			</ul>
			<ListPagination
				page={page}
				pageSize={todos.perPage}
				totalItems={todos.totalItems}
			/>
		</>
	);
};
