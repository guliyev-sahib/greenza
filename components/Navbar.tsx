"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import GreenzaIcon from "@/components/GreenzaIcon";

function Logo() {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100" fill="none">
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
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,242,232,0.96)", borderBottom:"1px solid #e8e3d8", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px", height:"60px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <Logo />
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"#2C5E3A" }}>Greenza Admin</span>
        </div>
        <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
          <a href="/" target="_blank" style={{ fontSize:"12px", color:"#aaa", textDecoration:"none", letterSpacing:"0.08em" }}>Sayta bax →</a>
          <button
            onClick={() => {
              sessionStorage.removeItem("greenza-admin");
              window.location.reload();
            }}
            style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#aaa", background:"none", border:"none", cursor:"pointer" }}
          >
            Çıx
          </button>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        style={{
          position: isHome ? "fixed" : "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          height: "64px",
          background: "rgba(245,242,232,0.96)",
          borderBottom: "1px solid #e8e3d8",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <Logo />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 400, color: "#2C5E3A", letterSpacing: "0.02em" }}>
            Greenza
          </span>
        </Link>

        <div style={{ display:"flex", gap:"40px", alignItems:"center" }} className="nav-desktop">
          <Link href="/products" style={{ fontFamily:"'Inter'", fontSize:"13px", color:"#666", textDecoration:"none", letterSpacing:"0.06em" }}>Məhsullar</Link>
          <Link href="/about" style={{ fontFamily:"'Inter'", fontSize:"13px", color:"#666", textDecoration:"none", letterSpacing:"0.06em" }}>Haqqımızda</Link>
          <Link href="/blog" style={{ fontFamily:"'Inter'", fontSize:"13px", color:"#666", textDecoration:"none", letterSpacing:"0.06em" }}>Bloq</Link>
          <Link href="/cart" style={{ position:"relative", display:"flex", padding:"8px" }}>
            <svg width="20" height="20" fill="none" stroke="#1a1a18" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && <span style={{ position:"absolute", top:"2px", right:"2px", background:"#2C5E3A", color:"#fff", borderRadius:"50%", width:"16px", height:"16px", fontSize:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>{count}</span>}
          </Link>
          <a href="https://wa.me/994518754538" style={{ background:"#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", padding:"10px 24px", textDecoration:"none" }}>Sifariş Et</a>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:"16px" }} className="nav-mobile">
          <Link href="/cart" style={{ position:"relative", display:"flex", padding:"8px" }}>
            <svg width="20" height="20" fill="none" stroke="#1a1a18" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            {count > 0 && <span style={{ position:"absolute", top:"2px", right:"2px", background:"#2C5E3A", color:"#fff", borderRadius:"50%", width:"16px", height:"16px", fontSize:"10px", display:"flex", alignItems:"center", justifyContent:"center" }}>{count}</span>}
          </Link>
          <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", padding:"8px", display:"flex" }}>
            <svg width="22" height="22" fill="none" stroke="#1a1a18" strokeWidth="1.5" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position:"fixed", inset:0, background:"#F5F2E8", zIndex:999, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"36px" }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position:"absolute", top:"20px", right:"20px", background:"none", border:"none", fontSize:"28px", cursor:"pointer", color:"#1a1a18", lineHeight:1 }}
            aria-label="Close menu"
          >
            ✕
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
            <GreenzaIcon size={28} color="#2C5E3A" />
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", color:"#2C5E3A" }}>Greenza</span>
          </div>
          {[
            { label:"Məhsullar", href:"/products" },
            { label:"Haqqımızda", href:"/about" },
            { label:"Bloq", href:"/blog" },
          ].map(item => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"40px", fontWeight:300, color:"#1a1a18", textDecoration:"none" }}>
              {item.label}
            </Link>
          ))}
          <a href="https://wa.me/994518754538" style={{ marginTop:"16px", background:"#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"14px 48px", textDecoration:"none" }}>
            Sifariş Et
          </a>
        </div>
      )}
    </>
  );
}

