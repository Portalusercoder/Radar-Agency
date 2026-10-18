import { useMemo, useState } from "react";
import { FigureCard } from "../components/FigureCard";
import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { POSTS, type PostCategory } from "../data";
import { useI18n } from "../i18n";

const cats: { key: "all" | PostCategory; label: typeof ui.blog.all }[] = [
  { key: "all", label: ui.blog.all },
  { key: "journal", label: ui.blog.journal },
  { key: "cases", label: ui.blog.cases },
];

const shots = ["/media/snap.jpg", "/media/bags.jpg", "/media/store.jpg", "/media/phone.jpg"];

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
    <main className="relative z-[1]">
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
            className="min-h-12 flex-1 rounded-full border border-line bg-paper px-5 text-night placeholder:text-muted"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-7">
          {cats.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setCat(item.key)}
              className={`tab ${cat === item.key ? "is-on" : ""}`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="section bg-paper pt-0">
        <div className="wrap">
        {results.length === 0 ? (
          <p className="py-12 text-muted">{t(ui.blog.empty)}</p>
        ) : (
          <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post, index) => (
              <FigureCard
                key={post.slug}
                to={`/blog/${post.slug}`}
                img={shots[index % shots.length]}
                tag={t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)}
                title={t(post.title)}
                text={t(post.excerpt)}
              />
            ))}
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
