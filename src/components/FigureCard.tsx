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
      {tag ? <p className="tag mt-4">{tag}</p> : null}
      <h3 className={`${tag ? "mt-2" : "mt-4"} text-[1.05rem] font-semibold leading-snug`}>{title}</h3>
      {text ? <p className="mt-2 line-clamp-2 text-[0.82rem] leading-6 text-muted">{text}</p> : null}
      {meta ? <p className="mt-2 text-[0.72rem] text-muted">{meta}</p> : null}
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
