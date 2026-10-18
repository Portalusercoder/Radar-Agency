import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { useI18n } from "../i18n";

export function Contract() {
  const { t } = useI18n();

  return (
    <main className="relative z-[1]">
      <PageHero title={t(ui.contract.title)} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:pb-24">
        <h2 className="display text-2xl">{t(ui.contract.signTitle)}</h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-muted">
          {ui.contract.sign.map((item) => (
            <li key={item.en}>{t(item)}</li>
          ))}
        </ul>
        <h2 className="display mt-10 text-2xl">{t(ui.contract.cancelTitle)}</h2>
        <ul className="mt-3 list-disc space-y-2 ps-5 text-muted">
          {ui.contract.cancel.map((item) => (
            <li key={item.en}>{t(item)}</li>
          ))}
        </ul>
      </article>
    </main>
  );
}
