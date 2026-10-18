import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function FigureCard({
  to,
  img,
  tag,
  title,
  text,
  meta,
}: {
  to?: string;
  img: string;
  tag?: string;
  title: string;
  text?: string;
  meta?: ReactNode;
}) {
  const inner = (
    <>
      <div className="shot aspect-[5/4]">
        <img src={img} alt="" loading="lazy" />
        {to ? (
          <span className="figure-go" aria-hidden>
            ↗
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 text-[1.05rem] font-semibold leading-snug">{title}</h3>
      {text ? <p className="mt-2 line-clamp-2 text-[0.82rem] leading-6 text-muted">{text}</p> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {tag ? <span className="tag">{tag}</span> : null}
        {meta ? <span className="text-[0.72rem] text-muted">{meta}</span> : null}
      </div>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="group block text-night no-underline">
        {inner}
      </Link>
    );
  }

  return <article className="group">{inner}</article>;
}
