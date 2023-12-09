import { Link } from "@/components/Link/Link";
import { paths } from "@/lib/paths";

export const AnonHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href={paths.home}>Home</Link>
          </li>
          <li>
            <Link href={paths.signIn}>Sign In</Link>
          </li>
          <li>
            <Link href={paths.signUp}>Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
