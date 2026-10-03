import { Link } from "react-router-dom";
import { ui } from "../copy";
import { useI18n } from "../i18n";

export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M10 36c11.2-2 18.6-9.2 20.6-20.6"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M10 36c5.6-.8 9.6-4.6 10.6-10.2"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="10" cy="36" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  const { t, isAr } = useI18n();
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 no-underline ${inverted ? "text-paper" : "text-ink"}`}
      aria-label={t(ui.brandHome)}
    >
      <Mark className="h-7 w-7" />
      <span
        className={`font-display font-semibold leading-none ${
          isAr ? "text-[1.45rem]" : "text-[1.2rem] tracking-[0.02em]"
        }`}
      >
        {t(ui.brand)}
      </span>
    </Link>
  );
}
