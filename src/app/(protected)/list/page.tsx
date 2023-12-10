import { createServerClient } from "@/server/pocketBase";
import { listTodos } from "@/server/todos";
import { container } from "@/styled-system/patterns";
import { cookies } from "next/headers";
import { CreateTodoForm } from "./CreateTodoForm";
import { ListCard } from "./ListCard";

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
        <pre>
          {JSON.stringify({ user: pb.authStore.model, todos }, null, 2)}
        </pre>
      </ListCard>
    </div>
  );
}
