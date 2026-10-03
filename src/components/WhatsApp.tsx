import { ui } from "../copy";
import { SITE } from "../data";
import { useI18n } from "../i18n";

export function WhatsApp() {
  const { t } = useI18n();
  return (
    <a
      href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waAsk))}`}
      className="fixed bottom-5 end-5 z-40 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-ink text-paper no-underline"
      aria-label={t(ui.whatsappAria)}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
        <path
          d="M5 12.4c0-3.7 3.1-6.9 7-6.9s7 3.2 7 6.9-3.1 6.9-7 6.9c-.7 0-1.4-.1-2-.3L5.8 20l.7-3.2A6.8 6.8 0 0 1 5 12.4Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M9 11.2h6M9 13.6h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </a>
  );
}
