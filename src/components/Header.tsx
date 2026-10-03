import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, ui } from "../copy";
import { SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";
import { Logo } from "./Logo";

function LangButton({ className = "" }: { className?: string }) {
  const { t, toggleLocale } = useI18n();
  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`min-h-11 px-3 text-[0.9rem] text-paper/70 hover:text-paper ${className}`}
      aria-label={t(ui.langLabel)}
    >
      {t(ui.lang)}
    </button>
  );
}

export function Header() {
  const { openLead } = useLead();
  const { t } = useI18n();
  const [menu, setMenu] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Logo inverted />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t(ui.nav.main)}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-2 text-[0.9rem] no-underline transition ${
                  isActive ? "text-paper" : "text-paper/70 hover:text-paper"
                }`
              }
            >
              {t(link.label)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LangButton />
          <a
            href={SITE.dashboard}
            className="px-3 py-2 text-[0.9rem] text-paper/70 no-underline hover:text-paper"
          >
            {t(ui.nav.login)}
          </a>
          <button type="button" onClick={() => openLead()} className="btn-pill btn-on-dark">
            {t(ui.nav.start)}
          </button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LangButton />
          <button
            type="button"
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5"
            aria-expanded={menu}
            aria-label={menu ? t(ui.nav.closeMenu) : t(ui.nav.openMenu)}
            onClick={() => setMenu((v) => !v)}
          >
            <span className={`h-0.5 w-6 bg-paper transition ${menu ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-paper transition ${menu ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-paper transition ${menu ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {menu ? (
        <div className="border-t border-white/10 bg-ink px-5 py-4 lg:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenu(false)}
                className="min-h-11 py-3 text-paper no-underline"
              >
                {t(link.label)}
              </Link>
            ))}
            <a href={SITE.dashboard} className="min-h-11 py-3 text-paper/70 no-underline">
              {t(ui.nav.login)}
            </a>
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                openLead();
              }}
              className="btn-pill btn-on-dark mt-2 self-start"
            >
              {t(ui.nav.start)}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
