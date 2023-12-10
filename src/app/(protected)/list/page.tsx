import { TodoModel, listTodos } from "@/server/todos";
import { container } from "@/styled-system/patterns";
import { CreateTodoForm } from "./CreateTodoForm";
import { DeleteTodoForm } from "./DeleteTodoForm";
import { ListCard } from "./ListCard";
import { UpdateTodoForm } from "./UpdateTodoForm";

type TodoListItemProps = {
  todo: TodoModel;
};

const TodoListItem = ({ todo }: TodoListItemProps) => {
  return (
    <li>
      <UpdateTodoForm id={todo.id} text={todo.text} />
      <DeleteTodoForm id={todo.id} />
    </li>
  );
};

export default async function ListPage() {
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
