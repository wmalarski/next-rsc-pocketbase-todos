import { Button } from "@/components/Button/Button";
import { css } from "@/styled-system/css";

export default function Home() {
  return (
    <main>
      <div>
        <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>
          Hello 🐼!
        </div>
        <Button>Click me</Button>
      </div>
    </main>
  );
}
