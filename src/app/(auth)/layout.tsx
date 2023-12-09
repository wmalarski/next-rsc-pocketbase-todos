import type { ReactNode } from "react";
import { Footer } from "../Footer/Footer";
import { AnonHeader } from "./AnonHeader/AnonHeader";

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
