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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ui.numbers.map((item) => (
        <article key={item.label.en} className="stat-card">
          <p className="display text-[clamp(2.6rem,5vw,4rem)]">
            <CountUp to={item.to} suffix={item.suffix} />
          </p>
          <p className="mt-3 text-sm leading-6 text-muted">{t(item.label)}</p>
        </article>
      ))}
    </div>
  );
}
