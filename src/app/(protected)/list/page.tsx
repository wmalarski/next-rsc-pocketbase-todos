import { listTodos } from "@/server/todos";
import { container, flex } from "@/styled-system/patterns";
import { coerce, number, object, optional, parseAsync } from "valibot";
import { CreateTodoForm } from "./CreateTodoForm";
import { ListCard } from "./ListCard";
import { ListPagination } from "./ListPagination";
import { TodoListItem } from "./TodoListItem";

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

export default async function ListPage(props: any) {
	const schema = object({
		searchParams: object({ page: optional(coerce(number(), Number), 1) }),
	});

	const parsed = await parseAsync(schema, props);

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
