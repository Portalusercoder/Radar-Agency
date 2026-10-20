import { Link } from "react-router-dom";
import { ui } from "../copy";
import { PORTFOLIO } from "../data";
import { useI18n } from "../i18n";

export function WorkCarousel() {
  const { t } = useI18n();

  return (
    <div className="work-stage">
      <ul className="work-list">
        {PORTFOLIO.map((item, index) => (
          <li key={item.id}>
            <Link to={item.to ?? "/portfolio"} className="work-row">
              <span className="work-preview" aria-hidden>
                <img src={item.img} alt="" loading="lazy" />
              </span>
              <span className="work-name">{t(item.title)}</span>
              <span className="work-meta">
                <span>{t(ui.work[item.category])}</span>
                <span dir="ltr">/{String(index + 1).padStart(3, "0")}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
