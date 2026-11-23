import { ui } from "../copy";
import { useI18n } from "../i18n";

export function HeroCollage() {
  const { t, isAr } = useI18n();
  const partner = isAr ? ui.home.heroPartner.ar : ui.home.heroPartner.en;

  return (
    <div className="hero__visual">
      <div className="hero__photo">
        <div className="hero__photo-stage">
          <img src="/media/hero-stage.jpg?v=3" alt="" />
        </div>
        <img
          className="hero__photo-circle"
          src="/media/hero-circle.png?v=3"
          alt=""
        />
      </div>

      <aside className="hero__aside">
        <p className="hero__partner">
          {partner.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
        <a href="#numbers" className="hero-scroll">
          <span>{t(ui.home.scroll)}</span>
          <span className="hero-scroll__arrow" aria-hidden>
            ↓
          </span>
        </a>
      </aside>
    </div>
  );
}
