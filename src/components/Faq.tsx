import { useId, useState } from "react";
import { ui } from "../copy";
import { useI18n } from "../i18n";
import type { Text } from "../i18n";

const FAQS: { q: Text; a: Text }[] = [
  {
    q: {
      ar: "وش الفرق بين رادار ووكالة إدارة حسابات عادية؟",
      en: "How is Radar different from a typical social agency?",
    },
    a: {
      ar: "ما نقيس بالإعجابات. نربط الإعلان بمتجرك على سلة أو زد، ونعدّل أسبوعيًا على تكلفة الطلب والعائد.",
      en: "We don’t optimize for likes. We tie ads to your Salla or Zid store and adjust weekly around cost per order and return.",
    },
  },
  {
    q: {
      ar: "هل لازم أبدأ بكل الخدمات مع بعض؟",
      en: "Do I need every service on day one?",
    },
    a: {
      ar: "لا. غالبًا نبدأ بقناة أو قناتين، نقيس، بعدين نوسّع اللي يبيع. الصرف يتبع الدليل مو الرغبة.",
      en: "No. We usually start with one or two channels, measure, then scale what sells. Budget follows evidence, not wishful coverage.",
    },
  },
  {
    q: {
      ar: "كم تحتاجون وقت عشان نشوف نتيجة؟",
      en: "How long before we see results?",
    },
    a: {
      ar: "الأسبوعين الأولين للاختبار والتعلّم. قراءة أوضح عادة بعد شهر من تشغيل مربوط بالمتجر والقياس.",
      en: "The first two weeks are for testing and learning. A clearer read usually comes after a month of tracked, store-linked running.",
    },
  },
  {
    q: {
      ar: "هل تشتغلون مع متاجر خارج الرياض؟",
      en: "Do you work with stores outside Riyadh?",
    },
    a: {
      ar: "نعم. مقرّنا الرياض، ونخدم منشآت في جدة والدمام وباقي المناطق عن بُعد مع تقارير واتساب واضحة.",
      en: "Yes. We’re based in Riyadh and serve businesses in Jeddah, Dammam, and beyond remotely — with clear WhatsApp reporting.",
    },
  },
  {
    q: {
      ar: "كيف تبدأ العلاقة معكم؟",
      en: "How do we get started?",
    },
    a: {
      ar: "تطلب استشارة، نفهم منتجك ومنصتك وميزانيتك، ونقترح نقطة بداية. التفاصيل والأسعار تتحدد بعد القراءة.",
      en: "Request a consult. We learn your product, platform, and budget, then propose a starting point. Scope and pricing follow that read.",
    },
  },
];

export function Faq() {
  const { t } = useI18n();
  const baseId = useId();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="faq section" aria-labelledby={`${baseId}-title`}>
      <div className="wrap faq__grid">
        <div className="faq__intro">
          <h2 id={`${baseId}-title`} className="faq__title">
            {t(ui.home.faqTitle)}
          </h2>
          <p className="faq__lead">{t(ui.home.faqLead)}</p>
        </div>

        <div className="faq__list">
          {FAQS.map((item, index) => {
            const expanded = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={item.q.en} className={`faq__item${expanded ? " is-open" : ""}`}>
                <h3 className="faq__q">
                  <button
                    id={buttonId}
                    type="button"
                    className="faq__trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span>{t(item.q)}</span>
                    <span className="faq__chev" aria-hidden>
                      {expanded ? "⌃" : "⌄"}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq__panel"
                  hidden={!expanded}
                >
                  <p>{t(item.a)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
