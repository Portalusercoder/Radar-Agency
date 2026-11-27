import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { ui } from "../copy";
import { PORTFOLIO } from "../data";
import { useI18n } from "../i18n";

const AUTO_MS = 4200;
const SWIPE_PX = 40;

export function WorkCarousel() {
  const { t, isAr } = useI18n();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const total = PORTFOLIO.length;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTO_MS);
    return () => window.clearInterval(id);
    // `active` is a dependency so every manual change restarts the countdown.
  }, [inView, paused, total, active]);

  const go = (index: number) => {
    setActive(((index % total) + total) % total);
  };

  // Swipe / drag: the track is always laid out left-to-right (also in RTL), so
  // dragging left shows the next slide and dragging right the previous one.
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const swipedRef = useRef(false);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragRef.current = { x: event.clientX, y: event.clientY };
    swipedRef.current = false;
    setPaused(true);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>, commit: boolean) => {
    const start = dragRef.current;
    dragRef.current = null;
    if (start && commit) {
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) >= SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
        swipedRef.current = true;
        go(active + (dx < 0 ? 1 : -1));
      }
    }
    // Mouse users stay paused via hover; touch users resume right after the swipe.
    if (event.pointerType !== "mouse") setPaused(false);
  };

  return (
    <div
      className="work-show"
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="wrap work-show__head">
        <p className="work-show__meta">{t(ui.home.workMeta)}</p>
        <h2 className="work-show__title">
          {isAr ? (
            <>
              <span className="work-show__line">{t(ui.home.workLine1)}</span>
              <span className="work-show__line work-show__line--indent">{t(ui.home.workLine2)}</span>
            </>
          ) : (
            <>
              <span className="work-show__line">
                <em>L</em>atest
              </span>
              <span className="work-show__line work-show__line--indent">
                and <em>W</em>ork
              </span>
            </>
          )}
        </h2>
        <p className="work-show__lead">{t(ui.work.lead)}</p>
      </div>

      <div
        className="work-rail"
        aria-roledescription="carousel"
        aria-label={t(ui.home.workCasesTitle)}
        onPointerDown={onPointerDown}
        onPointerUp={(event) => endDrag(event, true)}
        onPointerCancel={(event) => endDrag(event, false)}
      >
        <div
          className="work-rail__track"
          style={{ ["--active" as string]: active, ["--count" as string]: total }}
        >
          {PORTFOLIO.map((item, index) => {
            const rel = ((index - active) % total + total) % total;
            const role = rel === 0 ? "active" : rel === 1 ? "next" : rel === total - 1 ? "prev" : "far";
            return (
              <article
                key={item.id}
                className={`work-slide work-slide--${role}`}
                aria-hidden={role !== "active"}
              >
                <Link
                  to={item.to ?? "/portfolio"}
                  className="work-slide__link"
                  tabIndex={role === "active" ? 0 : -1}
                  draggable={false}
                  onClick={(event) => {
                    if (swipedRef.current) {
                      event.preventDefault();
                      swipedRef.current = false;
                      return;
                    }
                    if (role !== "active") {
                      event.preventDefault();
                      go(index);
                    }
                  }}
                >
                  <span className="work-slide__shot">
                    <img src={item.img} alt="" draggable={false} />
                  </span>
                  <span className="work-slide__meta">
                    <span className="work-slide__copy">
                      <span className="work-slide__name">{t(item.title)}</span>
                      <span className="work-slide__cats">{t(ui.work[item.category])}</span>
                    </span>
                    <span className="work-slide__date">{t(item.date)}</span>
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      <div className="wrap work-show__foot">
        <div className="work-show__dots" role="tablist" aria-label={t(ui.home.workCasesTitle)}>
          {PORTFOLIO.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`${t(item.title)} ${index + 1}`}
              className={`work-show__dot${active === index ? " is-active" : ""}`}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <Link to="/portfolio" className="work-show__all">
          {t(ui.home.workSeeAll)}
          <span aria-hidden>↗</span>
        </Link>
      </div>
    </div>
  );
}
