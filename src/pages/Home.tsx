import { Link } from "react-router-dom";
import { FigureCard } from "../components/FigureCard";
import { ProofSlider } from "../components/ProofSlider";
import { Reveal } from "../components/Reveal";
import { ServiceGlyph } from "../components/ServiceGlyph";
import { StatCards } from "../components/StatCards";
import { WorkCarousel } from "../components/WorkCarousel";
import { ui } from "../copy";
import { POSTS, SERVICES, SITE, serviceLeadValue } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

const featured = SERVICES.slice(0, 2);
const featuredShots = ["/media/phone.jpg", "/media/snap.jpg"];
const journalShot = ["/media/portrait.jpg", "/media/pack.jpg", "/media/phone.jpg"];

export function Home() {
  const { openLead } = useLead();
  const { t, isAr } = useI18n();
  const lines = isAr ? ui.home.h1Lines.ar : ui.home.h1Lines.en;

  return (
    <main className="relative z-[1]">
      <section id="home-hero" className="hero">
        <div className="hero__media">
          <img src="/media/hero.jpg" alt="" />
        </div>
        <div className="hero__glow" />
        <div className="hero__glow hero__glow--alt" />
        <div className="hero__inner wrap">
          <p className="kicker">{t(ui.home.heroKicker)}</p>
          <h1 className="display mt-5 max-w-5xl text-[clamp(2.5rem,8vw,7.4rem)]">
            <span className="block text-[0.72em] text-night/80">{lines[0]}</span>
            <span className="mt-1 block">{lines[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.85] text-muted">{t(ui.home.lead)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openLead()} className="btn-pill btn-night">
              {t(ui.home.joinCta)}
            </button>
            <a href="#services" className="btn-pill btn-line">
              {t(ui.home.exploreCta)}
            </a>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waStart))}`}
              className="btn-pill btn-ghost"
            >
              {t(ui.whatsapp)}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <p className="max-w-[12rem] text-xs leading-5 text-muted">{t(ui.home.trustLine)}</p>
            <div className="flex flex-wrap gap-2">
              {ui.home.ticker.slice(0, 5).map((item) => (
                <span key={item.en} className="trust-orb">
                  {t(item)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.featuredKicker)}</p>
            <h2 className="display mt-3 max-w-3xl text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.featuredTitle)}</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {featured.map((service, index) => (
              <Reveal key={service.slug} delay={index * 80}>
                <article className="service-card overflow-hidden p-0">
                  <div className="shot aspect-[16/10] rounded-none">
                    <img src={featuredShots[index]} alt="" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <p className="service-no" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{t(service.title)}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-muted">{t(service.promise)}</p>
                    <Link
                      to={`/services/${service.slug}`}
                      className="mt-5 inline-flex text-sm font-semibold text-night no-underline hover:text-accent"
                    >
                      {t(ui.home.learnMore)}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section">
        <div className="wrap">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker">{t(ui.home.workKicker)}</p>
                <h2 className="display mt-3 text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.workTitle)}</h2>
              </div>
              <Link to="/portfolio" className="text-sm font-semibold text-muted no-underline hover:text-night">
                {t(ui.home.workAll)}
              </Link>
            </div>
          </Reveal>
          <div className="mt-12">
            <WorkCarousel />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16">
          <Reveal>
            <p className="kicker">{t(ui.home.philosophyKicker)}</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.philosophyTitle)}</h2>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-8 text-muted">{t(ui.home.philosophyText)}</p>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="glass p-5">
                <h3 className="text-lg font-semibold">{t(ui.home.missionTitle)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{t(ui.home.missionText)}</p>
              </div>
              <div className="glass p-5">
                <h3 className="text-lg font-semibold">{t(ui.home.visionTitle)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{t(ui.home.visionText)}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="shot aspect-[4/5] max-h-[40rem]">
              <img src="/media/portrait.jpg" alt="" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="method-steps" className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.processKicker)}</p>
            <h2 className="display mt-3 max-w-3xl text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.expectTitle)}</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ui.steps.map((step, index) => (
              <Reveal key={step.title.en} delay={index * 60}>
                <div className="glass h-full p-6">
                  <p className="service-no" dir="ltr">
                    {String(index + 1).padStart(2, "0")} / {String(ui.steps.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold">{t(step.title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{t(step.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.servicesKicker)}</p>
            <h2 className="display mt-3 max-w-3xl text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.servicesTitle)}</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 50}>
                <article className="service-card">
                  <div className="flex items-center justify-between gap-3">
                    <ServiceGlyph name={service.icon} />
                    <span className="service-no" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{t(service.title)}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{t(service.promise)}</p>
                  <p className="mt-4 text-sm text-muted">
                    {service.customPrice
                      ? t(ui.home.customPrice)
                      : `${t(ui.home.from)} ${service.from} ${t(ui.home.sar)}`}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link to={`/services/${service.slug}`} className="btn-pill btn-line text-sm">
                      {t(ui.home.learnMore)}
                    </Link>
                    <button
                      type="button"
                      onClick={() => openLead({ service: serviceLeadValue(service.slug) })}
                      className="btn-pill btn-ghost text-sm"
                    >
                      {t(ui.home.requestService)}
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.numbersKicker)}</p>
            <h2 className="display mt-3 max-w-4xl text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.numbersTitle)}</h2>
          </Reveal>
          <div className="mt-12">
            <StatCards />
          </div>
        </div>
      </section>

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

      <section className="section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.resultsKicker)}</p>
            <h2 className="display mt-3 max-w-3xl text-[clamp(2rem,4.6vw,4.2rem)]">{t(ui.home.resultsTitle)}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{t(ui.home.resultsNote)}</p>
          </Reveal>
          <div className="mt-10">
            <ProofSlider />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-[clamp(1.8rem,4vw,3.4rem)]">{t(ui.home.journalTitle)}</h2>
              <Link to="/blog" className="hidden text-sm font-semibold text-muted no-underline hover:text-night md:inline">
                {t(ui.home.allPosts)}
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {POSTS.slice(0, 3).map((post, index) => (
              <FigureCard
                key={post.slug}
                to={`/blog/${post.slug}`}
                img={journalShot[index] ?? "/media/city.jpg"}
                tag={t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)}
                title={t(post.title)}
                text={t(post.excerpt)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
