"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const { items, remove, update, total, count, clear } = useCart();

  useEffect(() => {
    const stored = localStorage.getItem("greenza-cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0 && parsed[0].image_url === undefined) {
        localStorage.removeItem("greenza-cart");
        clear();
      }
    }
  }, []);

  const grandTotal = total;

  const waMessage = items.length > 0
    ? `Salam! Sifariş vermək istəyirəm:\n\n${items.map(i => `• ${i.name} x${i.qty} = ${i.price * i.qty} AZN`).join("\n")}\n\nMəhsulların cəmi: ${total} AZN\n\nÇatdırılma ünvanı barədə məlumat verə bilərəm.`
    : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation: fadeUp 0.5s ease both; }
        .qty-btn { width:36px; height:36px; border:1px solid #d8d3c8; background:transparent; font-size:16px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; color:#1a1a18; }
        .qty-btn:hover { border-color:#2C5E3A; color:#2C5E3A; }
        .remove-btn { background:none; border:none; cursor:pointer; color:#ccc; font-size:18px; padding:4px; transition:color 0.2s; line-height:1; }
        .remove-btn:hover { color:#e55; }
        .cart-item { display:grid; grid-template-columns:80px 1fr auto; gap:24px; align-items:center; padding:28px 0; border-bottom:1px solid #e8e3d8; animation: fadeUp 0.4s ease both; }
        .wa-btn { display:flex; align-items:center; justify-content:center; gap:10px; background:#2C5E3A; color:#F5F2E8; font-family:'Inter',sans-serif; font-size:13px; letter-spacing:0.12em; text-transform:uppercase; padding:16px; text-decoration:none; width:100%; transition:background 0.2s; border:none; cursor:pointer; }
        .wa-btn:hover { background:#1e4228; }
      `}</style>

      <Navbar />

      <main style={{ maxWidth:"1200px", margin:"0 auto", padding:"64px 60px 100px" }}>

        {/* Header */}
        <div className="fade" style={{ marginBottom:"48px" }}>
          <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#2C5E3A", marginBottom:"12px" }}>Səbət</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,4vw,52px)", fontWeight:300, color:"#1a1a18" }}>
            Sifarişim {count > 0 && <span style={{ fontSize:"24px", color:"#aaa", fontWeight:300 }}>({count} məhsul)</span>}
          </h1>
        </div>

        {items.length === 0 ? (
          /* EMPTY STATE */
          <div className="fade" style={{ textAlign:"center", padding:"80px 0" }}>
            <div style={{ marginBottom:"24px", opacity:0.2 }}>
              <svg width="64" height="64" fill="none" stroke="#2C5E3A" strokeWidth="1" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </div>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", fontWeight:300, color:"#1a1a18", marginBottom:"12px" }}>Səbət boşdur</p>
            <p style={{ fontSize:"14px", fontWeight:300, color:"#777", marginBottom:"40px" }}>Hələ heç bir məhsul əlavə edilməyib</p>
            <Link href="/products" className="btn-full-mobile" style={{ background:"#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"14px 40px", textDecoration:"none" }}>
              Məhsullara Bax
            </Link>
          </div>
        ) : (
          <div className="cart-grid" style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:"60px", alignItems:"start" }}>

            {/* ITEMS */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <p style={{ fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", color:"#aaa" }}>Məhsullar</p>
                <button onClick={clear} style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#ccc", background:"none", border:"none", cursor:"pointer", transition:"color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#e55")}
                  onMouseLeave={e => (e.currentTarget.style.color="#ccc")}>
                  Hamısını sil
                </button>
              </div>

              {items.map((item, i) => (
                <div key={item.id} className="cart-item" style={{ animationDelay:`${i*0.05}s` }}>
                  {/* Thumbnail */}
                  <div style={{ width:"80px", height:"80px", background: item.color || "#e8f0ea", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
                    {item.image_url
                      ? <img src={item.image_url} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <svg width="32" height="32" viewBox="0 0 100 100" fill="none" opacity="0.3">
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

                  {/* Info + Qty */}
                  <div>
                    <Link href={`/products/${item.slug}`} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:400, color:"#1a1a18", textDecoration:"none", display:"block", marginBottom:"4px", transition:"color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color="#2C5E3A")}
                      onMouseLeave={e => (e.currentTarget.style.color="#1a1a18")}>
                      {item.name}
                    </Link>
                    <p style={{ fontSize:"13px", fontWeight:300, color:"#aaa", marginBottom:"16px" }}>{item.price} AZN / ədəd</p>
                    <div style={{ display:"flex", alignItems:"center", gap:"0" }}>
                      <button className="qty-btn" onClick={() => update(item.id, item.qty - 1)}>−</button>
                      <span style={{ width:"44px", textAlign:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:300, border:"1px solid #d8d3c8", borderLeft:"none", borderRight:"none", height:"36px", display:"flex", alignItems:"center", justifyContent:"center" }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => update(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div style={{ textAlign:"right", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"12px" }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:300, color:"#2C5E3A" }}>
                      {item.price * item.qty} AZN
                    </span>
                    <button className="remove-btn" onClick={() => remove(item.id)} title="Sil">✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div style={{ position:"sticky", top:"88px" }}>
              <div style={{ background:"#fff", border:"1px solid #e8e3d8", padding:"32px" }}>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", fontWeight:300, color:"#1a1a18", marginBottom:"28px" }}>
                  Sifariş xülasəsi
                </h2>

                <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginBottom:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"14px", fontWeight:300, color:"#555" }}>
                    <span>Məhsullar ({count} ədəd)</span>
                    <span>{total} AZN</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"14px", fontWeight:300, color:"#555" }}>
                    <span>Çatdırılma</span>
                    <span style={{ color:"#2C5E3A", fontSize:"13px" }}>Operator tərəfindən təyin edilir</span>
                  </div>
                  <p style={{ fontSize:"11px", color:"#aaa", letterSpacing:"0.04em" }}>
                    Sifariş verdikdən sonra operator sizinlə əlaqə saxlayacaq və çatdırılma haqqında məlumat verəcək.
                  </p>
                </div>

                <div style={{ borderTop:"1px solid #e8e3d8", paddingTop:"20px", marginBottom:"28px", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
                  <span style={{ fontSize:"13px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>Məhsulların cəmi</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"32px", fontWeight:300, color:"#2C5E3A" }}>
                    {grandTotal} AZN
                  </span>
                </div>

                <a href={`https://wa.me/994518754538?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noreferrer" className="wa-btn btn-full-mobile">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                  WhatsApp ilə Sifariş Et
                </a>

                <p style={{ fontSize:"11px", color:"#aaa", textAlign:"center", marginTop:"16px", lineHeight:1.6 }}>
                  Düyməyə basınca WhatsApp açılacaq.<br/>Operatorumuz sizinlə əlaqə saxlayacaq.
                </p>
              </div>

              <div style={{ marginTop:"16px", textAlign:"center" }}>
                <Link href="/products" style={{ fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#aaa", textDecoration:"none", transition:"color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#2C5E3A")}
                  onMouseLeave={e => (e.currentTarget.style.color="#aaa")}>
                  ← Alış-verişə davam et
                </Link>
              </div>
            </div>

          </div>
        )}
      </main>

      <footer style={{ background:"#111", padding:"40px 60px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"rgba(245,242,232,0.7)" }}>Greenza</span>
        <span style={{ fontSize:"12px", color:"rgba(245,242,232,0.3)" }}>© 2026 Greenza</span>
      </footer>
    </>
  );
}
