import { ListCard } from "@/modules/todos/list-card";
import { TodoList } from "@/modules/todos/todo-list";
import { listTodos } from "@/server/todos";
import { container } from "@/styled-system/patterns";
import type { AppPageProps } from "@/utils/types";
import * as v from "valibot";

export default async function ListPage(props: AppPageProps) {
	const schema = v.object({
		page: v.optional(v.pipe(v.unknown(), v.transform(Number)), 0),
	});

	const parsed = await v.parseAsync(schema, await props.searchParams);
	const todos = await listTodos({ page: parsed.page });

	return (
		<div
			className={container({
				justifyContent: "center",
				display: "flex",
				py: "16",
			})}
		>
			<ListCard>
				<TodoList todos={todos} page={parsed.page} />
			</ListCard>
		</div>
	);
}
