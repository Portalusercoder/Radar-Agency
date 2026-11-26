import { useMemo, useState } from "react";
import { CtaBand } from "../components/CtaBand";
import { WorkCard } from "../components/WorkCard";
import { WorkHeading } from "../components/WorkHeading";
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
  const { t, isAr } = useI18n();
  const locale = isAr ? "ar" : "en";

  const items = useMemo(
    () => (filter === "all" ? PORTFOLIO : PORTFOLIO.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <main className="wk relative z-[1]">
      <section className="wk-top">
        <div className="wrap work-show__head">
          <p className="work-show__meta">{t(ui.work.metaTop)}</p>
          <WorkHeading lines={ui.work.titleLines[locale]} isAr={isAr} />
          <p className="work-show__lead">{t(ui.work.lead)}</p>

          <div className="wk-filter" role="tablist" aria-label={t(ui.work.filter)}>
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={filter === item.key}
                onClick={() => setFilter(item.key)}
                className={`wk-filter__btn${filter === item.key ? " is-on" : ""}`}
              >
                {t(item.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-grid-section">
        <div className="wrap">
          {items.length === 0 ? (
            <p className="py-12 text-muted">
              {t(ui.work.empty)}{" "}
              <button type="button" onClick={() => openLead()} className="text-ink underline">
                {t(ui.work.emptyCta)}
              </button>
            </p>
          ) : (
            <div className="wk-grid">
              {items.map((item, index) => (
                <WorkCard
                  key={item.id}
                  to={item.to ?? "/portfolio"}
                  img={item.img}
                  tag={t(ui.work[item.category])}
                  name={t(item.title)}
                  sub={`${t(item.city)} · ${t(item.date)}`}
                  text={t(item.text)}
                  delay={(index % 3) * 80}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        meta={t(ui.work.ctaMeta)}
        title={t(ui.work.ctaTitle)}
        text={t(ui.work.ctaText)}
        label={t(ui.nav.start)}
        onClick={() => openLead()}
      />
    </main>
  );
}
