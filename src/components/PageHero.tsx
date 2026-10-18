import type { ReactNode } from "react";

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
    <section className="relative z-[1] pb-10 pt-28 md:pb-14 md:pt-36">
      <div className="wrap">
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <h1 className="display mt-4 max-w-4xl text-[clamp(2.4rem,5.5vw,4.8rem)]">{title}</h1>
        {lead ? <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
