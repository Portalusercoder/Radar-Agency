import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { PACKAGES, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

export function Packages() {
  const { openLead } = useLead();
  const { t } = useI18n();

  return (
    <main className="relative z-[1]">
      <PageHero kicker={t(ui.home.packsKicker)} title={t(ui.home.packsBannerTitle)} lead={t(ui.home.packsLead)} />

      <section className="section bg-paper pt-0">
        <div className="wrap">
          <div className="divide-y divide-line border-y border-line">
            {PACKAGES.map((item, index) => (
              <article key={item.id} className="grid gap-5 py-10 md:grid-cols-[7rem_14rem_1fr_auto] md:items-center">
                <p className="service-no" dir="ltr">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="text-2xl font-semibold">{t(item.name)}</h2>
                <p className="max-w-xl text-sm leading-7 text-muted">{t(item.text)}</p>
                <button
                  type="button"
                  onClick={() => openLead({ packageId: item.id })}
                  className="btn-pill btn-line justify-self-start md:justify-self-end"
                >
                  {t(ui.home.requestPack)}
                </button>
              </article>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openLead()} className="btn-pill btn-night">
              {t(ui.home.joinCta)}
            </button>
            <a
              href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waAsk))}`}
              className="btn-pill btn-ghost"
            >
              {t(ui.whatsapp)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
