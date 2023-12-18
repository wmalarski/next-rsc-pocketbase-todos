"use client"; // Error components must be Client Components

import { Spinner } from "@/components/Spinner/Spinner";
import { flex } from "@/styled-system/patterns";

export default function Loading() {
  return (
    <div
      className={flex({
        gap: 4,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      })}
    >
      <Spinner />
    </div>
  );
}
