import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Tone = "light" | "coral" | "dark" | "night";

export function NumBtn({
  n,
  children,
  to,
  onClick,
  tone = "light",
  className = "",
}: {
  n: string;
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
  tone?: Tone;
  className?: string;
}) {
  const cls = `num-btn num-btn--${tone} ${children ? "" : "num-btn--solo"} ${className}`.trim();
  const inner = (
    <>
      {children ? <span className="num-btn__label">{children}</span> : null}
      <span className="num-btn__n" aria-hidden>
        {n}
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
