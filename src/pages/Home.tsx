import { Link } from "react-router-dom";
import { Faq } from "../components/Faq";
import { HelpReveal } from "../components/HelpReveal";
import { HeroCollage } from "../components/HeroCollage";
import { ProcessSteps } from "../components/ProcessSteps";
import { Reveal } from "../components/Reveal";
import { ServicesAccordion } from "../components/ServicesAccordion";
import { StatCards } from "../components/StatCards";
import { WhoWeAre } from "../components/WhoWeAre";
import { WorkCarousel } from "../components/WorkCarousel";
import { ui } from "../copy";
import { POSTS } from "../data";
import { useI18n } from "../i18n";

function ArrowIcon() {
  return (
    <svg className="hero-cta__arrow" viewBox="0 0 16 16" aria-hidden fill="none">
      <path d="M4 12 12 4M6.5 4H12v5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Home() {
  const { t, isAr } = useI18n();
  const lines = isAr ? ui.home.h1Lines.ar : ui.home.h1Lines.en;

  return (
    <main className="relative z-[1]">
      <section id="home-hero" className="hero">
        <div className="hero__frame">
          <div className="hero__copy">
            <h1 className="hero-title">
              {lines.map((line) => (
                <span key={line} className="hero-line">
                  {line}
                </span>
              ))}
            </h1>

            <div className="hero-lead">
              <p>{t(ui.home.trustLine)}</p>
              <p>{t(ui.home.doLead)}</p>
            </div>

            <div className="hero__ctas">
              <Link to="/portfolio" className="hero-cta hero-cta--primary">
                {t(ui.home.workGear)}
                <ArrowIcon />
              </Link>
              <Link to="/#work" className="hero-cta hero-cta--ghost">
                {t(ui.home.workGear)}
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <HeroCollage />
        </div>
      </section>

      <HelpReveal />

      <section id="numbers" className="section impact-section">
        <div className="wrap">
          <Reveal>
            <StatCards />
          </Reveal>
        </div>
      </section>

      <section id="work" className="work section">
        <Reveal>
          <WorkCarousel />
        </Reveal>
      </section>

      <WhoWeAre />

      <section id="method-steps" className="section">
        <div className="wrap">
          <Reveal>
            <ProcessSteps />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <ServicesAccordion />
      </Reveal>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="banner min-h-[22rem] px-6 py-14 md:px-14 md:py-20">
              <img src="/media/city.jpg" alt="" />
              <div className="banner-inner max-w-3xl">
                <p className="kicker">{t(ui.home.packsKicker)}</p>
                <h2 className="display mt-4 text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.packsBannerTitle)}</h2>
                <p className="mt-5 max-w-xl text-[1.02rem] leading-8 text-muted">{t(ui.home.packsBannerText)}</p>
                <Link to="/packages" className="btn-pill btn-night mt-8">
                  {t(ui.home.packsBannerCta)}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="journal" className="journal section">
        <div className="wrap">
          <Reveal>
            <div className="journal-head">
              <p className="journal-meta">{t(ui.home.journalMeta)}</p>
              <h2 className="journal-display">
                {isAr ? (
                  <>
                    <span className="journal-display__line">{t(ui.home.journalArticles)}</span>
                    <span className="journal-display__line journal-display__line--indent">
                      و{t(ui.home.journalCases)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="journal-display__line">
                      <em>A</em>rticles
                    </span>
                    <span className="journal-display__line journal-display__line--indent">
                      and <em>C</em>ases
                    </span>
                  </>
                )}
              </h2>
            </div>
          </Reveal>

          <div className="journal-board">
            {(
              [
                { key: "journal" as const, label: ui.home.journalArticles },
                { key: "cases" as const, label: ui.home.journalCases },
              ] as const
            ).map((group) => {
              const items = POSTS.filter((post) => post.category === group.key);
              if (!items.length) return null;
              return (
                <div key={group.key} className="journal-group">
                  <p className="journal-group__label">{t(group.label)}</p>
                  <ul className="journal-group__list">
                    {items.map((post) => (
                      <li key={post.slug}>
                        <Link to={`/blog/${post.slug}`} className="journal-link">
                          <span className="journal-link__title">{t(post.title)}</span>
                          <span className="journal-link__meta">{t(post.date)}</span>
                          <span className="journal-link__arrow" aria-hidden>
                            {isAr ? "←" : "→"}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <Link to="/blog" className="journal-all">
            {t(ui.home.allPosts)}
          </Link>
        </div>
      </section>

      <Reveal>
        <Faq />
      </Reveal>
    </main>
  );
}
