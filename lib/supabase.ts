"use client";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: "sabunlar" | "skrablar" | "nemlendiriciler";
  price: number;
  short_desc: string | null;
  description: string | null;
  ingredients: string[] | null;
  image_url: string | null;
  color: string | null;
  in_stock: boolean;
  created_at: string;
};

