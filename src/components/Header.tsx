import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 ${scrolled || menu ? "bg-paper/70 backdrop-blur-xl" : ""}`}>
      <div className="wrap flex items-center justify-between py-4 md:py-5">
        <div className="flex min-w-0 items-center gap-10">
          <Logo inverted />
          <nav className="hidden items-center gap-7 md:flex" aria-label={t(ui.nav.main)}>
            {navLinks.map((link) => {
              const isHash = link.to.includes("#");
              const on =
                (isHash && pathname === "/" && hash === "#services") || (!isHash && pathname === link.to);
              const className = `py-1 text-[1.02rem] no-underline ${
                on ? "font-medium text-night" : "text-muted hover:text-night"
              }`;
              return isHash ? (
                <Link key={link.to} to={link.to} className={className}>
                  {t(link.label)}
                </Link>
              ) : (
                <NavLink key={link.to} to={link.to} className={className}>
                  {t(link.label)}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={toggleLocale} className="lang-orb" aria-label={t(ui.langLabel)}>
            {isAr ? "EN" : "ع"}
          </button>
          <button type="button" onClick={() => openLead()} className="btn-pill btn-night hidden min-h-11 text-[0.95rem] md:inline-flex">
            {t(ui.nav.start)}
          </button>
          <button
            type="button"
            className="orb-btn md:hidden"
            aria-expanded={menu}
            aria-label={menu ? t(ui.nav.closeMenu) : t(ui.nav.openMenu)}
            onClick={() => setMenu((v) => !v)}
          >
            <span className="flex flex-col items-center justify-center gap-1.5">
              <span className={`h-px w-4 bg-night transition ${menu ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-night transition ${menu ? "opacity-0" : ""}`} />
              <span className={`h-px w-4 bg-night transition ${menu ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`menu-liquid fixed inset-0 z-30 flex flex-col justify-between bg-paper px-[var(--page-x)] pt-28 pb-10 md:hidden ${
          menu ? "is-open" : "pointer-events-none"
        }`}
        style={{ ["--cx" as string]: isAr ? "12%" : "88%" }}
      >
        <div className="flex flex-col">
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
        </div>
        <button
          type="button"
          onClick={() => {
            setMenu(false);
            openLead();
          }}
          className="btn-pill btn-night self-start"
        >
          {t(ui.nav.start)}
        </button>
      </div>
    </header>
  );
}
