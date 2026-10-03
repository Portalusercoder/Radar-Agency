import { Link, Navigate, useParams } from "react-router-dom";
import { Kicker } from "../components/Kicker";
import { PageHero } from "../components/PageHero";
import { ui } from "../copy";
import { getPost, POSTS } from "../data";
import { useI18n } from "../i18n";

export function Post() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  const { t } = useI18n();

  if (!post) return <Navigate to="/blog" replace />;

  const title = t(post.title);
  const related = POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      /* user cancelled share */
    }
  }

  return (
    <main>
      <PageHero
        kicker={`${t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)} · ${t(post.date)}`}
        title={title}
        lead={t(post.excerpt)}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <div className="space-y-5 text-lg leading-8 text-ink">
          {post.body.map((paragraph) => (
            <p key={paragraph.en}>{t(paragraph)}</p>
          ))}
        </div>
        <button type="button" onClick={share} className="btn-pill btn-on-light mt-10">
          {t(ui.blog.share)}
        </button>
      </article>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <Kicker>{t(ui.blog.more)}</Kicker>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}`} className="block no-underline">
                <h3 className="display text-xl text-ink">{t(item.title)}</h3>
                <p className="mt-2 text-muted">{t(item.excerpt)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
