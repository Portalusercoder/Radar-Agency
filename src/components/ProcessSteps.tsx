import { useState } from "react";
import { ui } from "../copy";
import { useI18n } from "../i18n";

const icons = [
  "M10.5 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm4.2-1.8 4.3 4.3",
  "M5 7h14M5 12h14M5 17h9",
  "M6 6.5v11l12-5.5L6 6.5Z",
  "M5 16.5 10.2 11l3.2 3.2L19 8.5M14.5 8.5H19V13",
];

export function ProcessSteps() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const last = ui.steps.length - 1;

  const go = (index: number) => setActive(Math.max(0, Math.min(last, index)));

  return (
    <div className="process">
      <div className="process-head">
        <h2 className="display process-title">
          {t(ui.home.processKicker)}
          <span> ({t(ui.home.processAside)})</span>
        </h2>
        <div className="process-arrows">
          <button
            type="button"
            className="process-arrow"
            aria-label={t(ui.home.processPrev)}
            disabled={active <= 0}
            onClick={() => go(active - 1)}
          >
            <span aria-hidden className="rtl:rotate-180">
              ←
            </span>
          </button>
          <button
            type="button"
            className="process-arrow is-next"
            aria-label={t(ui.home.processNext)}
            disabled={active >= last}
            onClick={() => go(active + 1)}
          >
            <span aria-hidden className="rtl:rotate-180">
              →
            </span>
          </button>
        </div>
      </div>

      <div className="process-stage">
        <div className="process-track" style={{ ["--step" as string]: String(active) }}>
          {ui.steps.map((step, index) => (
            <article key={step.title.en} className={`process-card ${index === active ? "is-on" : ""}`}>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
              <span className="process-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path d={icons[index]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>

      <div className="process-ruler">
        <div className="process-dots">
          {ui.steps.map((step, index) => (
            <button
              key={step.title.en}
              type="button"
              className={`process-dot ${index === active ? "is-on" : ""}`}
              style={index === active ? { marginInlineEnd: "auto" } : undefined}
              aria-current={index === active ? "step" : undefined}
              aria-label={`${index + 1}. ${t(step.title)}`}
              onClick={() => go(index)}
            >
              <span dir="ltr">{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
