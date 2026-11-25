import { useEffect, useRef, useState } from "react";
import { ui } from "../copy";
import { useI18n } from "../i18n";

const icons = [
  "M10.5 16.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm4.2-1.8 4.3 4.3",
  "M5 7h14M5 12h14M5 17h9",
  "M6 6.5v11l12-5.5L6 6.5Z",
  "M5 16.5 10.2 11l3.2 3.2L19 8.5M14.5 8.5H19V13",
];

export function ProcessSteps() {
  const { t, isAr } = useI18n();
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const nodes = [...list.querySelectorAll<HTMLElement>(".ptl-node")];
      if (nodes.length < 2) return;

      const listTop = list.getBoundingClientRect().top;
      const centers = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });

      const first = centers[0];
      const last = centers[centers.length - 1];
      const total = last - first;
      const trigger = window.innerHeight * 0.58;
      const fill = Math.max(0, Math.min(total, trigger - first));

      list.style.setProperty("--ptl-top", `${first - listTop}px`);
      list.style.setProperty("--ptl-h", `${total}px`);
      list.style.setProperty("--ptl-fill", `${fill}px`);

      let next = 0;
      centers.forEach((center, index) => {
        if (center <= trigger + 1) next = index;
      });
      setActive((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    void document.fonts?.ready.then(schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="ptl journal">
      <div className="journal-head">
        <p className="journal-meta">{t(ui.home.processMeta)}</p>
        <h2 className="journal-display">
          {isAr ? (
            <>
              <span className="journal-display__line">{t(ui.home.processKicker)}</span>
              <span className="journal-display__line journal-display__line--indent">
                {t(ui.home.processAside)}
              </span>
            </>
          ) : (
            <>
              <span className="journal-display__line">
                <em>O</em>ur process
              </span>
              <span className="journal-display__line journal-display__line--indent">
                <em>S</em>tep-by-step
              </span>
            </>
          )}
        </h2>
      </div>

      <ol className="ptl-list" ref={listRef}>
        <span className="ptl-track" aria-hidden>
          <span className="ptl-fill" />
        </span>

        {ui.steps.map((step, index) => {
          const flip = index % 2 === 1;
          const number = String(index + 1).padStart(2, "0");

          const media = (
            <div className={`ptl-media ${flip ? "is-end" : "is-start"}`} aria-hidden>
              <span className="ptl-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                  <path
                    d={icons[index]}
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="ptl-num" dir="ltr">
                {number}
              </span>
            </div>
          );

          const copy = (
            <div className="ptl-copy">
              <span className="ptl-eyebrow" dir="ltr">
                {number}
              </span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </div>
          );

          return (
            <li
              key={step.title.en}
              className={`ptl-step${index <= active ? " is-on" : ""}${index === active ? " is-current" : ""}`}
              aria-current={index === active ? "step" : undefined}
            >
              <div className="ptl-side ptl-side--a">{flip ? copy : media}</div>
              <span className="ptl-node" aria-hidden>
                <span className="ptl-node__dot" />
              </span>
              <div className="ptl-side ptl-side--b">{flip ? media : copy}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
