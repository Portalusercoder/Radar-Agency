import { useState } from "react";
import { Link } from "react-router-dom";
import { ui } from "../copy";
import { PROOFS } from "../data";
import { useI18n } from "../i18n";

export function ProofSlider() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const item = PROOFS[index];

  return (
    <div>
      <article className="grid gap-10 border-t border-line pt-8 lg:grid-cols-[auto_1fr] lg:items-start">
        <p className="display text-[clamp(3.2rem,8vw,6.5rem)] leading-none" dir="ltr">
          {t(item.metric)}
        </p>
        <div className="max-w-2xl">
          <p className="text-sm text-muted">{t(item.metricLabel)}</p>
          <p className="mt-4 text-lg leading-8 text-night md:text-xl">{t(item.text)}</p>
          <p className="mt-6 font-semibold">{t(item.name)}</p>
          <p className="text-sm text-muted">{t(item.role)}</p>
          <Link to={item.to} className="mt-5 inline-flex text-sm font-semibold text-night no-underline hover:text-accent">
            {t(ui.home.readCase)}
          </Link>
        </div>
      </article>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="arrow-btn"
            aria-label={t(ui.home.prevWork)}
            disabled={index <= 0}
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
          >
            <span aria-hidden className="rtl:rotate-180">
              ←
            </span>
          </button>
          <button
            type="button"
            className="arrow-btn"
            aria-label={t(ui.home.nextWork)}
            disabled={index >= PROOFS.length - 1}
            onClick={() => setIndex((current) => Math.min(PROOFS.length - 1, current + 1))}
          >
            <span aria-hidden className="rtl:rotate-180">
              →
            </span>
          </button>
        </div>
        <div className="flex items-center gap-4" dir="ltr">
          {PROOFS.map((proof, i) => (
            <button
              key={proof.id}
              type="button"
              className={`page-link ${index === i ? "is-on" : ""}`}
              aria-current={index === i ? "true" : undefined}
              onClick={() => setIndex(i)}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
