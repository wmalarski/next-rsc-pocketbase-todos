import { TodoModel, listTodos } from "@/server/todos";
import { container, flex } from "@/styled-system/patterns";
import { CreateTodoForm } from "./CreateTodoForm";
import { DeleteTodoForm } from "./DeleteTodoForm";
import { IsFinishedCheckbox } from "./IsFinishedCheckbox";
import { ListCard } from "./ListCard";
import { ListPagination } from "./ListPagination";
import { UpdateTodoForm } from "./UpdateTodoForm";

type TodoListItemProps = {
  todo: TodoModel;
};

const TodoListItem = ({ todo }: TodoListItemProps) => {
  return (
    <li className={flex({ gap: 3, alignItems: "center" })}>
      <IsFinishedCheckbox id={todo.id} defaultChecked={todo.isFinished} />
      <UpdateTodoForm id={todo.id} defaultText={todo.text} />
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
        <ul className={flex({ direction: "column", gap: 1 })}>
          {todos.items.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
        <ListPagination
          pageSize={todos.perPage}
          totalItems={todos.totalItems}
        />
      </ListCard>
    </div>
  );
}
