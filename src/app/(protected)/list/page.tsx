import { CreateTodoForm } from "@/modules/todos/create-todo-form";
import { ListCard } from "@/modules/todos/list-card";
import { ListPagination } from "@/modules/todos/list-pagination";
import { TodoListItem } from "@/modules/todos/todo-list-item";
import { listTodos } from "@/server/todos";
import { container, flex } from "@/styled-system/patterns";
import * as v from "valibot";

type TodoListProps = {
	page: number;
};

const TodoList = async ({ page }: TodoListProps) => {
	const todos = await listTodos({ page });

	return (
		<>
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function ListPage(props: any) {
	const schema = v.object({
		searchParams: v.object({ page: v.pipe(v.unknown(), v.transform(Number)) }),
	});

	const parsed = await v.parseAsync(schema, props);

	return (
		<div
			className={container({
				justifyContent: "center",
				display: "flex",
				py: "16",
			})}
		>
			<ListCard>
				<CreateTodoForm />
				<TodoList page={parsed.searchParams.page} />
			</ListCard>
		</div>
	);
}
