import { Link } from "@/components/Link/Link";
import { paths } from "@/lib/paths";

export const ProtectedHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href={paths.home}>Home</Link>
          </li>
          <li>
            <Link href={paths.list()}>Todo list</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
