import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, ui } from "../copy";
import { SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";
import { Logo } from "./Logo";

export function Header() {
  const { openLead } = useLead();
  const { t, isAr, toggleLocale } = useI18n();
  const { pathname, hash } = useLocation();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenu(false);
  }, [pathname, hash]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className={`nav-bar${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-bar__inner">
        <Logo />

        <nav className="nav-bar__links" aria-label={t(ui.nav.main)}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="nav-bar__link">
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="nav-bar__tools">
          <a href={SITE.dashboard} className="nav-tool" aria-label={t(ui.nav.login)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
              <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M5.5 19.2c1.4-3 3.7-4.5 6.5-4.5s5.1 1.5 6.5 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </a>
          <button type="button" onClick={toggleLocale} className="nav-tool" aria-label={t(ui.langLabel)}>
            {isAr ? "EN" : "ع"}
          </button>
          <button type="button" onClick={() => openLead()} className="nav-orb" aria-label={t(ui.nav.start)}>
            <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden fill="none">
              <path
                d="M4 12 12 4M6.5 4H12v5.5"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="nav-tool nav-burger"
            aria-expanded={menu}
            aria-label={menu ? t(ui.nav.closeMenu) : t(ui.nav.openMenu)}
            onClick={() => setMenu((v) => !v)}
          >
            <span className="flex flex-col items-center justify-center gap-1.5">
              <span className={`h-px w-4 bg-current transition ${menu ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-current transition ${menu ? "opacity-0" : ""}`} />
              <span className={`h-px w-4 bg-current transition ${menu ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`menu-liquid ${menu ? "is-open" : "pointer-events-none"}`}
        style={{ ["--cx" as string]: isAr ? "12%" : "88%" }}
      >
        <nav className="flex flex-col" aria-label={t(ui.nav.main)}>
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenu(false)}
              className="min-h-14 border-b border-line py-4 text-2xl text-night no-underline"
            >
              <span className="me-3 text-sm text-muted" dir="ltr">
                {String(index + 1).padStart(2, "0")}
              </span>
              {t(link.label)}
            </Link>
          ))}
          <a href={SITE.dashboard} className="min-h-14 py-4 text-2xl text-muted no-underline">
            {t(ui.nav.login)}
          </a>
        </nav>
        <button
          type="button"
          onClick={() => {
            setMenu(false);
            openLead();
          }}
          className="btn-pill btn-hero self-start"
        >
          {t(ui.nav.start)}
        </button>
      </div>
    </header>
  );
}
