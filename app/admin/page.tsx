"use client";
import { useEffect, useState } from "react";
import { supabase, Product } from "@/lib/supabase";
import Navbar from "@/components/Navbar";

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "greenza2026";

const empty = {
  name: "", slug: "", category: "sabunlar" as const,
  price: 0, short_desc: "", description: "",
  ingredients: "", color: "#e8f0ea", in_stock: true,
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{id:number, name:string, imageUrl?:string|null} | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ok = sessionStorage.getItem("greenza-admin");
      if (ok === "1") setAuth(true);
    }
  }, []);

  useEffect(() => { if (auth) loadProducts(); }, [auth]);

  const login = () => {
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem("greenza-admin", "1");
      setAuth(true);
    } else {
      setPassErr(true);
      setTimeout(() => setPassErr(false), 2000);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("products").upload(path, file, { upsert: true });
    if (error) return null;
    const { data } = supabase.storage.from("products").getPublicUrl(path);
    return data.publicUrl;
  };

  const save = async () => {
    if (!form.name || !form.price) { setMsg("Ad və qiymət mütləqdir"); return; }
    setSaving(true);
    setMsg("");

    let imageUrl: string | null = null;
    if (imageFile) imageUrl = await uploadImage(imageFile);

    const slug = form.slug || slugify(form.name);
    const ings = form.ingredients.split(",").map(s => s.trim()).filter(Boolean);
    const payload = { ...form, slug, ingredients: ings, ...(imageUrl ? { image_url: imageUrl } : {}) };
    delete (payload as any).ingredients_str;

    let error;
    if (view === "edit" && editId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }

    setSaving(false);
    if (error) { setMsg("Xəta: " + error.message); return; }
    setMsg(view === "edit" ? "✓ Yeniləndi" : "✓ Əlavə edildi");
    setTimeout(() => { setMsg(""); setView("list"); loadProducts(); }, 1200);
    setForm(empty); setImageFile(null); setImagePreview(null);
  };

  const del = async (id: number, imageUrl?: string | null) => {
    if (!confirm("Silmək istədiyinizdən əminsiniz?")) return;
    if (imageUrl) {
      const path = imageUrl.split("/products/")[1];
      if (path) await supabase.storage.from("products").remove([path]);
    }
    await supabase.from("products").delete().eq("id", id);
    loadProducts();
  };

  const startEdit = (p: Product) => {
    setForm({ name: p.name, slug: p.slug, category: p.category, price: p.price, short_desc: p.short_desc || "", description: p.description || "", ingredients: (p.ingredients || []).join(", "), color: p.color || "#e8f0ea", in_stock: p.in_stock });
    setImagePreview(p.image_url || null);
    setEditId(p.id);
    setView("edit");
  };

  const s: Record<string,any> = {
    label: { fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", display:"block", marginBottom:"8px" },
    input: { width:"100%", padding:"12px 14px", border:"1px solid #d8d3c8", background:"#fff", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"#1a1a18", outline:"none" },
    select: { width:"100%", padding:"12px 14px", border:"1px solid #d8d3c8", background:"#fff", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"#1a1a18", outline:"none" },
  };

  if (!auth) return (
    <div style={{ minHeight:"100vh", background:"#F5F2E8", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400;500&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{ width:"360px", background:"#fff", border:"1px solid #e8e3d8", padding:"48px 40px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"40px", justifyContent:"center" }}>
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
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", color:"#2C5E3A" }}>Admin</span>
        </div>
        <label style={s.label}>Şifrə</label>
        <input type="password" value={pass} onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ ...s.input, borderColor: passErr ? "#e55" : "#d8d3c8", marginBottom:"24px" }}
          placeholder="••••••••" />
        {passErr && <p style={{ fontSize:"12px", color:"#e55", marginBottom:"16px" }}>Şifrə yanlışdır</p>}
        <button onClick={login} style={{ width:"100%", padding:"14px", background:"#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.12em", textTransform:"uppercase", border:"none", cursor:"pointer" }}>
          Daxil ol
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #F5F2E8; -webkit-font-smoothing: antialiased; }
        input:focus, select:focus, textarea:focus { border-color: #2C5E3A !important; outline: none; }
        .prod-row:hover { background: #f9f8f4; }
        .del-btn { background:none; border:none; cursor:pointer; color:#ddd; font-size:16px; padding:4px 8px; transition:color 0.2s; }
        .del-btn:hover { color:#e55; }
        .edit-btn { background:none; border:1px solid #d8d3c8; cursor:pointer; color:#666; font-size:11px; padding:6px 14px; letter-spacing:0.08em; text-transform:uppercase; transition:all 0.2s; }
        .edit-btn:hover { border-color:#2C5E3A; color:#2C5E3A; }
      `}</style>

      <Navbar />

      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"40px" }}>

        {view === "list" && (
          <>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"40px" }}>
              <div>
                <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#2C5E3A", marginBottom:"8px" }}>Panel</p>
                <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"40px", fontWeight:300, color:"#1a1a18" }}>Məhsullar</h1>
              </div>
              <button onClick={() => { setForm(empty); setImageFile(null); setImagePreview(null); setView("add"); }}
                style={{ background:"#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.12em", textTransform:"uppercase", padding:"12px 28px", border:"none", cursor:"pointer" }}>
                + Yeni Məhsul
              </button>
            </div>

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", background:"#e8e3d8", marginBottom:"32px" }}>
              {[
                { label:"Cəmi", val: products.length },
                { label:"Sabunlar", val: products.filter(p=>p.category==="sabunlar").length },
                { label:"Skrablar", val: products.filter(p=>p.category==="skrablar").length },
                { label:"Nəmləndirici / Şampun", val: products.filter(p=>p.category==="nemlendiriciler").length },
              ].map((st,i) => (
                <div key={i} style={{ background:"#fff", padding:"20px 24px" }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color:"#2C5E3A", display:"block" }}>{st.val}</span>
                  <span style={{ fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#aaa" }}>{st.label}</span>
                </div>
              ))}
            </div>

            {/* Table */}
            {loading ? (
              <p style={{ textAlign:"center", color:"#aaa", padding:"60px 0", fontFamily:"'Cormorant Garamond',serif", fontSize:"20px" }}>Yüklənir...</p>
            ) : (
              <div className="admin-table" style={{ background:"#fff", border:"1px solid #e8e3d8" }}>
                <div style={{ display:"grid", gridTemplateColumns:"60px 1fr 120px 100px 110px 90px 44px", padding:"12px 24px", borderBottom:"1px solid #e8e3d8" }}>
                  {["Foto","Ad","Kateqoriya","Qiymət","Stok","Düzəlt",""].map((h,i) => (
                    <span key={i} style={{ fontSize:"10px", letterSpacing:"0.15em", textTransform:"uppercase", color:"#aaa" }}>{h}</span>
                  ))}
                </div>
                {products.length === 0 && (
                  <p style={{ textAlign:"center", padding:"48px", color:"#aaa", fontWeight:300 }}>Hələ məhsul yoxdur</p>
                )}
                {products.map(p => (
                  <div key={p.id} className="prod-row" style={{ display:"grid", gridTemplateColumns:"60px 1fr 120px 100px 110px 90px 44px", padding:"16px 24px", borderBottom:"1px solid #f0ece4", alignItems:"center" }}>
                    <div style={{ width:"44px", height:"44px", background:p.color || "#e8f0ea", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                      {p.image_url
                        ? <img src={p.image_url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                        : <svg width="20" height="20" viewBox="0 0 100 100" fill="none" opacity="0.3"><g transform="translate(50,50)">{[0,72,144,216,288].map((a,i)=><g key={i} transform={`rotate(${a})`}><path d="M 0 0 C 8 -12 18 -22 10 -32 C 2 -42 -10 -36 -8 -24 C -6 -12 0 0 0 0 Z" fill="#2C5E3A"/></g>)}</g></svg>
                      }
                    </div>
                    <div>
                      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"18px", fontWeight:400, color:"#1a1a18", marginBottom:"2px" }}>{p.name}</p>
                      <p style={{ fontSize:"12px", color:"#aaa", fontWeight:300 }}>{p.short_desc}</p>
                    </div>
                    <span style={{ fontSize:"12px", color:"#666", letterSpacing:"0.05em", textTransform:"capitalize" }}>{p.category}</span>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", color:"#2C5E3A" }}>{p.price} AZN</span>
                    <button
                      onClick={async () => {
                        const newStock = !p.in_stock;
                        await supabase.from("products").update({ in_stock: newStock }).eq("id", p.id);
                        setProducts(prev => prev.map(item => item.id === p.id ? { ...item, in_stock: newStock } : item));
                      }}
                      style={{
                        fontSize:"11px", letterSpacing:"0.08em", textTransform:"uppercase",
                        color: p.in_stock ? "#2C5E3A" : "#e55",
                        background: p.in_stock ? "#f0f7f2" : "#fff5f5",
                        border: `1px solid ${p.in_stock ? "#c5deca" : "#ffcccc"}`,
                        padding:"6px 14px", cursor:"pointer", transition:"all 0.2s", whiteSpace:"nowrap"
                      }}>
                      {p.in_stock ? "✓ Var" : "✗ Yox"}
                    </button>
                    <button
                      onClick={() => startEdit(p)}
                      style={{ fontSize:"11px", letterSpacing:"0.08em", textTransform:"uppercase", color:"#666", background:"none", border:"1px solid #d8d3c8", padding:"6px 14px", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#2C5E3A"; (e.currentTarget as HTMLElement).style.color="#2C5E3A"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#d8d3c8"; (e.currentTarget as HTMLElement).style.color="#666"; }}>
                      Düzəlt
                    </button>
                    <button
                      onClick={() => setDeleteTarget({ id: p.id, name: p.name, imageUrl: p.image_url })}
                      style={{ width:"36px", height:"36px", background:"none", border:"1px solid #e8e3d8", cursor:"pointer", color:"#ccc", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#e55"; (e.currentTarget as HTMLElement).style.color="#e55"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#e8e3d8"; (e.currentTarget as HTMLElement).style.color="#ccc"; }}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {(view === "add" || view === "edit") && (
          <>
            <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"40px" }}>
              <button onClick={() => setView("list")} style={{ background:"none", border:"none", cursor:"pointer", color:"#aaa", fontSize:"20px", lineHeight:1 }}>←</button>
              <div>
                <p style={{ fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", color:"#2C5E3A", marginBottom:"4px" }}>
                  {view === "add" ? "Yeni məhsul" : "Düzəliş"}
                </p>
                <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"36px", fontWeight:300, color:"#1a1a18" }}>
                  {view === "add" ? "Məhsul Əlavə Et" : form.name}
                </h1>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:"32px", alignItems:"start" }}>
              {/* Form */}
              <div style={{ background:"#fff", border:"1px solid #e8e3d8", padding:"36px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px", marginBottom:"24px" }}>
                  <div>
                    <label style={s.label}>Məhsulun adı *</label>
                    <input style={s.input} value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))}
                      placeholder="Zeytun & Lavanda Sabunu" />
                  </div>
                  <div>
                    <label style={s.label}>Slug (URL)</label>
                    <input style={s.input} value={form.slug}
                      onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                      placeholder="zeytun-lavanda-sabunu" />
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px", marginBottom:"24px" }}>
                  <div>
                    <label style={s.label}>Kateqoriya *</label>
                    <select style={s.select} value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value as any }))}>
                      <option value="sabunlar">Sabunlar</option>
                      <option value="skrablar">Skrablar</option>
                      <option value="nemlendiriciler">Nəmləndirici / Şampun</option>
                    </select>
                  </div>
                  <div>
                    <label style={s.label}>Qiymət (AZN) *</label>
                    <input style={s.input} type="number" value={form.price || ""}
                      onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="24" />
                  </div>
                </div>

                <div style={{ marginBottom:"24px" }}>
                  <label style={s.label}>Qısa təsvir</label>
                  <input style={s.input} value={form.short_desc}
                    onChange={e => setForm(f => ({ ...f, short_desc: e.target.value }))}
                    placeholder="Həssas dəri üçün yumşaq təmizləmə" />
                </div>

                <div style={{ marginBottom:"24px" }}>
                  <label style={s.label}>Ətraflı təsvir</label>
                  <textarea style={{ ...s.input, height:"120px", resize:"vertical" }} value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Məhsul haqqında ətraflı məlumat..." />
                </div>

                <div style={{ marginBottom:"24px" }}>
                  <label style={s.label}>İnqrediyentlər (vergüllə ayırın)</label>
                  <input style={s.input} value={form.ingredients}
                    onChange={e => setForm(f => ({ ...f, ingredients: e.target.value }))}
                    placeholder="Zeytun Yağı, Lavanda, Kokos Yağı" />
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" }}>
                  <div>
                    <label style={s.label}>Kart rəngi (foto olmadıqda)</label>
                    <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                      <input type="color" value={form.color}
                        onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                        style={{ width:"44px", height:"44px", border:"1px solid #d8d3c8", padding:"2px", cursor:"pointer" }} />
                      <span style={{ fontSize:"13px", color:"#aaa" }}>{form.color}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", paddingTop:"20px" }}>
                    <input type="checkbox" id="instock" checked={form.in_stock}
                      onChange={e => setForm(f => ({ ...f, in_stock: e.target.checked }))}
                      style={{ width:"18px", height:"18px", accentColor:"#2C5E3A" }} />
                    <label htmlFor="instock" style={{ fontSize:"14px", color:"#555", cursor:"pointer" }}>Stokda var</label>
                  </div>
                </div>
              </div>

              {/* Image + Save */}
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                {/* Image upload */}
                <div style={{ background:"#fff", border:"1px solid #e8e3d8", padding:"24px" }}>
                  <label style={{ ...s.label, marginBottom:"16px" }}>Məhsul şəkli</label>
                  <div style={{ aspectRatio:"1", background: imagePreview ? "transparent" : form.color, border:"1px dashed #d8d3c8", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"16px", overflow:"hidden", position:"relative" }}>
                    {imagePreview
                      ? <img src={imagePreview} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <div style={{ textAlign:"center" }}>
                          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" opacity="0.2"><g transform="translate(50,50)">{[0,72,144,216,288].map((a,i)=><g key={i} transform={`rotate(${a})`}><path d="M 0 0 C 8 -12 18 -22 10 -32 C 2 -42 -10 -36 -8 -24 C -6 -12 0 0 0 0 Z" fill="#2C5E3A"/></g>)}</g></svg>
                          <p style={{ fontSize:"12px", color:"#bbb", marginTop:"8px" }}>Şəkil yoxdur</p>
                        </div>
                    }
                  </div>
                  <label style={{ display:"block", textAlign:"center", padding:"10px", border:"1px solid #d8d3c8", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", cursor:"pointer", transition:"all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#2C5E3A"; (e.currentTarget as HTMLElement).style.color="#2C5E3A"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#d8d3c8"; (e.currentTarget as HTMLElement).style.color="#666"; }}>
                    Şəkil seç
                    <input type="file" accept="image/*" onChange={handleImage} style={{ display:"none" }} />
                  </label>
                  {imageFile && <p style={{ fontSize:"11px", color:"#aaa", marginTop:"8px", textAlign:"center" }}>{imageFile.name}</p>}
                </div>

                {/* Save */}
                <button onClick={save} disabled={saving}
                  style={{ padding:"16px", background: saving ? "#aaa" : "#2C5E3A", color:"#F5F2E8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.12em", textTransform:"uppercase", border:"none", cursor: saving ? "not-allowed" : "pointer", transition:"background 0.2s" }}>
                  {saving ? "Yüklənir..." : view === "add" ? "Məhsulu Əlavə Et" : "Yadda Saxla"}
                </button>

                {msg && (
                  <p style={{ textAlign:"center", fontSize:"13px", color: msg.startsWith("✓") ? "#2C5E3A" : "#e55", padding:"12px", background: msg.startsWith("✓") ? "#f0f7f2" : "#fff5f5", border:`1px solid ${msg.startsWith("✓") ? "#c5deca" : "#ffcccc"}` }}>
                    {msg}
                  </p>
                )}

                <button onClick={() => setView("list")}
                  style={{ padding:"12px", background:"transparent", color:"#aaa", fontFamily:"'Inter'", fontSize:"11px", letterSpacing:"0.1em", textTransform:"uppercase", border:"1px solid #d8d3c8", cursor:"pointer" }}>
                  Ləğv et
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {deleteTarget && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:"#fff", border:"1px solid #e8e3d8", padding:"40px", width:"380px", textAlign:"center" }}>
            <p style={{ fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", color:"#aaa", marginBottom:"16px" }}>Silmə təsdiqi</p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:300, color:"#1a1a18", marginBottom:"8px" }}>
              "{deleteTarget.name}"
            </p>
            <p style={{ fontSize:"13px", fontWeight:300, color:"#888", marginBottom:"32px", lineHeight:1.6 }}>
              Bu məhsulu silmək istədiyinizdən əminsiniz?<br/>Bu əməliyyat geri alına bilməz.
            </p>
            <div style={{ display:"flex", gap:"12px" }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{ flex:1, padding:"12px", background:"none", border:"1px solid #d8d3c8", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", color:"#666" }}>
                Ləğv et
              </button>
              <button
                onClick={async () => {
                  if (deleteTarget.imageUrl) {
                    const path = deleteTarget.imageUrl.split("/products/")[1];
                    if (path) await supabase.storage.from("products").remove([path]);
                  }
                  await supabase.from("products").delete().eq("id", deleteTarget.id);
                  setDeleteTarget(null);
                  loadProducts();
                }}
                style={{ flex:1, padding:"12px", background:"#e55", border:"none", fontFamily:"'Inter'", fontSize:"12px", letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", color:"#fff", transition:"background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background="#c33")}
                onMouseLeave={e => (e.currentTarget.style.background="#e55")}>
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
