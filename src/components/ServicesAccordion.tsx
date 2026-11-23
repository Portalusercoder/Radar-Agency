import { Link } from "react-router-dom";
import { ui } from "../copy";
import { useI18n } from "../i18n";
import type { Text } from "../i18n";

const SERVICES: {
  slug: string;
  title: Text;
  meta: Text;
}[] = [
  {
    slug: "social-media",
    title: ui.home.svcSocialTitle,
    meta: { ar: "منصات", en: "Platforms" },
  },
  {
    slug: "graphic-design",
    title: ui.home.svcBrandTitle,
    meta: { ar: "هوية", en: "Identity" },
  },
  {
    slug: "online-stores",
    title: ui.home.svcStoreTitle,
    meta: { ar: "متاجر", en: "Commerce" },
  },
  {
    slug: "advertisement",
    title: ui.home.svcAdsTitle,
    meta: { ar: "إعلان", en: "Paid media" },
  },
];

export function ServicesAccordion() {
  const { t, isAr } = useI18n();

  return (
    <section id="services" className="journal section" aria-labelledby="services-display">
      <div className="wrap">
        <div className="journal-head">
          <p className="journal-meta">{t(ui.home.servicesMeta)}</p>
          <h2 id="services-display" className="journal-display">
            {isAr ? (
              <>
                <span className="journal-display__line">{t(ui.home.servicesWord)}</span>
                <span className="journal-display__line journal-display__line--indent">
                  و{t(ui.home.servicesOffer)}
                </span>
              </>
            ) : (
              <>
                <span className="journal-display__line">
                  <em>S</em>ervices
                </span>
                <span className="journal-display__line journal-display__line--indent">
                  and <em>O</em>ffer
                </span>
              </>
            )}
          </h2>
        </div>

        <div className="journal-board">
          <div className="journal-group">
            <p className="journal-group__label">{t(ui.home.servicesWord)}</p>
            <ul className="journal-group__list">
              {SERVICES.map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/${item.slug}`} className="journal-link">
                    <span className="journal-link__title">{t(item.title)}</span>
                    <span className="journal-link__meta">{t(item.meta)}</span>
                    <span className="journal-link__arrow" aria-hidden>
                      {isAr ? "←" : "→"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link to="/services/social-media" className="journal-all">
          {t(ui.home.seeServices)}
        </Link>
      </div>
    </section>
  );
}
