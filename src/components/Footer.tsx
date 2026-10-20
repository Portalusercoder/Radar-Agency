import { Link } from "react-router-dom";
import { ui } from "../copy";
import { SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

export function Footer() {
  const { openLead } = useLead();
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="foot-scene">
        <img src="/media/portrait.jpg" alt="" />
        <div className="wrap">
          <div className="foot-card">
            <div className="foot-top">
              <div className="foot-cta">
                <h2>{t(ui.footer.kicker)}</h2>
                <button type="button" onClick={() => openLead()} className="foot-call">
                  {t(ui.home.talk)}
                  <span aria-hidden>↗</span>
                </button>
              </div>

              <div className="foot-cols">
                <div>
                  <p>{t(ui.footer.nav)}</p>
                  <Link to="/">{t(ui.nav.home)}</Link>
                  <Link to="/#services">{t(ui.nav.services)}</Link>
                  <Link to="/portfolio">{t(ui.nav.work)}</Link>
                  <Link to="/packages">{t(ui.nav.packages)}</Link>
                  <Link to="/#about">{t(ui.home.aboutKicker)}</Link>
                  <button type="button" onClick={() => openLead()}>
                    {t(ui.footer.contact)}
                  </button>
                </div>
                <div>
                  <p>{t(ui.footer.site)}</p>
                  <Link to="/blog">{t(ui.nav.blog)}</Link>
                  <Link to="/terms">{t(ui.footer.terms)}</Link>
                  <Link to="/contract">{t(ui.footer.contract)}</Link>
                  <a href={SITE.jobs}>{t(ui.footer.jobs)}</a>
                  <a href={SITE.dashboard}>{t(ui.nav.login)}</a>
                </div>
                <div>
                  <p>{t(ui.nav.social)}</p>
                  <a href={SITE.instagram} rel="noreferrer">
                    {t(ui.footer.instagram)}
                  </a>
                  <a href={SITE.twitter} rel="noreferrer">
                    {t(ui.footer.x)}
                  </a>
                  <a href={SITE.linkedin} rel="noreferrer">
                    {t(ui.footer.linkedin)}
                  </a>
                </div>
              </div>
            </div>

            <div className="foot-bar">
              <p>
                © {year} {t(ui.brand)} — {t(ui.footer.legal)}
              </p>
              <p>
                {t(ui.footer.city)} — {t(ui.footer.country)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
