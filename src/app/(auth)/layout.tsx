import { Link } from "@/components/Link/Link";
import { paths } from "@/lib/paths";
import { flex } from "@/styled-system/patterns";
import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";

const AnonHeader = () => {
  return (
    <header>
      <nav>
        <ul className={flex({ gap: "2" })}>
          <li>
            <Link href={paths.home} variant="link">
              Home
            </Link>
          </li>
          <li>
            <Link href={paths.signIn} variant="link">
              Sign In
            </Link>
          </li>
          <li>
            <Link href={paths.signUp} variant="link">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <AnonHeader />
      {children}
      <Footer />
    </main>
  );
}
