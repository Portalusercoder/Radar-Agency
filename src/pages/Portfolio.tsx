import { useMemo, useState } from "react";
import { FigureCard } from "../components/FigureCard";
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
    <main className="relative z-[1]">
      <PageHero kicker={t(ui.work.kicker)} title={t(ui.work.title)} lead={t(ui.work.lead)}>
        <div className="mt-10 flex flex-wrap gap-7" role="tablist" aria-label={t(ui.work.filter)}>
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={filter === item.key}
              onClick={() => setFilter(item.key)}
              className={`tab ${filter === item.key ? "is-on" : ""}`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="section bg-paper pt-0">
        <div className="wrap">
          {items.length === 0 ? (
            <p className="py-12 text-muted">
              {t(ui.work.empty)}{" "}
              <button type="button" onClick={() => openLead()} className="text-night underline">
                {t(ui.work.emptyCta)}
              </button>
            </p>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <FigureCard
                  key={item.id}
                  to={item.to}
                  img={item.img}
                  tag={t(ui.work[item.category])}
                  title={t(item.title)}
                  text={t(item.text)}
                  meta={<span className="text-xs text-muted">{t(item.city)}</span>}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
