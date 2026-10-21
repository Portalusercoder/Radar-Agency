import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ui } from "../copy";
import { SERVICES, serviceLeadValue } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

function splitTitle(title: string) {
  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) return [title, ""];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(" "), parts.slice(mid).join(" ")];
}

const skins = [
  "svc-skin-night",
  "svc-skin-blue",
  "svc-skin-coral",
  "svc-skin-corn",
  "svc-skin-deep-blue",
  "svc-skin-deep-coral",
  "svc-skin-gold",
  "svc-skin-mist-blue",
  "svc-skin-mist-coral",
];

export function ServicesStack() {
  const { t } = useI18n();
  const { openLead } = useLead();
  const pin = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const total = SERVICES.length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const node = pin.current;
    if (!node) return;
    const cards = [...node.querySelectorAll<HTMLElement>(".svc-card")];

    const update = () => {
      let current = 0;
      cards.forEach((card, index) => {
        const stick = Number.parseFloat(getComputedStyle(card).top) || 0;
        if (card.getBoundingClientRect().top <= stick + 16) current = index;
      });
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce, total]);

  return (
    <section
      ref={pin}
      id="services"
      className={`svc-stack ${reduce ? "is-static" : ""}`}
      style={{ ["--n" as string]: String(total) }}
    >
      <div className="wrap">
        <div className="svc-stack__head">
          <p className="kicker">{t(ui.home.servicesKicker)}</p>
          <p className="svc-pin__count" dir="ltr">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
        <h2 className="sr-only">{t(ui.home.servicesTitle)}</h2>
        {SERVICES.map((service, index) => {
          const title = t(service.title);
          const [lead, rest] = splitTitle(title);
          const layered = Math.min(index, 3);
          return (
            <article
              key={service.slug}
              className={`svc-card ${skins[index % skins.length]}`}
              style={{
                zIndex: index + 1,
                top: `calc(var(--stick) + ${layered} * var(--peek))`,
                height: `calc(100svh - var(--stick) - 1.5rem - ${layered} * var(--peek))`,
              }}
            >
              <h3>
                {lead}
                {rest ? <span>{rest}</span> : null}
              </h3>
              <div className="svc-tags">
                {service.includes.slice(0, 5).map((item) => (
                  <span key={item.title.en}>{t(item.title)}</span>
                ))}
              </div>
              <p>{t(service.promise)}</p>
              <div className="svc-actions">
                <Link to={`/services/${service.slug}`}>{t(ui.home.learnMore)}</Link>
                <button type="button" onClick={() => openLead({ service: serviceLeadValue(service.slug) })}>
                  {t(ui.home.requestService)}
                </button>
              </div>
            </article>
          );
        })}
        <div className="svc-stack__runway" aria-hidden="true" />
      </div>
    </section>
  );
}
