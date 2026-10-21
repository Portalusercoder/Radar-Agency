import type { ReactNode } from "react";

export function Kicker({
  children,
  tone,
}: {
  children: ReactNode;
  tone?: "corn" | "ink" | "accent";
}) {
  return <p className={`kicker${tone ? ` kicker--${tone}` : ""}`}>{children}</p>;
}
