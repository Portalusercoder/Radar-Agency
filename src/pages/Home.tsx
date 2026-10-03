import { Link } from "react-router-dom";
import { Kicker } from "../components/Kicker";
import { ui } from "../copy";
import { PACKAGES, POSTS, SERVICES, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

const scenes = [
  { src: "/media/snap.jpg", label: ui.home.sceneSocial },
  { src: "/media/store.jpg", label: ui.home.sceneStore },
  { src: "/media/city.jpg", label: ui.home.sceneCity },
];

export function Home() {
  const { openLead } = useLead();
  const { t } = useI18n();

  return (
    <main>
      <section className="hero-photo relative min-h-[100svh] overflow-hidden text-paper">
        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:justify-center md:px-8 md:pb-24 md:pt-28">
          <div className="hero-rise max-w-4xl">
            <Kicker light>{t(ui.home.heroKicker)}</Kicker>
            <p className="display mt-6 text-5xl text-paper md:text-7xl">{t(ui.brand)}</p>
            <h1 className="display mt-3 text-4xl text-paper md:text-6xl">{t(ui.home.h1)}</h1>
            <p className="mt-6 max-w-md text-base text-paper/70 md:text-lg">{t(ui.home.lead)}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => openLead()} className="btn-pill btn-on-dark">
                {t(ui.nav.start)}
              </button>
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waStart))}`}
                className="btn-pill btn-ghost-dark"
              >
                {t(ui.whatsapp)}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-sm text-muted">{t(ui.home.proofText)}</p>
          <Link to="/blog/case-laduun" className="shrink-0 text-sm text-ink no-underline">
            {t(ui.home.readCase)} →
          </Link>
        </div>
      </section>

      <section id="method" className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Kicker>{t(ui.home.aboutKicker)}</Kicker>
              <h2 className="display mt-4 text-3xl md:text-5xl">{t(ui.home.methodTitle)}</h2>
            </div>
            <a href="#method-steps" className="shrink-0 text-sm text-ink no-underline">
              {t(ui.home.aboutLink)} →
            </a>
          </div>

          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {scenes.map((scene) => (
              <figure key={scene.src}>
                <div className="scene aspect-[4/3]">
                  <img src={scene.src} alt="" />
                </div>
                <figcaption className="mt-3 text-sm text-muted">{t(scene.label)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <Kicker>{t(ui.home.numbersKicker)}</Kicker>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {ui.numbers.map((item) => (
              <div key={item.label.en}>
                <p className="display text-5xl md:text-6xl">{t(item.value)}</p>
                <p className="mt-3 max-w-[14rem] text-sm text-muted">{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="method-steps" className="bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Kicker>{t(ui.home.methodKicker)}</Kicker>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {ui.steps.map((step, index) => (
              <div key={step.title.en}>
                <p className="text-sm text-accent">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="display mt-3 text-2xl">{t(step.title)}</h3>
                <p className="mt-3 text-muted">{t(step.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Kicker light>{t(ui.home.servicesKicker)}</Kicker>
          <h2 className="display mt-4 text-3xl md:text-5xl">{t(ui.home.servicesTitle)}</h2>
          <ul className="mt-12 divide-y divide-white/10">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex flex-col gap-2 py-7 no-underline md:flex-row md:items-baseline md:justify-between"
                >
                  <span className="display text-2xl text-paper group-hover:text-paper/70">
                    {t(service.title)}
                  </span>
                  <span className="text-paper/50 md:text-end">
                    {service.customPrice
                      ? t(ui.home.customPrice)
                      : `${t(ui.home.from)} ${service.from} ${t(ui.home.sar)}`}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Kicker>{t(ui.home.packsKicker)}</Kicker>
          <h2 className="display mt-4 text-3xl md:text-5xl">{t(ui.home.packsTitle)}</h2>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {PACKAGES.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 py-10 md:grid-cols-[220px_1fr_auto] md:items-center"
              >
                <h3 className="display text-2xl">{t(item.name)}</h3>
                <p className="max-w-2xl text-muted">{t(item.text)}</p>
                <button
                  type="button"
                  onClick={() => openLead({ packageId: item.id })}
                  className="btn-pill btn-on-light justify-self-start md:justify-self-end"
                >
                  {t(ui.home.requestPack)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Kicker>{t(ui.home.journalKicker)}</Kicker>
              <h2 className="display mt-4 text-3xl md:text-4xl">{t(ui.home.journalTitle)}</h2>
            </div>
            <Link to="/blog" className="hidden text-sm text-ink no-underline md:inline">
              {t(ui.home.allPosts)} →
            </Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="block no-underline">
                <p className="text-sm text-muted">
                  {t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)}
                </p>
                <h3 className="display mt-2 text-xl text-ink">{t(post.title)}</h3>
                <p className="mt-3 text-muted">{t(post.excerpt)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
