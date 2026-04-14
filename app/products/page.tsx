"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

const tabs = [
  { key: "all", label: "Hamısı" },
  { key: "sabunlar", label: "Sabunlar" },
  { key: "skrablar", label: "Skrablar" },
  { key: "nemlendiriciler", label: "Nəmləndirici / Şampun" },
];

export default function ProductsPage() {
  const { add, count } = useCart();
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    supabase.from("products").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setProducts(data); setLoadingProducts(false); });
  }, []);

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .prod-card {
          background: #fff;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          animation: fadeUp 0.5s ease both;
          text-decoration: none;
          color: inherit;
        }
        .prod-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(44,94,58,0.12);
        }
        .prod-card:hover .prod-img-inner {
          transform: scale(1.04);
        }
        .prod-card:hover img { transform: scale(1.05); }
        .prod-img-inner {
          transition: transform 0.5s ease;
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
        }
        .tab-btn {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 10px 24px;
          border: 1px solid #d8d3c8;
          background: transparent;
          color: #888;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn:hover { border-color: #2C5E3A; color: #2C5E3A; }
        .tab-btn.active { background: #2C5E3A; border-color: #2C5E3A; color: #F5F2E8; }
        
        .add-btn {
          width: 100%;
          padding: 12px;
          background: #2C5E3A;
          color: #F5F2E8;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
          margin-top: auto;
        }
        .add-btn:hover { background: #1e4228; }
      `}</style>

      <Navbar />

      <main className="max-w section-pad" style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 60px 100px" }}>
        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C5E3A", marginBottom: "12px" }}>Kolleksiya</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px,5vw,60px)", fontWeight: 300, color: "#1a1a18", lineHeight: 1, marginBottom: "32px" }}>
            Bütün Məhsullar
          </h1>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {tabs.map((t) => (
              <button key={t.key} className={`tab-btn${active === t.key ? " active" : ""}`} onClick={() => setActive(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#aaa", letterSpacing: "0.08em", marginBottom: "32px" }}>{filtered.length} məhsul</p>

        {loadingProducts ? (
          <p style={{ textAlign:"center", padding:"80px 0", color:"#aaa", fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:300 }}>Yüklənir...</p>
        ) : products.length === 0 ? (
          <p style={{ textAlign:"center", padding:"80px 0", color:"#aaa" }}>Məhsul tapılmadı</p>
        ) : (
          <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="prod-card" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ overflow:"hidden", aspectRatio:"1", background: p.color || "#e8f0ea" }}>
                  <Link href={`/products/${p.slug}`} style={{ display:"block", height:"100%" }}>
                    <div className="prod-img-inner" style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }} />
                        : <svg width="48" height="48" viewBox="0 0 100 100" fill="none" opacity="0.25">
                            <g transform="translate(50,50)">
                              {[0,72,144,216,288].map((a,i) => (
                                <g key={i} transform={`rotate(${a})`}>
                                  <path d="M 0 0 C 8 -12 18 -22 10 -32 C 2 -42 -10 -36 -8 -24 C -6 -12 0 0 0 0 Z" fill="#2C5E3A"/>
                                </g>
                              ))}
                            </g>
                          </svg>
                      }
                    </div>
                  </Link>
                </div>
                <Link href={`/products/${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  
                  <div style={{ padding: "24px 24px 0" }}>
                    <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#aaa", marginBottom: "8px" }}>
                      {p.category === "sabunlar" ? "Sabun" : p.category === "skrablar" ? "Skrab" : "Nəmləndirici / Şampun"}
                    </p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#1a1a18", lineHeight: 1.2, marginBottom: "8px" }}>{p.name}</h3>
                    <p style={{ fontSize: "13px", fontWeight: 300, color: "#777", lineHeight: 1.6, marginBottom: "16px" }}>{p.short_desc}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: "#2C5E3A" }}>
                        {p.price} <span style={{ fontSize: "14px", fontWeight: 300 }}>AZN</span>
                      </span>
                    </div>
                  </div>
                </Link>

                <button className="add-btn" onClick={(e) => { e.preventDefault(); add({ id: p.id, slug: p.slug, name: p.name, price: p.price, color: p.color || "#e8f0ea", image_url: p.image_url || null }); }}>
                  Səbətə Əlavə Et
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer style={{ background: "#111", padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "rgba(245,242,232,0.7)" }}>Greenza</span>
        <span style={{ fontSize: "12px", color: "rgba(245,242,232,0.3)", letterSpacing: "0.05em" }}>© 2026 Greenza</span>
      </footer>
    </>
  );
}
