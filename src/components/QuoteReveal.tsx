import { useEffect, useMemo, useRef } from "react";
import { ui } from "../copy";
import { useI18n } from "../i18n";
import { Mark } from "./Logo";

const BRAND_WORDS = ["رادار", "Radar"];

function segments(text: string, locale: string, granularity: "grapheme" | "word") {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(locale, { granularity }).segment(text)].map((part) => part.segment);
  }
  return granularity === "word" ? text.split(/(\s+)/).filter(Boolean) : Array.from(text);
}

function pieces(text: string, marks: string[], locale: string, joinedWords: boolean) {
  const tokens = [...new Set([...BRAND_WORDS, ...marks])];
  const pattern = new RegExp(
    `(?<![\\p{L}])(${tokens.map((mark) => mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}])`,
    "gu",
  );
  const out: { kind: "logo" | "mark" | "text"; value: string }[] = [];

  for (const part of text.split(pattern)) {
    if (!part) continue;
    if (BRAND_WORDS.includes(part)) {
      out.push({ kind: "logo", value: part });
      continue;
    }
    const marked = marks.includes(part);
    const chunks = segments(part, locale, joinedWords ? "word" : "grapheme");
    for (const chunk of chunks) {
      out.push({ kind: marked ? "mark" : "text", value: chunk });
    }
  }

  return out;
}

export function QuoteReveal({ text, marks }: { text: string; marks: string[] }) {
  const { t, isAr } = useI18n();
  const pinRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const units = useMemo(() => pieces(text, marks, isAr ? "ar" : "en", isAr), [text, marks, isAr]);

  useEffect(() => {
    const pin = pinRef.current;
    const quote = quoteRef.current;
    if (!pin || !quote) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const travel = Math.min(2800, Math.max(1400, units.length * (isAr ? 36 : 12) + 280));
    pin.style.setProperty("--quote-travel", `${travel}px`);
    quote.style.setProperty("--n", String(Math.max(units.length, 1)));
    quote.style.setProperty("--wave", isAr ? "3" : "8");

    const apply = (progress: number) => {
      quote.style.setProperty("--q", progress.toFixed(4));
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
  }, [units.length, isAr]);

  return (
    <section id="philosophy" className="land-quote-pin" ref={pinRef}>
      <div className="land-quote-pin__sticky">
        <div className="land-quote wrap">
          <p ref={quoteRef} aria-label={text}>
            <span aria-hidden>
              {units.map((unit, index) => {
                if (unit.kind === "logo") {
                  return (
                    <span
                      key={`logo-${index}`}
                      className="land-quote__ch land-quote__brand"
                      style={{ ["--i" as string]: index }}
                      role="img"
                      aria-label={t(ui.brand)}
                    >
                      <Mark className="land-quote__logo" />
                    </span>
                  );
                }

                const Tag = unit.kind === "mark" ? "em" : "span";
                return (
                  <Tag key={`${unit.value}-${index}`} className="land-quote__ch" style={{ ["--i" as string]: index }}>
                    {unit.value}
                  </Tag>
                );
              })}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
