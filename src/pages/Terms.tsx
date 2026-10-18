import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { useI18n } from "../i18n";

export function Terms() {
  const { t } = useI18n();

  return (
    <main className="relative z-[1]">
      <PageHero title={t(ui.terms.title)} lead={t(ui.terms.intro)} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:pb-24">
        <h2 className="display text-2xl">{t(ui.terms.useTitle)}</h2>
        <p className="mt-3 text-muted">{t(ui.terms.useText)}</p>
        <h2 className="display mt-10 text-2xl">{t(ui.terms.payTitle)}</h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-muted">
          {ui.terms.pay.map((item) => (
            <li key={item.en}>{t(item)}</li>
          ))}
        </ul>
        <h2 className="display mt-10 text-2xl">{t(ui.terms.privacyTitle)}</h2>
        <p className="mt-3 text-muted">{t(ui.terms.privacy)}</p>
        <h2 className="display mt-10 text-2xl">{t(ui.terms.lawTitle)}</h2>
        <p className="mt-3 text-muted">{t(ui.terms.law)}</p>
      </article>
    </main>
  );
}
