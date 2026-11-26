import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks, ui } from "../copy";
import { SERVICE_IMAGES, SERVICES, servicePath, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";
import { Logo } from "./Logo";

export function Header() {
  const { openLead } = useLead();
  const { t, isAr, toggleLocale } = useI18n();
  const { pathname, hash } = useLocation();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState(false);
  const dropTimer = useRef<number | undefined>(undefined);
  const dropRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const hoverOpened = useRef(false);

  const openDrop = useCallback(() => {
    window.clearTimeout(dropTimer.current);
    setDrop((open) => {
      if (!open) hoverOpened.current = true;
      return true;
    });
  }, []);

  const closeDrop = useCallback(() => {
    hoverOpened.current = false;
    window.clearTimeout(dropTimer.current);
    dropTimer.current = window.setTimeout(() => setDrop(false), 140);
  }, []);

  useEffect(() => {
    setMenu(false);
    setDrop(false);
  }, [pathname, hash]);

  useEffect(() => {
    if (hidden) setDrop(false);
  }, [hidden]);

  useEffect(() => {
    if (!drop) return;
    const onDown = (event: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) setDrop(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrop(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [drop]);

  useEffect(() => {
    lastY.current = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const hero = document.getElementById("home-hero");
      const heroEnd = hero ? hero.offsetTop + hero.offsetHeight - 120 : 0;

      setScrolled(y > 8);
      setPill(y > heroEnd);

      const delta = y - lastY.current;
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      if (Math.abs(delta) > 6) lastY.current = y;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  return (
    <header
      className={`nav-bar${scrolled ? " is-scrolled" : ""}${pill ? " is-pill" : ""}${
        hidden && !menu ? " is-hidden" : ""
      }`}
    >
      <div className="nav-bar__inner">
        <Logo />

        <nav className="nav-bar__links" aria-label={t(ui.nav.main)}>
          {navLinks.map((link) =>
            link.menu ? (
              <div
                key={link.to}
                ref={dropRef}
                className="nav-drop"
                onMouseEnter={openDrop}
                onMouseLeave={closeDrop}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDrop(false);
                }}
              >
                <button
                  type="button"
                  className="nav-bar__link nav-drop__trigger"
                  aria-haspopup="true"
                  aria-expanded={drop}
                  aria-controls="nav-services-menu"
                  onClick={() => {
                    // A mouse click right after hover-open should keep the menu open;
                    // touch and keyboard users still get a real toggle.
                    if (hoverOpened.current) {
                      hoverOpened.current = false;
                      setDrop(true);
                    } else {
                      setDrop((value) => !value);
                    }
                  }}
                >
                  {t(link.label)}
                  <svg className="nav-drop__chev" viewBox="0 0 12 12" width="11" height="11" fill="none" aria-hidden>
                    <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div id="nav-services-menu" className={`nav-drop__panel${drop ? " is-open" : ""}`}>
                  <div className="nav-drop__card">
                    {SERVICES.map((service) => (
                      <div key={service.slug} className="nav-drop__col">
                        <Link to={servicePath(service.slug)} className="nav-drop__photo" tabIndex={-1} aria-hidden>
                          <img src={SERVICE_IMAGES[service.slug]} alt="" loading="lazy" decoding="async" />
                          <span>{t(service.nav)}</span>
                        </Link>
                        <p className="nav-drop__blurb">{t(service.promise)}</p>
                        <ul className="nav-drop__list">
                          {service.includes.slice(0, 3).map((item) => (
                            <li key={item.title.en}>
                              <Link to={servicePath(service.slug)} className="nav-drop__item">
                                {t(item.title)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link to={servicePath(service.slug)} className="nav-drop__more">
                          {t(ui.nav.explore)} {t(service.nav)}
                          <svg viewBox="0 0 12 12" width="11" height="11" fill="none" aria-hidden>
                            <path d="M3 9 9 3M4.5 3H9v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={link.to} to={link.to} className="nav-bar__link">
                {t(link.label)}
              </Link>
            ),
          )}
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
          {navLinks.map((link, index) =>
            link.menu ? (
              <div key={link.to} className="border-b border-line py-4">
                <p className="m-0 text-2xl text-night">
                  <span className="me-3 text-sm text-muted" dir="ltr">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {t(link.label)}
                </p>
                <div className="mt-2 grid ps-10">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      to={servicePath(service.slug)}
                      onClick={() => setMenu(false)}
                      className="min-h-11 py-2 text-lg text-muted no-underline"
                    >
                      {t(service.nav)}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
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
            ),
          )}
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
