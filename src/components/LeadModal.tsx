import { useEffect, useId, useState, type FormEvent } from "react";
import { ui } from "../copy";
import { PACKAGES, SERVICE_OPTIONS, SITE } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";
import { Kicker } from "./Kicker";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadModal() {
  const { open, closeLead, prefill } = useLead();
  const { t } = useI18n();
  const titleId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(prefill.service ?? "ads");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      setService(prefill.service ?? "ads");
      setStatus("idle");
      setMessage("");
    }
  }, [open, prefill.service]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLead();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeLead]);

  if (!open) return null;

  const selectedPack = PACKAGES.find((item) => item.id === prefill.packageId);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 14) {
      setStatus("error");
      setMessage(t(ui.lead.phoneError));
      return;
    }
    setStatus("submitting");
    setMessage("");
    window.setTimeout(() => setStatus("success"), 600);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label={t(ui.lead.close)}
        onClick={closeLead}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="panel relative w-full max-w-md p-8"
      >
        {status === "success" ? (
          <div className="py-6 text-center">
            <p id={titleId} className="display text-3xl">
              {t(ui.lead.success)}
            </p>
            <p className="mt-3 text-muted">{t(ui.lead.successText)}</p>
            <button type="button" onClick={closeLead} className="btn-pill btn-line mt-8">
              {t(ui.lead.close)}
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <Kicker>{t(ui.lead.request)}</Kicker>
            <h2 id={titleId} className="display mt-2 text-3xl">
              {t(ui.lead.title)}
            </h2>
            {selectedPack ? (
              <p className="mt-2 text-sm text-muted">{t(selectedPack.name)}</p>
            ) : null}

            <label className="mt-6 block text-sm text-muted" htmlFor="lead-name">
              {t(ui.lead.name)}
            </label>
            <input
              id="lead-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field mt-1 min-h-11 w-full rounded-full px-4"
            />

            <label className="mt-4 block text-sm text-muted" htmlFor="lead-service">
              {t(ui.lead.service)}
            </label>
            <select
              id="lead-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="field mt-1 min-h-11 w-full rounded-full px-4"
            >
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.label)}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-sm text-muted" htmlFor="lead-phone">
              {t(ui.lead.phone)}
            </label>
            <div className="field mt-1 flex rounded-full">
              <span className="flex min-h-11 items-center px-3 text-sm text-muted" dir="ltr">
                +966
              </span>
              <input
                id="lead-phone"
                required
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="5xxxxxxxx"
                className="min-h-11 w-full bg-transparent px-3"
                dir="ltr"
              />
            </div>

            {status === "error" ? (
              <p className="mt-3 text-sm text-accent" role="alert">
                {message}
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted">{t(ui.lead.hint)}</p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-pill btn-corn flex-1 disabled:opacity-60"
              >
                {status === "submitting" ? t(ui.lead.sending) : t(ui.lead.send)}
              </button>
              <a
                href={`${SITE.whatsapp}?text=${encodeURIComponent(t(ui.waStart))}`}
                className="text-sm text-ink no-underline"
              >
                {t(ui.whatsapp)}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
