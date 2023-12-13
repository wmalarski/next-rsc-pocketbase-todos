"use client";
import { TodoModel } from "@/server/todos";
import { flex } from "@/styled-system/patterns";
import { useState } from "react";
import { DeleteTodoForm } from "./DeleteTodoForm";
import { IsFinishedCheckbox } from "./IsFinishedCheckbox";
import { UpdateTodoForm } from "./UpdateTodoForm";

type TodoListItemProps = {
  todo: TodoModel;
};

export const TodoListItem = ({ todo }: TodoListItemProps) => {
  const [isFinished, setIsFinished] = useState(todo.isFinished);

  return (
    <li className={flex({ gap: 3, alignItems: "center" })}>
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
      <DeleteTodoForm id={todo.id} />
    </li>
  );
};
