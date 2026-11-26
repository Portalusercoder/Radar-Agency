import { Navigate, useParams } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { WorkCard } from "../components/WorkCard";
import { ui } from "../copy";
import { getPost, POSTS } from "../data";
import { useI18n } from "../i18n";
import { useLead } from "../lead";

const shots = ["/media/snap.jpg", "/media/bags.jpg", "/media/store.jpg", "/media/city.jpg"];

export function Post() {
  const { slug = "" } = useParams();
  const post = getPost(slug);
  const { t } = useI18n();
  const { openLead } = useLead();

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
    <main className="wk relative z-[1]">
      <section className="wk-top wk-post-top">
        <div className="wrap wk-post-head">
          <p className="work-show__meta">
            {t(post.category === "cases" ? ui.blog.cases : ui.blog.journal)} · {t(post.date)}
          </p>
          <h1 className="svx-title wk-post-title">{title}</h1>
          <p className="work-show__lead">{t(post.excerpt)}</p>
        </div>
      </section>

      <article className="wk-article">
        <div className="wk-article__body">
          {post.body.map((paragraph) => (
            <p key={paragraph.en}>{t(paragraph)}</p>
          ))}
        </div>
        <button type="button" onClick={share} className="btn-pill btn-line wk-article__share">
          {t(ui.blog.share)}
        </button>
      </article>

      <section className="wk-grid-section">
        <div className="wrap">
          <p className="work-show__meta wk-related-meta">{t(ui.blog.more)}</p>
          <div className="wk-grid">
            {related.map((item, index) => (
              <WorkCard
                key={item.slug}
                to={`/blog/${item.slug}`}
                img={shots[index % shots.length]}
                tag={t(item.category === "cases" ? ui.blog.cases : ui.blog.journal)}
                name={t(item.title)}
                sub={t(item.date)}
                text={t(item.excerpt)}
                delay={index * 80}
              />
            ))}
          </div>
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
