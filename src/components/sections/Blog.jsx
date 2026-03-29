import FadeUp from "../ui/FadeUp";
import SectionHeader from "../ui/SectionHeader";
import { BLOG_POSTS } from "../../constants/data";
import styles from "./Blog.module.css";

function BlogCard({ tag, title, date, bg, emoji, index }) {
  return (
    <FadeUp delay={index * 100}>
      <article className={styles.card}>
        <div
          className={styles.thumb}
          style={{ background: bg }}
          aria-hidden="true"
        >
          {emoji}
        </div>
        <div className={styles.body}>
          <p className={styles.tag}>{tag}</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.meta}>{date} · 5 min read</p>
        </div>
      </article>
    </FadeUp>
  );
}

export default function Blog() {
  return (
    <section id="resources" aria-label="Blog resources">
      <FadeUp>
        <SectionHeader
          label="Resources"
          title={
            <>
              Insights for gym owners
              <br />
              who mean business.
            </>
          }
        />
      </FadeUp>

      <div className={styles.grid}>
        {BLOG_POSTS.map((post, i) => (
          <BlogCard key={post.title} {...post} index={i} />
        ))}
      </div>
    </section>
  );
}
