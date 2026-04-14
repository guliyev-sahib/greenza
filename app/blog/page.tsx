"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "84px 60px 100px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "12px" }}>Bloq</p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(42px, 5vw, 64px)", fontWeight: 300, color: "#1a1a18", marginBottom: "34px" }}>
          Dəri baxımı haqqında yazılar
        </h1>

        <section className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {blogPosts.map((post) => (
            <article key={post.slug} style={{ background: "#fff", border: "1px solid #e8e3d8", padding: "26px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2C5E3A", border: "1px solid #c5deca", padding: "4px 10px", background: "#f0f7f2" }}>
                  {post.category}
                </span>
                <span style={{ fontSize: "12px", color: "#aaa" }}>{post.date}</span>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "34px", fontWeight: 400, color: "#1a1a18", lineHeight: 1.15, marginBottom: "10px" }}>
                {post.title}
              </h2>
              <p style={{ fontSize: "14px", fontWeight: 300, color: "#666", lineHeight: 1.7, marginBottom: "16px" }}>
                {post.description}
              </p>

              <Link href={`/blog/${post.slug}`} style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#2C5E3A", textDecoration: "none" }}>
                Oxu →
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

