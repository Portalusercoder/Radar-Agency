import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ui } from "../copy";
import { useI18n } from "../i18n";
import "./WhoWeAre.css";

gsap.registerPlugin(ScrollTrigger);

/** Phase durations as shares of the master timeline (sum ≈ 1). Easy to tweak. */
const PHASE = {
  title: 0.2,
  toMission: 0.25,
  toVision: 0.25,
  exit: 0.15,
  quote: 0.1,
  hold: 0.05,
} as const;

function splitWords(text: string, locale: string) {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(locale, { granularity: "word" }).segment(text)].map((part) => part.segment);
  }
  return text.split(/(\s+)/).filter(Boolean);
}

function MaskLine({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`wwa-mask ${className}`.trim()}>
      <span className="wwa-line">{text}</span>
    </span>
  );
}

export function WhoWeAre() {
  const { t, isAr } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const citeRef = useRef<HTMLElement>(null);

  const content = useMemo(
    () => ({
      title: t(ui.home.aboutKicker),
      scroll: isAr ? "مرّر" : "Scroll",
      missionLabel: t(ui.home.missionTitle),
      mission: t(ui.home.missionText).trim(),
      visionLabel: t(ui.home.visionTitle),
      vision: t(ui.home.visionText).trim(),
      quote: t(ui.home.shout),
      attribution: `${t(ui.brand)}, ${t(ui.home.fromRiyadh)}`,
    }),
    [t, isAr],
  );

  const locale = isAr ? "ar" : "en";
  const missionWords = useMemo(() => splitWords(content.mission, locale), [content.mission, locale]);
  const visionWords = useMemo(() => splitWords(content.vision, locale), [content.vision, locale]);
  const quoteLines = useMemo(() => {
    // Keep Arabic as one flowing line; EN split into short centered lines.
    if (isAr) return [content.quote];
    const words = content.quote.split(/\s+/);
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")].filter(Boolean);
  }, [content.quote, isAr]);

  useEffect(() => {
    const root = rootRef.current;
    const bg = bgRef.current;
    const title = titleRef.current;
    const hint = hintRef.current;
    const mission = missionRef.current;
    const vision = visionRef.current;
    const quote = quoteRef.current;
    const cite = citeRef.current;
    if (!root || !bg || !title || !hint || !mission || !vision || !quote || !cite) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      root.classList.add("wwa--static");
      return;
    }

    const titleLines = title.querySelectorAll<HTMLElement>(".wwa-line");
    const missionWordsEls = mission.querySelectorAll<HTMLElement>(".wwa-word");
    const visionWordsEls = vision.querySelectorAll<HTMLElement>(".wwa-word");
    const quoteLinesEls = quote.querySelectorAll<HTMLElement>(".wwa-line");
    const missionLabel = mission.querySelector<HTMLElement>(".wwa-label");
    const visionLabel = vision.querySelector<HTMLElement>(".wwa-label");

    let bob: gsap.core.Tween | null = null;
    let ctx: gsap.Context | null = null;

    const build = (pinEnd: string) => {
      ctx?.revert();
      bob?.kill();

      gsap.set([title, hint, mission, vision, quote, cite], { clearProps: "all" });
      gsap.set([title, hint], { color: "#14161c" });
      gsap.set(titleLines, { yPercent: 110, opacity: 0, filter: "blur(12px)", force3D: true });
      gsap.set(hint, { opacity: 0, y: 12 });
      gsap.set(mission, { opacity: 0, y: 40, filter: "blur(8px)" });
      gsap.set(vision, { opacity: 0, y: 40, filter: "blur(8px)" });
      gsap.set([missionLabel, visionLabel], { opacity: 0 });
      gsap.set([missionWordsEls, visionWordsEls], { opacity: 0.15 });
      gsap.set(quoteLinesEls, { yPercent: 110, opacity: 0 });
      gsap.set(cite, { opacity: 0, y: 10 });
      gsap.set(bg, { backgroundColor: "var(--wwa-page)" });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: {
            trigger: root,
            pin: true,
            scrub: 1,
            start: "top top",
            end: pinEnd,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // —— Phase 1: Lock + title (0 → title) ——
        tl.addLabel("title", 0);
        tl.to(
          bg,
          { backgroundColor: "var(--brand)", duration: PHASE.title, ease: "power2.inOut" },
          "title",
        );
        tl.to([title, hint], { color: "#ffffff", duration: PHASE.title * 0.45, ease: "power2.inOut" }, "title");
        tl.to(
          titleLines,
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: PHASE.title * 0.7,
            stagger: 0.08,
            ease: "expo.out",
          },
          "title+=0.02",
        );
        tl.to(hint, { opacity: 1, y: 0, duration: PHASE.title * 0.35, ease: "power2.out" }, "title+=0.12");

        // —— Phase 2: Title → Mission ——
        tl.addLabel("mission", ">");
        tl.to(hint, { opacity: 0, y: -8, duration: PHASE.toMission * 0.2 }, "mission");
        tl.to(
          title,
          {
            scale: 0.92,
            opacity: 0,
            yPercent: -20,
            filter: "blur(10px)",
            duration: PHASE.toMission * 0.55,
            ease: "power2.inOut",
          },
          "mission",
        );
        tl.to(mission, { opacity: 1, y: 0, filter: "blur(0px)", duration: PHASE.toMission * 0.35, ease: "power2.out" }, "mission+=0.15");
        tl.to(missionLabel, { opacity: 1, duration: PHASE.toMission * 0.2, ease: "power2.out" }, "mission+=0.18");
        tl.to(
          missionWordsEls,
          { opacity: 1, duration: PHASE.toMission * 0.55, stagger: 0.018, ease: "none" },
          "mission+=0.22",
        );

        // —— Phase 3: Mission → Vision ——
        tl.addLabel("vision", ">");
        tl.to(
          mission,
          { opacity: 0, y: -36, filter: "blur(10px)", duration: PHASE.toVision * 0.4, ease: "power2.inOut" },
          "vision",
        );
        tl.to(vision, { opacity: 1, y: 0, filter: "blur(0px)", duration: PHASE.toVision * 0.35, ease: "power2.out" }, "vision+=0.12");
        tl.to(visionLabel, { opacity: 1, duration: PHASE.toVision * 0.2, ease: "power2.out" }, "vision+=0.15");
        tl.to(
          visionWordsEls,
          { opacity: 1, duration: PHASE.toVision * 0.55, stagger: 0.018, ease: "none" },
          "vision+=0.18",
        );

        // —— Phase 4: Everything exits ——
        tl.addLabel("exit", ">");
        tl.to(
          vision,
          { opacity: 0, y: -40, filter: "blur(12px)", duration: PHASE.exit * 0.7, ease: "power2.inOut" },
          "exit",
        );
        tl.to(bg, { backgroundColor: "var(--brand-dark)", duration: PHASE.exit, ease: "power2.inOut" }, "exit");

        // —— Phase 5: Closing quote + hold ——
        tl.addLabel("quote", ">");
        tl.to(
          quoteLinesEls,
          {
            yPercent: 0,
            opacity: 1,
            duration: PHASE.quote * 0.7,
            stagger: 0.1,
            ease: "expo.out",
          },
          "quote",
        );
        tl.to(cite, { opacity: 1, y: 0, duration: PHASE.quote * 0.35, ease: "power2.out" }, "quote+=0.12");
        tl.to({}, { duration: PHASE.hold }, ">");
      }, root);

      bob = gsap.to(hint.querySelector(".wwa-hint__bob"), {
        y: 8,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    };

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      build("+=500%");
      return () => {
        bob?.kill();
        ctx?.revert();
      };
    });
    mm.add("(max-width: 767px)", () => {
      build("+=400%");
      return () => {
        bob?.kill();
        ctx?.revert();
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      bob?.kill();
      mm.revert();
      ctx?.revert();
    };
  }, [content, missionWords, visionWords, quoteLines, isAr]);

  return (
    <section
      id="who-we-are"
      ref={rootRef}
      className="wwa"
      aria-label={content.title}
      style={
        {
          ["--brand"]: "#5070ff",
          ["--brand-dark"]: "#14161c",
          ["--wwa-page"]: "#ffffff",
          ["--wwa-text"]: "#ffffff",
          ["--wwa-muted"]: "rgb(255 255 255 / 0.55)",
        } as CSSProperties
      }
    >
      <div className="wwa-stage">
        <div className="wwa-bg" ref={bgRef} aria-hidden />

        <h2 className="wwa-title" ref={titleRef}>
          <MaskLine text={content.title} />
        </h2>

        <p className="wwa-hint" ref={hintRef}>
          <span className="wwa-hint__bob">
            <span>{content.scroll}</span>
            <span className="wwa-hint__line" aria-hidden />
          </span>
        </p>

        <div className="wwa-block wwa-mission" ref={missionRef}>
          <p className="wwa-label">{content.missionLabel}</p>
          <p className="wwa-copy">
            {missionWords.map((word, index) => (
              <span key={`m-${index}`} className="wwa-word">
                {word}
              </span>
            ))}
          </p>
        </div>

        <div className="wwa-block wwa-vision" ref={visionRef}>
          <p className="wwa-label">{content.visionLabel}</p>
          <p className="wwa-copy">
            {visionWords.map((word, index) => (
              <span key={`v-${index}`} className="wwa-word">
                {word}
              </span>
            ))}
          </p>
        </div>

        <blockquote className="wwa-quote" ref={quoteRef}>
          {quoteLines.map((line) => (
            <MaskLine key={line} text={line} className="wwa-quote__line" />
          ))}
          <cite className="wwa-cite" ref={citeRef}>
            {content.attribution}
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
