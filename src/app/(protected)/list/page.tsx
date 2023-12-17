import { listTodos } from "@/server/todos";
import { container, flex } from "@/styled-system/patterns";
import { coerce, number, object, optional, parseAsync } from "valibot";
import { CreateTodoForm } from "./CreateTodoForm";
import { ListCard } from "./ListCard";
import { ListPagination } from "./ListPagination";
import { TodoListItem } from "./TodoListItem";

export default async function ListPage(props: any) {
  const schema = object({
    searchParams: object({ page: coerce(optional(number(), 1), Number) }),
  });

  console.log({ props });

  const parsed = await parseAsync(schema, props);

  const todos = await listTodos({ page: parsed.searchParams.page });

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
        <ul className={flex({ direction: "column", gap: 1 })}>
          {todos.items.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
        <ListPagination
          page={parsed.searchParams.page}
          pageSize={todos.perPage}
          totalItems={todos.totalItems}
        />
      </ListCard>
    </div>
  );
}
