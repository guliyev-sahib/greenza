"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { blogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const slugValue = Array.isArray(slug) ? slug[0] : slug;
  const post = blogPosts.find((p) => p.slug === slugValue);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5F2E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "70px", color: "#2C5E3A", opacity: 0.3 }}>404</p>
          <p style={{ color: "#777", marginBottom: "20px" }}>Məqalə tapılmadı</p>
          <Link href="/blog" style={{ color: "#2C5E3A", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "12px" }}>
            ← Bloqa qayıt
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />
      <main className="max-w section-pad" style={{ maxWidth: "980px", margin: "0 auto", padding: "84px 60px 100px" }}>
        <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "18px" }}>
          <Link href="/blog" style={{ color: "#aaa", textDecoration: "none" }}>Bloq</Link> · {post.title}
        </p>

        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2C5E3A", border: "1px solid #c5deca", padding: "4px 10px", background: "#f0f7f2" }}>
            {post.category}
          </span>
          <span style={{ fontSize: "12px", color: "#aaa" }}>{post.date}</span>
          <span style={{ fontSize: "12px", color: "#aaa" }}>· Greenza team</span>
        </div>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 62px)", fontWeight: 300, color: "#1a1a18", lineHeight: 1.04, marginBottom: "24px" }}>
          {post.title}
        </h1>

        <article style={{ display: "grid", gap: "18px", marginBottom: "64px" }}>
          {post.content.map((paragraph, index) => (
            <p key={index} style={{ fontSize: "16px", fontWeight: 300, color: "#555", lineHeight: 1.9 }}>
              {paragraph}
            </p>
          ))}
        </article>

        <section style={{ borderTop: "1px solid #e8e3d8", paddingTop: "28px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "#1a1a18", fontWeight: 300, marginBottom: "16px" }}>
            Oxşar məqalələr
          </h2>
          <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} style={{ background: "#fff", border: "1px solid #e8e3d8", padding: "18px", textDecoration: "none", color: "inherit" }}>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#2C5E3A", marginBottom: "8px" }}>{item.category}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#1a1a18", marginBottom: "8px", fontWeight: 400 }}>{item.title}</h3>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6 }}>{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

