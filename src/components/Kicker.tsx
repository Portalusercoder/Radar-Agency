import type { ReactNode } from "react";

export function Kicker({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`kicker ${light ? "text-paper/65" : "text-ink/50"}`}>{children}</p>
  );
}
