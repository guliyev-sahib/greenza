"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  qty: number;
  color: string;
  image_url?: string | null;
};
type CartCtx = { items: CartItem[]; add: (p: Omit<CartItem,"qty">) => void; remove: (id: number) => void; update: (id: number, qty: number) => void; clear: () => void; total: number; count: number; };

const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => useContext(Ctx)!;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => { const s = localStorage.getItem("greenza-cart"); if (s) setItems(JSON.parse(s)); }, []);
  useEffect(() => { localStorage.setItem("greenza-cart", JSON.stringify(items)); }, [items]);

  const add = (p: Omit<CartItem,"qty">) => setItems(prev => {
    const ex = prev.find(i => i.id === p.id);
    if (ex) return prev.map(i => i.id === p.id ? {...i, qty: i.qty+1} : i);
    return [...prev, {...p, qty: 1}];
  });
  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const update = (id: number, qty: number) => setItems(prev => qty < 1 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? {...i, qty} : i));
  const clear = () => setItems([]);
  const total = items.reduce((s,i) => s + i.price * i.qty, 0);
  const count = items.reduce((s,i) => s + i.qty, 0);

  return <Ctx.Provider value={{ items, add, remove, update, clear, total, count }}>{children}</Ctx.Provider>;
}
