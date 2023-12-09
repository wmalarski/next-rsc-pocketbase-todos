import { paths } from "@/lib/paths";
import Link from "next/link";

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
