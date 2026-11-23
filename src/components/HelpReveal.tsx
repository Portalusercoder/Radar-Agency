import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ui } from "../copy";
import { useI18n } from "../i18n";

function segments(text: string, locale: string, granularity: "grapheme" | "word") {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(locale, { granularity }).segment(text)].map((part) => part.segment);
  }
  return granularity === "word" ? text.split(/(\s+)/).filter(Boolean) : Array.from(text);
}

function toUnits(text: string, locale: string) {
  return segments(text, locale, "word");
}

export function HelpReveal() {
  const { t, isAr } = useI18n();
  const pinRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const title = t(ui.home.helpTitle);
  const body1 = t(ui.home.helpBody1);
  const body2 = t(ui.home.helpBody2);

  const { titleUnits, body1Units, body2Units, total } = useMemo(() => {
    const locale = isAr ? "ar" : "en";
    const titleUnits = toUnits(title, locale);
    const body1Units = toUnits(body1, locale);
    const body2Units = toUnits(body2, locale);
    return {
      titleUnits,
      body1Units,
      body2Units,
      total: titleUnits.length + body1Units.length + body2Units.length,
    };
  }, [title, body1, body2, isAr]);

  useEffect(() => {
    const pin = pinRef.current;
    const board = boardRef.current;
    if (!pin || !board) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const travel = Math.min(2200, Math.max(1100, total * (isAr ? 48 : 36) + 320));
    pin.style.setProperty("--help-travel", `${travel}px`);
    board.style.setProperty("--n", String(Math.max(total + 1, 1)));
    board.style.setProperty("--wave", isAr ? "2" : "3");

    const apply = (progress: number) => {
      board.style.setProperty("--q", progress.toFixed(4));
    };

    if (reduce.matches) {
      apply(1);
      return;
    }

    apply(0);
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = pin.getBoundingClientRect();
      const chrome = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--chrome-h")) || 5.45;
      const chromePx = chrome * 16;
      const sticky = window.innerHeight - chromePx;
      const distance = Math.max(pin.offsetHeight - sticky, 1);
      const scrolled = Math.min(Math.max(chromePx - rect.top, 0), distance);
      apply(scrolled / distance);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, [total, isAr]);

  let index = 0;

  return (
    <section id="help" className="help-pin" ref={pinRef}>
      <div className="help-pin__sticky">
        <div className="help wrap" ref={boardRef}>
          <h2 className="help__title" aria-label={title}>
            <span aria-hidden>
              {titleUnits.map((value) => {
                const i = index++;
                return (
                  <span key={`t-${i}`} className="help__ch" style={{ ["--i" as string]: i }}>
                    {value}
                  </span>
                );
              })}
            </span>
          </h2>

          <div className="help__copy">
            <div className="help__body" aria-label={`${body1} ${body2}`}>
              <p aria-hidden>
                {body1Units.map((value) => {
                  const i = index++;
                  return (
                    <span key={`b1-${i}`} className="help__ch" style={{ ["--i" as string]: i }}>
                      {value}
                    </span>
                  );
                })}
              </p>
              <p aria-hidden>
                {body2Units.map((value) => {
                  const i = index++;
                  return (
                    <span key={`b2-${i}`} className="help__ch" style={{ ["--i" as string]: i }}>
                      {value}
                    </span>
                  );
                })}
              </p>
            </div>

            <Link to="/#who-we-are" className="help__more" style={{ ["--i" as string]: total }}>
              {t(ui.home.learnMore)}
              <span aria-hidden>{isAr ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
