import { Link, Navigate, useParams } from "react-router-dom";
import { Kicker } from "../components/Kicker";
import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { getService, serviceLeadValue, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

export function Service() {
  const { slug = "" } = useParams();
  const service = getService(slug);
  const { openLead } = useLead();
  const { t } = useI18n();

  if (!service) return <Navigate to="/" replace />;

  const title = t(service.title);

  return (
    <main>
      <PageHero kicker={t(ui.service.kicker)} title={title} lead={t(service.promise)}>
        <p className="mt-4 text-paper/70">
          {service.customPrice ? (
            t(ui.home.customPrice)
          ) : (
            <>
              {t(ui.home.from)} {service.from} {t(ui.home.sar)}
            </>
          )}{" "}
          {t(ui.service.vat)}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => openLead({ service: serviceLeadValue(slug) })}
            className="btn-pill btn-on-dark"
          >
            {t(ui.service.book)}
          </button>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(`${t(ui.service.wa)} ${title}`)}`}
            className="btn-pill btn-ghost-dark"
          >
            {t(ui.whatsapp)}
          </a>
        </div>
      </PageHero>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <Kicker>{t(ui.service.includes)}</Kicker>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {service.includes.map((item) => (
              <div key={item.title.en}>
                <h3 className="display text-xl">{t(item.title)}</h3>
                <p className="mt-2 text-muted">{t(item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <Kicker>{t(ui.service.why)}</Kicker>
            <p className="mt-4 text-lg text-muted">{t(service.why)}</p>
          </div>
          <div className="grid gap-8">
            {service.stats.map((stat) => (
              <div key={stat.label.en} className="border-t border-line pt-4">
                <p className="display text-3xl">{t(stat.value)}</p>
                <p className="mt-1 text-muted">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <Link to="/" className="text-muted no-underline hover:text-ink">
          ← {t(ui.service.back)}
        </Link>
      </div>
    </main>
  );
}
