import { Link } from "react-router-dom";
import { ui } from "../copy";
import { SERVICES, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";
import { Logo } from "./Logo";

export function Footer() {
  const { openLead } = useLead();
  const { t } = useI18n();

  return (
    <footer className="relative z-[1] border-t border-line">
      <section className="section">
        <div className="wrap">
          <h2 className="display max-w-3xl text-5xl md:text-7xl">{t(ui.home.contactTitle)}</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" onClick={() => openLead()} className="btn-pill btn-night">
              {t(ui.home.joinCta)}
            </button>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waAsk))}`}
              className="btn-pill btn-line"
            >
              {t(ui.whatsapp)}
            </a>
          </div>
          <div className="mt-12 grid gap-8 text-sm md:grid-cols-3">
            <div>
              <p className="font-bold">{t(ui.footer.contact)}</p>
              <a href={`mailto:${SITE.email}`} className="mt-2 block text-muted no-underline hover:text-night">
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone}`} className="mt-1 block text-muted no-underline hover:text-night" dir="ltr">
                {SITE.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="font-bold">{t(ui.footer.city)}</p>
              <p className="mt-2 text-muted">{t(ui.footer.country)}</p>
            </div>
            <div>
              <p className="font-bold">{t(ui.footer.site)}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-muted">
                <a href={SITE.instagram} className="no-underline hover:text-night">
                  {t(ui.footer.instagram)}
                </a>
                <a href={SITE.twitter} className="no-underline hover:text-night">
                  {t(ui.footer.x)}
                </a>
                <a href={SITE.linkedin} className="no-underline hover:text-night">
                  {t(ui.footer.linkedin)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap grid gap-10 py-10 text-sm md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo inverted />
          </div>
          <div className="md:col-span-5">
            <p className="mb-2 font-bold">{t(ui.footer.services)}</p>
            <div className="grid gap-x-6 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="block py-1 text-muted no-underline hover:text-night"
                >
                  {t(service.title)}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <Link to="/portfolio" className="block py-1 text-muted no-underline hover:text-night">
              {t(ui.nav.work)}
            </Link>
            <Link to="/packages" className="block py-1 text-muted no-underline hover:text-night">
              {t(ui.nav.packages)}
            </Link>
            <Link to="/blog" className="block py-1 text-muted no-underline hover:text-night">
              {t(ui.nav.blog)}
            </Link>
            <Link to="/terms" className="block py-1 text-muted no-underline hover:text-night">
              {t(ui.footer.terms)}
            </Link>
            <Link to="/contract" className="block py-1 text-muted no-underline hover:text-night">
              {t(ui.footer.contract)}
            </Link>
            <a href={SITE.jobs} className="block py-1 text-muted no-underline hover:text-night">
              {t(ui.footer.jobs)}
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-3 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {t(ui.brand)}. {t(ui.footer.legal)}
          </p>
        </div>
      </div>
    </footer>
  );
}
