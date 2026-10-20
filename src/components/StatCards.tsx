import { useEffect, useRef, useState } from "react";
import { ui } from "../copy";
import { useI18n } from "../i18n";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const { inView, ref } = useInView<HTMLSpanElement>();

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} dir="ltr">
      +{value}
      {suffix}
    </span>
  );
}

export function StatCards() {
  const { t } = useI18n();

  return (
    <div className="impact">
      <p className="impact-pill">{t(ui.home.numbersKicker)}</p>
      <h2 className="sr-only">{t(ui.home.numbersTitle)}</h2>
      <div className="impact-grid">
        {ui.numbers.map((item) => (
          <article key={item.label.en} className="impact-item">
            <p className="impact-label">{t(item.label)}</p>
            <p className="impact-value">
              <CountUp to={item.to} suffix={item.suffix} />
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
