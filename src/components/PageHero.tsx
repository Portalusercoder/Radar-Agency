import type { ReactNode } from "react";
import { Kicker } from "./Kicker";

export function PageHero({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink pt-32 pb-16 text-paper md:pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {kicker ? <Kicker light>{kicker}</Kicker> : null}
        <h1 className="display mt-4 max-w-4xl text-4xl md:text-6xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-xl text-lg text-paper/60">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
