"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const values = [
  { title: "Təbii", desc: "Formullarımızda seçilmiş, dəri ilə uyğun işləyən təbii inqrediyentlərdən istifadə edirik." },
  { title: "Əl işi", desc: "Hər məhsul kiçik partiyalarla hazırlanır və keyfiyyət nəzarətindən keçir." },
  { title: "Effektiv", desc: "Sadə rutinlə real nəticə verən məhsullar hazırlamaq Greenza-nın əsas prinsipidir." },
];

export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />
      <main className="max-w section-pad" style={{ maxWidth: "1200px", margin: "0 auto", padding: "84px 60px 100px" }}>
        <section className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "60px", alignItems: "center", marginBottom: "90px" }}>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "12px" }}>Haqqımızda</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 5vw, 68px)", fontWeight: 300, color: "#1a1a18", lineHeight: 1.02, marginBottom: "18px" }}>
              Biz kimik?
            </h1>
            <p style={{ fontSize: "15px", fontWeight: 300, color: "#666", lineHeight: 1.8, maxWidth: "640px" }}>
              Greenza təbii dəri baxımına sadə, funksional və estetik yanaşma gətirən yerli markadır. Məqsədimiz daha az məhsulla daha düzgün rutin qurmağınıza kömək etməkdir.
            </p>
          </div>
          <div style={{ width: "360px", height: "360px", borderRadius: "50%", border: "1px solid #e8e3d8", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="130" height="130" viewBox="0 0 100 100" fill="none">
              <g transform="translate(50,50)">
                {[0,72,144,216,288].map((a,i) => (
                  <g key={i} transform={`rotate(${a})`}>
                    <path d="M 0 0 C 8 -12 18 -22 10 -32 C 2 -42 -10 -36 -8 -24 C -6 -12 0 0 0 0 Z" fill="#2C5E3A" opacity="0.85"/>
                    <circle cx="6" cy="-34" r="2.5" fill="#2C5E3A" opacity="0.6"/>
                  </g>
                ))}
                <circle cx="0" cy="0" r="4" fill="#2C5E3A" opacity="0.4"/>
              </g>
            </svg>
          </div>
        </section>

        <section style={{ marginBottom: "84px", borderTop: "1px solid #e8e3d8", paddingTop: "36px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", fontWeight: 300, color: "#1a1a18", marginBottom: "14px" }}>
            Greenza necə yarandı?
          </h2>
          <p style={{ fontSize: "15px", fontWeight: 300, color: "#666", lineHeight: 1.9, maxWidth: "900px" }}>
            Greenza, gündəlik dəri baxımını daha təmiz və başadüşülən etmək fikri ilə yarandı. İlk məhsullarımız yaxın çevrəmiz üçün hazırlanmış kiçik partiyalar idi.
            Müştərilərdən gələn real nəticələr və rəylər bu ideyanı böyütdü. Bu gün də eyni fəlsəfəni qoruyuruq: lazımsız səs-küy olmadan, effektiv və etibarlı formulalar.
          </p>
        </section>

        <section style={{ marginBottom: "84px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
            {values.map((v) => (
              <article key={v.title} style={{ background: "#fff", border: "1px solid #e8e3d8", padding: "30px 26px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "34px", fontWeight: 400, color: "#2C5E3A", marginBottom: "8px" }}>{v.title}</h3>
                <p style={{ fontSize: "14px", fontWeight: 300, color: "#666", lineHeight: 1.7 }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ borderTop: "1px solid #e8e3d8", borderBottom: "1px solid #e8e3d8", padding: "34px 0", marginBottom: "80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
            {[
              { n: "79", l: "məhsul" },
              { n: "928", l: "müştəri" },
              { n: "21", l: "gün" },
            ].map((s, i) => (
              <div key={s.l} style={{ paddingLeft: i ? "28px" : "0", borderLeft: i ? "1px solid #e8e3d8" : "none" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "54px", color: "#2C5E3A", fontWeight: 300, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: "13px", letterSpacing: "0.08em", color: "#666", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ textAlign: "center" }}>
          <a
            className="btn-full-mobile"
            href="https://wa.me/994518754538"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              background: "#2C5E3A",
              color: "#F5F2E8",
              textDecoration: "none",
              fontSize: "12px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "14px 36px",
            }}
          >
            WhatsApp ilə Əlaqə
          </a>
          <p style={{ marginTop: "14px", fontSize: "12px", color: "#aaa" }}>
            Suallarınız üçün bizimlə birbaşa yazışa bilərsiniz.
          </p>
        </section>
      </main>
    </>
  );
}

