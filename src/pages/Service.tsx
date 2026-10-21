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
    <main className="relative z-[1]">
      <PageHero kicker={t(ui.service.kicker)} title={title} lead={t(service.promise)}>
        <p className="mt-4 text-muted">
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
            className="btn-pill btn-night"
          >
            {t(ui.home.requestService)}
          </button>
          <a
            href={`${SITE.whatsapp}?text=${encodeURIComponent(`${t(ui.service.wa)} ${title}`)}`}
            className="btn-pill btn-line"
          >
            {t(ui.whatsapp)}
          </a>
        </div>
      </PageHero>

      <section className="section bg-paper pt-4">
        <div className="wrap">
          <Kicker>{t(ui.service.includes)}</Kicker>
          <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-2">
            {service.includes.map((item) => (
              <div key={item.title.en} className="border-t border-line pt-4">
                <h3 className="text-lg font-bold">{t(item.title)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{t(item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-paper pt-0">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <div>
            <Kicker tone="ink">{t(ui.service.why)}</Kicker>
            <p className="mt-4 text-lg leading-8 text-muted">{t(service.why)}</p>
          </div>
          <div className="grid gap-6">
            {service.stats.map((stat) => (
              <div key={stat.label.en} className="border-t border-line pt-4">
                <p className="display text-3xl" dir="ltr">
                  {t(stat.value)}
                </p>
                <p className="mt-1 text-sm text-muted">{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap pb-16">
        <Link to="/" className="text-muted no-underline hover:text-ink">
          ← {t(ui.service.back)}
        </Link>
      </div>
    </main>
  );
}
