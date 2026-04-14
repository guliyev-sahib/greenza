"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
        }),
      { threshold: 0.15 }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const ref = (id: string) => (el: HTMLElement | null) => {
    refs.current[id] = el;
  };

  const fadeIn = (id: string, delay = 0) => ({
    id,
    ref: ref(id),
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; color: #1a1a18; -webkit-font-smoothing: antialiased; }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        
        .spin { animation: spin 22s linear infinite; }
        .float { animation: float 5s ease-in-out infinite; }
        
        .hero-word {
          display: block;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeIn 0.8s ease forwards;
        }
        .hero-word:nth-child(1) { animation-delay: 0.1s; }
        .hero-word:nth-child(2) { animation-delay: 0.25s; }
        .hero-word:nth-child(3) { animation-delay: 0.4s; }
        
        .product-card {
          background: #fff;
          border: 1px solid #e8e3d8;
          padding: 40px 36px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: default;
        }
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(44,94,58,0.1);
          border-color: #2C5E3A;
        }
        
        .btn-green {
          display: inline-block;
          background: #2C5E3A;
          color: #F5F2E8;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 36px;
          border: none;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
          text-decoration: none;
        }
        .btn-green:hover { background: #1e4228; transform: translateY(-1px); }
        
        .btn-outline {
          display: inline-block;
          background: transparent;
          color: #2C5E3A;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 13px 36px;
          border: 1px solid #2C5E3A;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .btn-outline:hover { background: #2C5E3A; color: #F5F2E8; }
        
        .ingredient-tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2C5E3A;
          border: 1px solid #c5deca;
          padding: 6px 14px;
          margin: 4px;
          background: #f0f7f2;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
      `}</style>

      <Navbar />

      <section
        className="hero-section max-w"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "100px 60px 60px",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "80px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter'",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2C5E3A",
              marginBottom: "32px",
              opacity: 0,
              animation: "fadeIn 0.6s ease 0.05s forwards",
            }}
          >
            Təbii baxım kolleksiyası
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(52px, 6vw, 80px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#1a1a18",
              marginBottom: "32px",
            }}
          >
            <span className="hero-word">Zərərsiz.</span>
            <span className="hero-word" style={{ color: "#2C5E3A" }}>
              Təbii.
            </span>
            <span className="hero-word" style={{ color: "#666" }}>
              Effektiv.
            </span>
          </h1>
          <p
            style={{
              fontSize: "13px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: "28px",
              opacity: 0,
              animation: "fadeIn 0.7s ease 0.5s forwards",
            }}
          >
            Sabunlar · Skrablar · Nəmləndiricilar
          </p>
          <p
            style={{
              fontFamily: "'Inter'",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "#555",
              maxWidth: "420px",
              marginBottom: "40px",
              opacity: 0,
              animation: "fadeIn 0.7s ease 0.6s forwards",
            }}
          >
            Xalis təbii inqrediyentlər ilə əl ilə hazırlanmış məhsullar. 21 günə dərini dəyişdir.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", opacity: 0, animation: "fadeIn 0.7s ease 0.75s forwards" }}>
            <Link href="/products" className="btn-green">
              Məhsullara Bax
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", opacity: 0, animation: "fadeIn 1s ease 0.3s forwards" }}>
          <div className="float hero-visual-wrap" style={{ position: "relative", width: "480px", height: "480px" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid rgba(44,94,58,0.15)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(44,94,58,0.1)",
                background: "radial-gradient(circle, rgba(44,94,58,0.04) 0%, transparent 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: "70px",
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #e8e3d8",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                boxShadow: "0 20px 60px rgba(44,94,58,0.12), 0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              <div className="spin">
                <GreenzaIcon size={140} color="#2C5E3A" />
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 400, color: "#2C5E3A", letterSpacing: "0.04em" }}>
                Greenza
              </span>
            </div>
            {[
              { top: "10%", left: "15%", size: 6, delay: "0s" },
              { top: "20%", right: "10%", size: 4, delay: "1s" },
              { bottom: "15%", left: "10%", size: 5, delay: "2s" },
              { bottom: "20%", right: "15%", size: 3, delay: "0.5s" },
            ].map((dot, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...(dot as any),
                  width: dot.size,
                  height: dot.size,
                  borderRadius: "50%",
                  background: "#2C5E3A",
                  opacity: 0.3,
                  animation: `float ${3 + i * 0.7}s ease-in-out ${dot.delay} infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop:"1px solid #e8e3d8", borderBottom:"1px solid #e8e3d8" }}>
        <div className="stats-strip" style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 60px", display:"flex" }}>
          {[
            { num: "79+", label: "Məhsul" },
            { num: "928", label: "Məmnun müştəri" },
            { num: "🌍", label: "Dünya üzrə çatdırılma" },
          ].map((s, i) => (
            <div key={i} style={{ flex:1, padding:"28px 0", display:"flex", alignItems:"center", gap:"16px", borderRight: i < 2 ? "1px solid #e8e3d8" : "none", paddingLeft: i > 0 ? "40px" : "0" }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color:"#2C5E3A", lineHeight:1 }}>{s.num}</span>
              <span style={{ fontSize:"13px", fontWeight:300, color:"#666", letterSpacing:"0.04em" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section id="products" className="max-w section-pad" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 60px" }}>
        <div {...fadeIn("prod-title")} style={{ textAlign: "center", marginBottom: "60px", ...fadeIn("prod-title").style }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "16px" }}>Kolleksiya</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: "#1a1a18" }}>Bizim Məhsullar</h2>
        </div>
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#e8e3d8" }}>
          {[
            {
              name: "Sabunlar",
              az: "Soap Collection",
              desc: "Əl ilə hazırlanmış, 100% təbii sabunlar. Dərini yumşaldır, rəngini bərabərləşdirir.",
              tags: ["Zeytun Yağı", "Lavanda", "Aromatik Bitkilər"],
              icon: "◈",
            },
            {
              name: "Skrablar",
              az: "Scrub Collection",
              desc: "Ölü dəri hüceyrələrini təmizləyir, dərini parlatır. Həftəda 2-3 dəfə istifadə et.",
              tags: ["Argan Yağı", "Dəniz Duzu", "Aloe Vera"],
              icon: "◇",
            },
            {
              name: "Nəmləndiricilar",
              az: "Moisturizer Collection",
              desc: "Dərinin dərin qatlarına nəm verir. Gündəlik baxım üçün ideal.",
              tags: ["Bal", "Şəkərkadifu", "Camomile"],
              icon: "○",
            },
          ].map((p, i) => (
            <div key={i} className="product-card">
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", color: "#2C5E3A", opacity: 0.3, marginBottom: "24px", lineHeight: 1 }}>
                {p.icon}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 400, color: "#2C5E3A", marginBottom: "4px" }}>{p.name}</h3>
              <p style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: "20px" }}>{p.az}</p>
              <div style={{ width: "32px", height: "1px", background: "#2C5E3A", opacity: 0.3, marginBottom: "20px" }} />
              <p style={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.7, color: "#555", marginBottom: "28px" }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0", marginBottom: "-4px" }}>
                {p.tags.map((t) => (
                  <span key={t} className="ingredient-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", borderTop: "1px solid #e8e3d8" }}>
        <div className="max-w section-pad ritual-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>
          <div {...fadeIn("days-left")} style={fadeIn("days-left").style}>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "16px" }}>Nəticə</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 300, color: "#1a1a18", lineHeight: 1.1, marginBottom: "24px" }}>
              21 günə
              <br />
              <em style={{ fontStyle: "italic", color: "#2C5E3A" }}>şüşə kimi</em> dəri
            </h2>
            <p style={{ fontSize: "15px", fontWeight: 300, lineHeight: 1.8, color: "#555", marginBottom: "40px" }}>
              Sadə 3 addımlı rutin ilə 21 günə dərinin görünüşünü tamamilə dəyişdir. Ləkə, sızanaq, quru dəri - hamısına həll.
            </p>
            <a href="https://wa.me/994518754538" className="btn-green btn-full-mobile">
              İndi Başla
            </a>
          </div>
          <div {...fadeIn("days-right")} style={fadeIn("days-right").style}>
            {[
              { n: "01", title: "Təmizlə", desc: "Hər gün səhər və axşam təbii sabunla üzünü yumaq." },
              { n: "02", title: "Eksfolya", desc: "Həftədə 2-3 dəfə skrab ilə ölü dəri hüceyrələrini təmizlə." },
              { n: "03", title: "Nəmləndir", desc: "Gündəlik nəmləndirici ilə dərini qoru və parlatdır." },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  paddingLeft: "60px",
                  paddingBottom: i < 2 ? "40px" : 0,
                  borderLeft: i < 2 ? "1px solid #e8e3d8" : "none",
                  marginLeft: "20px",
                }}
              >
                <div style={{ position: "absolute", left: "-1px", top: 0, width: "1px", height: "100%", background: "#e8e3d8" }} />
                <div
                  style={{
                    position: "absolute",
                    left: "-10px",
                    top: "4px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#2C5E3A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F5F2E8" }} />
                </div>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "6px" }}>Addım {step.n}</p>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#1a1a18", marginBottom: "8px" }}>{step.title}</h4>
                <p style={{ fontSize: "14px", fontWeight: 300, color: "#777", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#F5F2E8", borderTop: "1px solid #e8e3d8" }}>
        <div className="max-w section-pad" {...fadeIn("ingr")} style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 60px", textAlign: "center", ...fadeIn("ingr").style }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "16px" }}>İnqrediyentlər</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: 300, marginBottom: "40px", color: "#1a1a18" }}>
            Yalnız təbii, yalnız saf
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {["Zeytun Yağı", "Argan Yağı", "Aloe Vera", "Lavanda", "Bal", "Dəniz Duzu", "Camomile", "Kokos Yağı", "Şəkərkadifu", "Bəzirotu"].map((ing) => (
              <span key={ing} className="ingredient-tag">
                {ing}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#2C5E3A" }}>
        <div className="max-w section-pad" {...fadeIn("cta")} style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 60px", textAlign: "center", ...fadeIn("cta").style }}>
          <GreenzaIcon size={40} color="rgba(245,242,232,0.3)" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 300,
              color: "#F5F2E8",
              lineHeight: 1.1,
              margin: "32px 0 16px",
              fontStyle: "italic",
            }}
          >
            Dərini dəyişdirən
            <br />
            rutinə başla
          </h2>
          <p style={{ fontSize: "15px", fontWeight: 300, color: "rgba(245,242,232,0.65)", marginBottom: "48px", lineHeight: 1.8 }}>
            İndi sifariş et. 21 günə fərqi özün gör.
          </p>
          <a
            className="btn-full-mobile"
            href="https://wa.me/994518754538"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "#F5F2E8",
              color: "#2C5E3A",
              fontFamily: "'Inter'",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "16px 40px",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F5F2E8";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                fill="currentColor"
              />
            </svg>
            WhatsApp ilə Sifariş Et
          </a>
          <p style={{ fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,242,232,0.4)", marginTop: "24px" }}>
            wa.me/994518754538
          </p>
        </div>
      </section>

      <footer
        style={{
          background: "#111",
          padding: "48px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <GreenzaIcon size={20} color="rgba(245,242,232,0.5)" />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(245,242,232,0.8)" }}>Greenza</span>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { label: "Instagram", href: "https://instagram.com/greenza.natural.store" },
            { label: "WhatsApp", href: "https://wa.me/994518754538" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontFamily: "'Inter'",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(245,242,232,0.4)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(245,242,232,0.9)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(245,242,232,0.4)")}
            >
              {l.label}
            </a>
          ))}
        </div>
        <p style={{ fontFamily: "'Inter'", fontSize: "11px", color: "rgba(245,242,232,0.25)", letterSpacing: "0.05em" }}>© 2026 Greenza</p>
      </footer>
    </>
  );
}

function GreenzaIcon({ size = 32, color = "#2C5E3A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <g transform="translate(50,50)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path d="M 0 0 C 8 -12 18 -22 10 -32 C 2 -42 -10 -36 -8 -24 C -6 -12 0 0 0 0 Z" fill={color} opacity={0.85} />
            <circle cx="6" cy="-34" r="2.5" fill={color} opacity={0.6} />
          </g>
        ))}
        <circle cx="0" cy="0" r="4" fill={color} opacity={0.4} />
      </g>
    </svg>
  );
}
