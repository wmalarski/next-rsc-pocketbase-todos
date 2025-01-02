"use client";

import { CreateTodoForm } from "@/modules/todos/create-todo-form";
import { ListPagination } from "@/modules/todos/list-pagination";
import { TodoListItem } from "@/modules/todos/todo-list-item";
import { createTodo, type TodoModel } from "@/server/todos";
import { flex } from "@/styled-system/patterns";
import type { ListResult } from "pocketbase";
import { useActionState } from "react";

type TodoListProps = {
	page: number;
	todos: ListResult<TodoModel>;
};

export const TodoList = ({ page, todos }: TodoListProps) => {
	const [createTodoActionState, createTodoAction] = useActionState(createTodo, {
		success: false,
	});

	console.log("state", createTodoActionState);

	const onCreate = async (form: FormData) => {
		console.log("onCreate", Object.fromEntries(form.entries()));
		createTodoAction(form);
	};

	return (
		<>
			<CreateTodoForm actionState={createTodoActionState} onCreate={onCreate} />
			<ul className={flex({ direction: "column", gap: 1 })}>
				{todos.items.map((todo) => (
					<TodoListItem todo={todo} key={todo.id} />
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
