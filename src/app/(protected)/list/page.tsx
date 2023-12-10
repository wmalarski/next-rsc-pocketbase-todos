import { createServerClient } from "@/server/pocketBase";
import { listTodos } from "@/server/todos";
import { cookies } from "next/headers";

export default async function ListPage() {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  const todos = await listTodos({ page: 0 });

  return (
    <div>
      <pre>{JSON.stringify({ user: pb.authStore.model, todos }, null, 2)}</pre>
    </div>
  );
}
