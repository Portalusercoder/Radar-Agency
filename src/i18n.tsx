import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ar" | "en";
export type Text = { ar: string; en: string };

type I18nContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  isAr: boolean;
  t: (text: Text) => string;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const TITLES: Text = {
  ar: "رادار | وكالة تسويق رقمية للسوق السعودي",
  en: "Radar | Digital marketing for the Saudi market",
};

const DESCRIPTIONS: Text = {
  ar: "وكالة رادار تدير حملاتك على سناب شات وتيك توك وقوقل، وتربطها بمتجرك على سلة أو زد. تقارير شهرية بالريال السعودي.",
  en: "Radar runs Snapchat, TikTok, and Google campaigns tied to your Salla or Zid store. Monthly reports in Saudi riyals.",
};

function readLocale(): Locale {
  if (typeof window === "undefined") return "ar";
  return window.localStorage.getItem("radar-locale") === "en" ? "en" : "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.title = TITLES[locale];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", DESCRIPTIONS[locale]);
    window.localStorage.setItem("radar-locale", locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleLocale = useCallback(
    () => setLocaleState((current) => (current === "ar" ? "en" : "ar")),
    [],
  );
  const t = useCallback((text: Text) => text[locale], [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      isAr: locale === "ar",
      t,
      setLocale,
      toggleLocale,
    }),
    [locale, t, setLocale, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
