import { ArrowIcon } from "./ArrowIcon";

type CtaBandProps = {
  meta: string;
  title: string;
  text: string;
  label: string;
  onClick: () => void;
};

/** Royal-blue closing band with a single request button. */
export function CtaBand({ meta, title, text, label, onClick }: CtaBandProps) {
  return (
    <section className="section svx-why">
      <div className="wrap svx-why__grid">
        <div className="svx-why__intro">
          <p className="svx-meta">{meta}</p>
          <h2 className="svx-why__title">{title}</h2>
        </div>
        <div>
          <p className="svx-why__text">{text}</p>
          <button type="button" onClick={onClick} className="svx-why__btn">
            {label}
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
