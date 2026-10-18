import { Link } from "react-router-dom";
import { ui } from "../copy";
import { useI18n } from "../i18n";

export function NotFound() {
  const { t } = useI18n();

  return (
    <main className="relative z-[1] pt-32 pb-24">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1 className="display mt-4 max-w-2xl text-5xl md:text-7xl">{t(ui.notFound.title)}</h1>
        <p className="mt-4 max-w-md text-muted">{t(ui.notFound.text)}</p>
        <Link to="/" className="btn-pill btn-line mt-8">
          {t(ui.notFound.home)}
        </Link>
      </div>
    </main>
  );
}
