import { useEffect, useState } from "react";
import { ui } from "../copy";
import { PORTFOLIO } from "../data";
import { useI18n } from "../i18n";
import { FigureCard } from "./FigureCard";

function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const update = () => setPerView(desktop.matches ? 3 : 1);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  return perView;
}

export function WorkCarousel() {
  const { t } = useI18n();
  const perView = usePerView();
  const maxIndex = Math.max(0, PORTFOLIO.length - perView);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const page = Math.floor(index / perView);
  const pages = Math.ceil(PORTFOLIO.length / perView);
  const visible = PORTFOLIO.slice(index, index + perView);

  return (
    <div>
      <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
        {visible.map((item) => (
          <FigureCard
            key={item.id}
            to={item.to}
            img={item.img}
            tag={t(ui.work[item.category])}
            title={t(item.title)}
            text={t(item.text)}
            meta={t(item.city)}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="arrow-btn"
            aria-label={t(ui.home.prevWork)}
            disabled={index <= 0}
            onClick={() => setIndex((current) => Math.max(0, current - perView))}
          >
            <span aria-hidden className="rtl:rotate-180">
              ←
            </span>
          </button>
          <button
            type="button"
            className="arrow-btn"
            aria-label={t(ui.home.nextWork)}
            disabled={index >= maxIndex}
            onClick={() => setIndex((current) => Math.min(maxIndex, current + perView))}
          >
            <span aria-hidden className="rtl:rotate-180">
              →
            </span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4" dir="ltr">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`page-link ${page === i ? "is-on" : ""}`}
              aria-current={page === i ? "true" : undefined}
              onClick={() => setIndex(Math.min(maxIndex, i * perView))}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
