import { useEffect, useRef, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ProcessSteps } from "../components/ProcessSteps";
import { ProofSlider } from "../components/ProofSlider";
import { Reveal } from "../components/Reveal";
import { ServicesStack } from "../components/ServicesStack";
import { StatCards } from "../components/StatCards";
import { WorkCarousel } from "../components/WorkCarousel";
import { ui } from "../copy";
import { POSTS, SERVICES } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

const featuredSlugs = ["advertisement", "social-media", "online-stores"] as const;
const featuredShots: Record<(typeof featuredSlugs)[number], string> = {
  advertisement: "/media/phone.jpg",
  "social-media": "/media/snap.jpg",
  "online-stores": "/media/store.jpg",
};
const featured = featuredSlugs.map((slug) => SERVICES.find((service) => service.slug === slug)!);
const journalShot = ["/media/portrait.jpg", "/media/pack.jpg", "/media/phone.jpg"];

function Marked({ text, marks }: { text: string; marks: string[] }) {
  if (!marks.length) return text;
  const pattern = new RegExp(`(${marks.map((mark) => mark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, index) =>
    marks.includes(part) ? <em key={`${part}-${index}`}>{part}</em> : part,
  );
}

function useOrbTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const nx = (event.clientX - box.left) / box.width - 0.5;
      const ny = (event.clientY - box.top) / box.height - 0.5;
      node.style.setProperty("--orb-x", `${nx * 48}px`);
      node.style.setProperty("--orb-y", `${ny * 36}px`);
    };

    const onLeave = () => {
      node.style.setProperty("--orb-x", "0px");
      node.style.setProperty("--orb-y", "0px");
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}

export function Home() {
  const { openLead } = useLead();
  const { t, isAr } = useI18n();
  const hero = useRef<HTMLElement>(null);
  const lines = isAr ? ui.home.h1Lines.ar : ui.home.h1Lines.en;
  const oval = t(ui.nav.start).trim().split(/\s+/);
  useOrbTilt(hero);

  return (
    <main className="relative z-[1]">
      <section id="home-hero" ref={hero} className="hero">
        <div className="hero__orb" aria-hidden />
        <div className="hero__frame">
          <h1 className="hero-copy">
            {lines.map((line, lineIndex) => (
              <span key={line} className="hero-line">
                {line.split(/\s+/).map((word, index) => (
                  <span key={`${lineIndex}-${word}-${index}`} className="hero-word">
                    <span style={{ animationDelay: `${140 + lineIndex * 160 + index * 50}ms` }}>{word}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero__mid">
            <button type="button" onClick={() => openLead()} className="hero-oval">
              <span className="hero-oval__rings" aria-hidden />
              <span className="hero-oval__label">
                {oval[0]}
                {oval.length > 1 ? (
                  <>
                    <br />
                    {oval.slice(1).join(" ")}
                  </>
                ) : null}
              </span>
            </button>
            <Link to="/#about" className="hero-who">
              {t(ui.home.aboutKicker)}
              <span className="hero-who__line" aria-hidden />
              <span aria-hidden className="rtl:rotate-180">
                →
              </span>
            </Link>
          </div>
          <div className="hero__foot">
            <p>{t(ui.home.trustLine)}</p>
            <p>{t(ui.home.doLead)}</p>
          </div>
        </div>
      </section>

      <section id="from-idea" className="idea section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.featuredKicker)}</p>
            <div className="idea-head">
              <h2 className="display max-w-xl text-[clamp(1.85rem,4.2vw,3.35rem)] leading-[1.15]">
                {t(ui.home.featuredTitle)}
              </h2>
              <button type="button" onClick={() => openLead()} className="idea-contact">
                {t(ui.home.featuredContact)}
              </button>
            </div>
          </Reveal>
          <div className="idea-list">
            {featured.map((service, index) => (
              <Reveal key={service.slug} delay={index * 70}>
                <Link to={`/services/${service.slug}`} className="idea-row">
                  <div className="idea-shot">
                    <img src={featuredShots[service.slug]} alt="" loading="lazy" />
                  </div>
                  <div className="idea-copy">
                    <p className="idea-no" dir="ltr">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3>{t(service.title)}</h3>
                      <p>{t(service.promise)}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="work section">
        <div className="wrap">
          <Reveal>
            <div className="work-head">
              <h2 className="kicker">{t(ui.home.workKicker)}</h2>
              <Link to="/portfolio" className="work-all">
                {t(ui.home.workAll)}
              </Link>
            </div>
          </Reveal>
          <WorkCarousel />
        </div>
      </section>

      <section id="about" className="about section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.aboutKicker)}</p>
            <h2 className="display mt-3 max-w-3xl text-[clamp(1.85rem,4.2vw,3.35rem)] leading-[1.15]">
              {t(ui.home.philosophyTitle)}
            </h2>
          </Reveal>
          <div className="about-copy">
            <p>
              <Marked
                text={t(ui.home.philosophyText)}
                marks={isAr ? ["رادار", "سلة", "زد"] : ["Radar", "Salla", "Zid"]}
              />
            </p>
            <div id="about-mission" className="about-block">
              <h3>{t(ui.home.missionTitle)}</h3>
              <p>
                <Marked
                  text={t(ui.home.missionText).trim()}
                  marks={isAr ? ["قوقل", "سناب", "تيك توك"] : ["Google", "Snapchat", "TikTok"]}
                />
              </p>
            </div>
            <div id="about-vision" className="about-block">
              <h3>{t(ui.home.visionTitle)}</h3>
              <p>
                <Marked
                  text={t(ui.home.visionText)}
                  marks={isAr ? ["بالريال", "الإعجابات"] : ["riyals", "likes"]}
                />
              </p>
            </div>
          </div>
          <div className="about-split">
            <blockquote className="about-quote">
              <p>{t(ui.home.shout)}</p>
              <footer>
                {t(ui.brand)}, {t(ui.home.fromRiyadh)}
              </footer>
            </blockquote>
            <figure className="about-side">
              <img src="/media/portrait.jpg" alt="" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section id="method-steps" className="section">
        <div className="wrap">
          <Reveal>
            <ProcessSteps />
          </Reveal>
        </div>
      </section>

      <ServicesStack />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <StatCards />
          </Reveal>
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

      <section className="section proof">
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

      <section id="journal" className="journal section">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t(ui.home.journalKicker)}</p>
            <h2 className="journal-title">{t(ui.home.journalIndex)}</h2>
          </Reveal>
          <div className="journal-list">
            {POSTS.slice(0, 3).map((post, index) => (
              <article key={post.slug} className="journal-row">
                <Link to={`/blog/${post.slug}`} className="journal-shot">
                  <img src={journalShot[index] ?? "/media/city.jpg"} alt="" loading="lazy" />
                </Link>
                <div className="journal-body">
                  <p className="journal-date">{t(post.date)}</p>
                  <h3>
                    <Link to={`/blog/${post.slug}`}>{t(post.title)}</Link>
                  </h3>
                  <p>{t(post.excerpt)}</p>
                  <Link to={`/blog/${post.slug}`} className="journal-more">
                    {t(ui.home.readMore)}
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link to="/blog" className="journal-all">
            {t(ui.home.allPosts)}
          </Link>
        </div>
      </section>
    </main>
  );
}
