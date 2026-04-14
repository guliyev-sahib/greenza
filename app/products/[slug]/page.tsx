"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";

export default function ProductPage() {
  const { add } = useCart();
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!slug) return;
    const slugValue = Array.isArray(slug) ? slug[0] : slug;
    supabase.from("products").select("*").eq("slug", slugValue).single()
      .then(({ data }) => {
        if (data) {
          setProduct(data);
          supabase.from("products").select("*")
            .eq("category", data.category)
            .neq("slug", slugValue)
            .limit(3)
            .then(({ data: rel }) => { if (rel) setRelated(rel); });
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"#F5F2E8", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:300, color:"#aaa" }}>Yüklənir...</p>
    </div>
  );

  if (!product) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'Cormorant Garamond', serif", background: "#F5F2E8" }}>
      <p style={{ fontSize: "80px", fontWeight: 300, color: "#2C5E3A", opacity: 0.3 }}>404</p>
      <p style={{ fontSize: "20px", color: "#666", marginBottom: "24px" }}>Məhsul tapılmadı</p>
      <Link href="/products" style={{ color: "#2C5E3A", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Kataloqa qayıt</Link>
    </div>
  );

  const waMsg = `Salam! *${product.name}* məhsulundan ${qty} ədəd sifariş etmək istəyirəm. Qiymət: ${product.price * qty} AZN`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation: fadeUp 0.6s ease both; }
        .qty-btn { width:40px; height:40px; border:1px solid #d8d3c8; background:transparent; font-size:18px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
        .qty-btn:hover { border-color:#2C5E3A; color:#2C5E3A; }
        .rel-card { background:#fff; text-decoration:none; color:inherit; transition:transform 0.3s, box-shadow 0.3s; }
        .rel-card:hover { transform:translateY(-4px); box-shadow:0 16px 40px rgba(44,94,58,0.1); }
        .rel-card:hover .rel-img { transform:scale(1.04); }
        .rel-img { transition:transform 0.4s ease; }
      `}</style>

      <Navbar />

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"24px 60px 0" }}>
        <p style={{ fontSize:"12px", color:"#aaa", letterSpacing:"0.06em" }}>
          <Link href="/" style={{ color:"#aaa", textDecoration:"none" }}>Ana səhifə</Link>
          <span style={{ margin:"0 8px" }}>·</span>
          <Link href="/products" style={{ color:"#aaa", textDecoration:"none" }}>Məhsullar</Link>
          <span style={{ margin:"0 8px" }}>·</span>
          <span style={{ color:"#1a1a18" }}>{product.name}</span>
        </p>
      </div>

      <section className="product-detail" style={{ maxWidth:"1200px", margin:"0 auto", padding:"48px 60px 80px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"80px", alignItems:"start" }}>
        <div className="fade" style={{ position:"sticky", top:"88px" }}>
          <div style={{ background:product.color, aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
            {product.image_url
              ? <img src={product.image_url} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              : <svg width="120" height="120" viewBox="0 0 100 100" fill="none" opacity="0.25">
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
          <p style={{ fontSize:"11px", color:"#bbb", textAlign:"center", marginTop:"12px", letterSpacing:"0.08em" }}>
            Real məhsul şəkilləri tezliklə əlavə olunacaq
          </p>
        </div>

        <div className="fade" style={{ animationDelay:"0.1s" }}>
          <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#2C5E3A", marginBottom:"12px" }}>
            {product.category === "sabunlar" ? "Sabun" : product.category === "skrablar" ? "Skrab" : "Nəmləndirici / Şampun"}
          </p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,4vw,52px)", fontWeight:300, color:"#1a1a18", lineHeight:1.1, marginBottom:"16px" }}>
            {product.name}
          </h1>
          <p style={{ fontSize:"13px", fontWeight:300, color:"#777", marginBottom:"32px", lineHeight:1.7 }}>
            {product.short_desc}
          </p>

          <div style={{ width:"40px", height:"1px", background:"#d8d3c8", marginBottom:"32px" }} />

          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"42px", fontWeight:300, color:"#2C5E3A", marginBottom:"8px" }}>
            {product.price} <span style={{ fontSize:"20px", fontWeight:300 }}>AZN</span>
          </p>
          <p style={{ fontSize:"12px", color:"#aaa", marginBottom:"40px", letterSpacing:"0.06em" }}>Çatdırılma daxil deyil</p>

          <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px" }}>
            <div style={{ display:"flex", alignItems:"center" }}>
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
              <span style={{ width:"48px", textAlign:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:300 }}>{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q+1)}>+</button>
            </div>
            <span style={{ fontSize:"13px", color:"#aaa" }}>Cəmi: {product.price * qty} AZN</span>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"48px" }}>
            <button
              onClick={() =>
                add({
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  color: product.color || "#e8f0ea",
                  image_url: product.image_url || null,
                })
              }
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", background:"#1a1a18", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"13px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"16px", border:"none", cursor:"pointer", transition:"background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background="#000")}
              onMouseLeave={e => (e.currentTarget.style.background="#1a1a18")}
            >
              Səbətə Əlavə Et
            </button>
            <a href={`https://wa.me/994518754538?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", background:"#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"13px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"16px", textDecoration:"none", transition:"background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background="#1e4228")}
              onMouseLeave={e => (e.currentTarget.style.background="#2C5E3A")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
              WhatsApp ilə Sifariş Et
            </a>
          </div>

          <div style={{ borderTop:"1px solid #e8e3d8", paddingTop:"32px", marginBottom:"32px" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:400, color:"#1a1a18", marginBottom:"12px" }}>Məhsul haqqında</h3>
            <p style={{ fontSize:"14px", fontWeight:300, color:"#555", lineHeight:1.8 }}>{product.description}</p>
          </div>

          <div style={{ borderTop:"1px solid #e8e3d8", paddingTop:"32px" }}>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:400, color:"#1a1a18", marginBottom:"16px" }}>İnqrediyentlər</h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {(product.ingredients || []).map((ing: string) => (
                <span key={ing} style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#2C5E3A", border:"1px solid #c5deca", padding:"6px 14px", background:"#f0f7f2" }}>
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ borderTop:"1px solid #e8e3d8", background:"#fff" }}>
          <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"64px 60px" }}>
            <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#2C5E3A", marginBottom:"12px" }}>Oxşar məhsullar</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color:"#1a1a18", marginBottom:"40px" }}>Bəlkə bəyənərsiniz</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }}>
              {related.map(p => (
                <Link key={p.id} href={`/products/${p.slug}`} className="rel-card" style={{ display:"block", textDecoration:"none", color:"inherit" }}>
                  <div style={{ overflow:"hidden", aspectRatio:"1", background: p.color || "#e8f0ea" }}>
                    <div className="rel-img" style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
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
                  </div>
                  <div style={{ padding:"20px" }}>
                    <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:400, color:"#1a1a18", marginBottom:"4px" }}>{p.name}</h4>
                    <p style={{ fontSize:"13px", fontWeight:300, color:"#777", marginBottom:"12px" }}>{p.short_desc}</p>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"#2C5E3A" }}>{p.price} AZN</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ background:"#111", padding:"40px 60px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"rgba(245,242,232,0.7)" }}>Greenza</span>
        <span style={{ fontSize:"12px", color:"rgba(245,242,232,0.3)" }}>© 2026 Greenza</span>
      </footer>
    </>
  );
}
