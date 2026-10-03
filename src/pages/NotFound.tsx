import { Link } from "react-router-dom";
import { Kicker } from "../components/Kicker";
import { ui } from "../copy";
import { useI18n } from "../i18n";

export function NotFound() {
  const { t } = useI18n();

  return (
    <main className="flex min-h-[100svh] items-center bg-ink px-5 pt-24 text-paper md:px-8">
      <div className="mx-auto max-w-6xl">
        <Kicker light>404</Kicker>
        <h1 className="display mt-4 text-4xl md:text-6xl">{t(ui.notFound.title)}</h1>
        <p className="mt-4 max-w-md text-paper/60">{t(ui.notFound.text)}</p>
        <Link to="/" className="btn-pill btn-on-dark mt-8">
          {t(ui.notFound.home)}
        </Link>
      </div>
    </main>
  );
}
