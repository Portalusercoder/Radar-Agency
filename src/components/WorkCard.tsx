import { Link } from "react-router-dom";
import { ArrowIcon } from "./ArrowIcon";
import { Reveal } from "./Reveal";

type WorkCardProps = {
  to: string;
  img: string;
  tag: string;
  name: string;
  sub: string;
  text: string;
  delay?: number;
};

/** Photo card used by the Work and Blog grids. */
export function WorkCard({ to, img, tag, name, sub, text, delay = 0 }: WorkCardProps) {
  return (
    <Reveal delay={delay}>
      <Link to={to} className="wk-card">
        <span className="wk-card__shot">
          <img src={img} alt="" loading="lazy" decoding="async" />
          <span className="wk-card__tag">{tag}</span>
          <span className="wk-card__arrow" aria-hidden>
            <ArrowIcon />
          </span>
        </span>
        <span className="wk-card__meta">
          <span className="wk-card__name">{name}</span>
          <span className="wk-card__sub">{sub}</span>
          <span className="wk-card__text">{text}</span>
        </span>
      </Link>
    </Reveal>
  );
}
