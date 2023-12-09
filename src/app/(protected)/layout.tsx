import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { ProtectedHeader } from "./ProtectedHeader/ProtectedHeader";

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
