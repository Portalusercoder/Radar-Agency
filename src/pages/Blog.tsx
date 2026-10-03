import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { POSTS, type PostCategory } from "../data";
import { useI18n } from "../i18n";

const cats: { key: "all" | PostCategory; label: typeof ui.blog.all }[] = [
  { key: "all", label: ui.blog.all },
  { key: "journal", label: ui.blog.journal },
  { key: "cases", label: ui.blog.cases },
];

export function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]["key"]>("all");
  const { t } = useI18n();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const byCat = cat === "all" || post.category === cat;
      const hay = `${post.title.ar} ${post.title.en} ${post.excerpt.ar} ${post.excerpt.en}`.toLowerCase();
      return byCat && (!q || hay.includes(q));
    });
  }, [query, cat]);

  return (
    <main>
      <PageHero kicker={t(ui.blog.kicker)} title={t(ui.blog.title)}>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <label className="sr-only" htmlFor="blog-search">
            {t(ui.blog.search)}
          </label>
          <input
            id="blog-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(ui.blog.placeholder)}
            className="min-h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-paper placeholder:text-paper/40"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {cats.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setCat(item.key)}
              className={`btn-pill ${
                cat === item.key ? "btn-on-dark" : "border border-white/20 text-paper"
              }`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {results.length === 0 ? (
          <p className="py-12 text-muted">{t(ui.blog.empty)}</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            {results.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="block no-underline">
                <p className="text-sm text-muted">
                  {t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)} · {t(post.date)}
                </p>
                <h2 className="display mt-2 text-2xl text-ink">{t(post.title)}</h2>
                <p className="mt-3 text-muted">{t(post.excerpt)}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
