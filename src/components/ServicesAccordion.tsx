import { Link } from "react-router-dom";
import { ui } from "../copy";
import { SERVICE_IMAGES as IMAGES, SERVICES as SERVICE_PAGES, servicePath } from "../data";
import { useI18n } from "../i18n";

const SERVICES = SERVICE_PAGES.map((service) => ({
  slug: service.slug,
  title: service.title,
  meta: service.navNote,
  text: service.promise,
  image: IMAGES[service.slug],
}));

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
                  <Link
                    to={servicePath(item.slug)}
                    className="journal-link journal-link--rich"
                    style={{ ["--svc-img" as string]: `url(${item.image})` }}
                  >
                    <span className="journal-link__title">{t(item.title)}</span>
                    <span className="journal-link__meta">{t(item.meta)}</span>
                    <span className="journal-link__arrow" aria-hidden>
                      {isAr ? "←" : "→"}
                    </span>
                    <span className="journal-link__desc">
                      <span className="journal-link__desc-inner">{t(item.text)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
