import { Link } from "@/components/Link/Link";
import { flex } from "@/styled-system/patterns";
import { paths } from "@/utils/paths";
import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { SignOutForm } from "./SignOutForm";

const ProtectedHeader = () => {
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
