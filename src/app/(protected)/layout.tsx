import { Link } from "@/components/Link/Link";
import { css } from "@/styled-system/css";
import { flex } from "@/styled-system/patterns";
import { paths } from "@/utils/paths";
import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { SignOutForm } from "./SignOutForm";

const ProtectedHeader = () => {
  return (
    <header>
      <nav className={css({ padding: "2" })}>
        <ul className={flex({ gap: "2" })}>
          <li>
            <Link href={paths.home} variant="link">
              Home
            </Link>
          </li>
          <li className={css({ flexGrow: 1 })}>
            <Link href={paths.list()} variant="link">
              Todo list
            </Link>
          </li>
          <li>
            <SignOutForm />
          </li>
        </ul>
      </nav>
    </header>
  );
};

type AuthLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <ProtectedHeader />
      {children}
      <Footer />
    </main>
  );
}
