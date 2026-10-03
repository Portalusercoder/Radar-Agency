import { useMemo, useState } from "react";
import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { PORTFOLIO, type WorkCategory } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

const filters: { key: "all" | WorkCategory; label: typeof ui.work.all }[] = [
  { key: "all", label: ui.work.all },
  { key: "stores", label: ui.work.stores },
  { key: "social", label: ui.work.social },
  { key: "identity", label: ui.work.identity },
];

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const { openLead } = useLead();
  const { t } = useI18n();
  const items = useMemo(
    () => (filter === "all" ? PORTFOLIO : PORTFOLIO.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <main>
      <PageHero kicker={t(ui.work.kicker)} title={t(ui.work.title)} lead={t(ui.work.lead)}>
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label={t(ui.work.filter)}>
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`btn-pill ${
                filter === item.key ? "btn-on-dark" : "border border-white/20 text-paper"
              }`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {items.length === 0 ? (
          <p className="py-12 text-muted">
            {t(ui.work.empty)}{" "}
            <button type="button" onClick={() => openLead()} className="text-ink underline">
              {t(ui.work.emptyCta)}
            </button>
          </p>
        ) : (
          <div className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <article key={item.id} className="grid gap-4 py-10 md:grid-cols-[1fr_2fr]">
                <div>
                  <p className="kicker text-ink/50">{t(ui.work[item.category])}</p>
                  <h2 className="display mt-2 text-2xl">{t(item.title)}</h2>
                  <p className="mt-2 text-sm text-muted">{t(item.city)}</p>
                </div>
                <p className="text-lg text-muted">{t(item.text)}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
