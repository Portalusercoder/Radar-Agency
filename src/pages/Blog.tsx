import { useMemo, useState } from "react";
import { CtaBand } from "../components/CtaBand";
import { WorkCard } from "../components/WorkCard";
import { WorkHeading } from "../components/WorkHeading";
import { ui } from "../copy";
import { POSTS, type PostCategory } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

const cats: { key: "all" | PostCategory; label: typeof ui.blog.all }[] = [
  { key: "all", label: ui.blog.all },
  { key: "journal", label: ui.blog.journal },
  { key: "cases", label: ui.blog.cases },
];

const shots = ["/media/snap.jpg", "/media/bags.jpg", "/media/store.jpg", "/media/phone.jpg"];

export function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]["key"]>("all");
  const { t, isAr } = useI18n();
  const { openLead } = useLead();
  const locale = isAr ? "ar" : "en";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const byCat = cat === "all" || post.category === cat;
      const hay = `${post.title.ar} ${post.title.en} ${post.excerpt.ar} ${post.excerpt.en}`.toLowerCase();
      return byCat && (!q || hay.includes(q));
    });
  }, [query, cat]);

  return (
    <main className="wk relative z-[1]">
      <section className="wk-top">
        <div className="wrap work-show__head">
          <p className="work-show__meta">{t(ui.blog.metaTop)}</p>
          <WorkHeading lines={ui.blog.titleLines[locale]} isAr={isAr} />
          <p className="work-show__lead">{t(ui.blog.lead)}</p>

          <label className="sr-only" htmlFor="blog-search">
            {t(ui.blog.search)}
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(ui.blog.placeholder)}
            className="wk-search"
          />

          <div className="wk-filter" role="tablist" aria-label={t(ui.blog.filter)}>
            {cats.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={cat === item.key}
                onClick={() => setCat(item.key)}
                className={`wk-filter__btn${cat === item.key ? " is-on" : ""}`}
              >
                {t(item.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-grid-section">
        <div className="wrap">
          {results.length === 0 ? (
            <p className="py-12 text-muted">{t(ui.blog.empty)}</p>
          ) : (
            <div className="wk-grid">
              {results.map((post, index) => (
                <WorkCard
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  img={shots[index % shots.length]}
                  tag={t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)}
                  name={t(post.title)}
                  sub={t(post.date)}
                  text={t(post.excerpt)}
                  delay={(index % 3) * 80}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        meta={t(ui.blog.ctaMeta)}
        title={t(ui.blog.ctaTitle)}
        text={t(ui.blog.ctaText)}
        label={t(ui.nav.start)}
        onClick={() => openLead()}
      />
    </main>
  );
}
