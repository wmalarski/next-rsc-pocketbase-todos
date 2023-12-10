import { createServerClient } from "@/server/pocketBase";
import { cookies } from "next/headers";

export default function ListPage() {
  const cookiesStore = cookies();
  const pb = createServerClient(cookiesStore);

  console.log(pb.authStore);

  return (
    <div>
      <pre>{JSON.stringify(pb.authStore.model, null, 2)}</pre>
    </div>
  );
}
