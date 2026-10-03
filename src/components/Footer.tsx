import { Link } from "react-router-dom";
import { ui } from "../copy";
import { SERVICES, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";
import { Kicker } from "./Kicker";
import { Logo } from "./Logo";

export function Footer() {
  const { openLead } = useLead();
  const { t } = useI18n();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <Kicker light>{t(ui.footer.kicker)}</Kicker>
          <h2 className="display mt-4 text-3xl md:text-5xl">
            {t(ui.footer.title1)}
            <br />
            {t(ui.footer.title2)}
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => openLead()} className="btn-pill btn-on-dark">
              {t(ui.nav.start)}
            </button>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waAsk))}`}
              className="btn-pill btn-ghost-dark"
            >
              {t(ui.whatsapp)}
            </a>
          </div>
        </div>

        <div className="grid gap-10 text-sm md:col-span-7 md:grid-cols-3">
          <div>
            <p className="mb-3 text-paper/40">{t(ui.footer.contact)}</p>
            <a href={`mailto:${SITE.email}`} className="block py-1 text-paper no-underline">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phone}`} className="block py-1 text-paper no-underline" dir="ltr">
              {SITE.phoneDisplay}
            </a>
            <p className="mt-3 text-paper/70">
              {t(ui.footer.city)}
              <br />
              {t(ui.footer.country)}
            </p>
          </div>
          <div>
            <p className="mb-3 text-paper/40">{t(ui.footer.services)}</p>
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="block py-1 text-paper no-underline hover:text-paper/70"
              >
                {t(service.title)}
              </Link>
            ))}
          </div>
          <div>
            <p className="mb-3 text-paper/40">{t(ui.footer.site)}</p>
            <Link to="/portfolio" className="block py-1 text-paper no-underline">
              {t(ui.nav.work)}
            </Link>
            <Link to="/blog" className="block py-1 text-paper no-underline">
              {t(ui.nav.blog)}
            </Link>
            <Link to="/terms" className="block py-1 text-paper no-underline">
              {t(ui.footer.terms)}
            </Link>
            <Link to="/contract" className="block py-1 text-paper no-underline">
              {t(ui.footer.contract)}
            </Link>
            <a href={SITE.jobs} className="block py-1 text-paper no-underline">
              {t(ui.footer.jobs)}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-sm text-paper/40 md:flex-row md:items-center md:justify-between md:px-8">
          <Logo inverted />
          <p>
            © {new Date().getFullYear()} {t(ui.brand)}. {t(ui.footer.legal)}
          </p>
          <div className="flex gap-4">
            <a href={SITE.instagram} className="text-paper/60 no-underline hover:text-paper">
              {t(ui.footer.instagram)}
            </a>
            <a href={SITE.twitter} className="text-paper/60 no-underline hover:text-paper">
              {t(ui.footer.x)}
            </a>
            <a href={SITE.linkedin} className="text-paper/60 no-underline hover:text-paper">
              {t(ui.footer.linkedin)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
