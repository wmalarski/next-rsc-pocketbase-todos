import { Link } from "@/components/Link/Link";
import { paths } from "@/lib/paths";
import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";

const ProtectedHeader = () => {
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
