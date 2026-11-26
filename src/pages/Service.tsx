import type { CSSProperties } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowIcon } from "../components/ArrowIcon";
import { Reveal } from "../components/Reveal";
import { ui } from "../copy";
import { getService, SERVICE_IMAGES, SERVICES, serviceLeadValue, servicePath, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

/** One brand colour per service, used for the shape behind the hero photo. */
const ACCENTS: Record<string, string> = {
  "media-buying": "#fd8256",
  "store-design": "#5070ff",
  branding: "#ffde6a",
  "content-creation": "#fd8256",
};

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function pad(n: number, isAr: boolean) {
  const value = String(n).padStart(2, "0");
  return isAr ? value.replace(/\d/g, (digit) => AR_DIGITS[Number(digit)]) : value;
}

/** Journal-style display lines: serif italic first letter in English, plain in Arabic. */
function DisplayLines({ lines, isAr }: { lines: string[]; isAr: boolean }) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={line} className={`journal-display__line${index ? " journal-display__line--indent" : ""}`}>
          {isAr ? (
            line
          ) : (
            <>
              <em>{line.charAt(0)}</em>
              {line.slice(1)}
            </>
          )}
        </span>
      ))}
    </>
  );
}

export function Service({ slug }: { slug: string }) {
  const service = getService(slug);
  const { openLead } = useLead();
  const { t, isAr } = useI18n();

  if (!service) return <Navigate to="/" replace />;

  const title = t(service.title);
  const index = SERVICES.findIndex((item) => item.slug === slug);
  const locale = isAr ? "ar" : "en";
  const others = SERVICES.filter((item) => item.slug !== slug);
  const request = () => openLead({ service: serviceLeadValue(slug) });

  return (
    <main className="relative z-[1]">
      <section className="svx-hero" style={{ ["--svx-accent" as string]: ACCENTS[slug] } as CSSProperties}>
        <div className="svx-hero__frame">
          <div className="svx-hero__copy">
            <p className="svx-meta">
              {pad(index + 1, isAr)} // {t(service.nav)}
            </p>
            <h1 className="svx-title">{title}</h1>
            <p className="svx-lead">{t(service.promise)}</p>

            <p className="svx-price">
              {service.customPrice ? (
                <span>{t(ui.home.customPrice)}</span>
              ) : (
                <>
                  <span>{t(ui.home.from)}</span>
                  <strong dir="ltr">{service.from}</strong>
                  <span>{t(ui.home.sar)}</span>
                </>
              )}
              <small>{t(ui.service.vat)}</small>
            </p>

            <div className="hero__ctas">
              <button type="button" onClick={request} className="hero-cta hero-cta--primary">
                {t(ui.home.requestService)}
                <ArrowIcon />
              </button>
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(`${t(ui.service.wa)} ${title}`)}`}
                className="hero-cta hero-cta--ghost"
              >
                {t(ui.whatsapp)}
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="svx-hero__photo">
            <img src={SERVICE_IMAGES[slug]} alt="" decoding="async" />
          </div>
        </div>
      </section>

      <section className="journal section svx-included" aria-labelledby="svx-included">
        <div className="wrap">
          <Reveal>
            <div className="journal-head">
              <p className="journal-meta">{t(ui.service.includesMeta)}</p>
              <h2 id="svx-included" className="journal-display">
                <DisplayLines lines={ui.service.includesLines[locale]} isAr={isAr} />
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <ol className="svx-rows">
              {service.includes.map((item, itemIndex) => (
                <li key={item.title.en} className="svx-row">
                  <span className="svx-row__num" dir="ltr">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>
                  <h3 className="svx-row__title">{t(item.title)}</h3>
                  <p className="svx-row__text">{t(item.text)}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section svx-why">
        <div className="wrap svx-why__grid">
          <div className="svx-why__intro">
            <p className="svx-meta">{t(ui.service.whyMeta)}</p>
            <h2 className="svx-why__title">{t(ui.service.why)}</h2>
          </div>
          <div>
            <p className="svx-why__text">{t(service.why)}</p>
            <button type="button" onClick={request} className="svx-why__btn">
              {t(ui.home.requestService)}
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      <section className="section impact-section svx-stats">
        <div className="wrap">
          <div className="impact">
            <h2 className="sr-only">{t(ui.home.numbersTitle)}</h2>
            <div className="impact-grid" style={{ ["--n" as string]: service.stats.length } as CSSProperties}>
              {service.stats.map((stat) => (
                <article key={stat.label.en} className="impact-item">
                  <p className="impact-value" dir="ltr">
                    {t(stat.value)}
                  </p>
                  <p className="impact-label">{t(stat.label)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="journal section" aria-labelledby="svx-other">
        <div className="wrap">
          <Reveal>
            <div className="journal-head">
              <p className="journal-meta">{t(ui.service.otherMeta)}</p>
              <h2 id="svx-other" className="journal-display">
                <DisplayLines lines={ui.service.otherLines[locale]} isAr={isAr} />
              </h2>
            </div>
          </Reveal>

          <div className="journal-board">
            <div className="journal-group">
              <p className="journal-group__label">{t(ui.service.other)}</p>
              <ul className="journal-group__list">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={servicePath(item.slug)}
                      className="journal-link journal-link--rich"
                      style={{ ["--svc-img" as string]: `url(${SERVICE_IMAGES[item.slug]})` } as CSSProperties}
                    >
                      <span className="journal-link__title">{t(item.title)}</span>
                      <span className="journal-link__meta">{t(item.navNote)}</span>
                      <span className="journal-link__arrow" aria-hidden>
                        {isAr ? "←" : "→"}
                      </span>
                      <span className="journal-link__desc">
                        <span className="journal-link__desc-inner">{t(item.promise)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
