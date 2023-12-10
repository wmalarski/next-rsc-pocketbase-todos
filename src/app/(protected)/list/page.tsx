import { createServerClient } from "@/server/pocketBase";
import { TodoModel, listTodos } from "@/server/todos";
import { container } from "@/styled-system/patterns";
import { cookies } from "next/headers";
import { CreateTodoForm } from "./CreateTodoForm";
import { ListCard } from "./ListCard";

type TodoListItemProps = {
  todo: TodoModel;
};

const TodoListItem = ({ todo }: TodoListItemProps) => {
  return <li>{JSON.stringify({ todo }, null, 2)}</li>;
};

export default async function ListPage() {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  const todos = await listTodos({ page: 0 });

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
        <ul>
          {todos.items.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </ListCard>
    </div>
  );
}
