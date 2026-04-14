export type ProductCategory = "sabunlar" | "skrablar" | "nemlendiricilar";

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  shortDesc: string;
  description: string;
  ingredients: string[];
}

export const products: Product[] = [
  {
    id: 1,
    slug: "zeytun-lavanda-sabun",
    name: "Zeytun & Lavanda Sabunu",
    category: "sabunlar",
    price: 14,
    shortDesc: "Həssas dəri üçün yumşaq təmizləmə.",
    description: "Zeytun yağı və lavanda ekstraktı ilə hazırlanan bu sabun dərini qurutmadan təmizləyir və rahatlıq hissi yaradır.",
    ingredients: ["Zeytun yağı", "Lavanda", "Kokos yağı", "Bitki qliserini"],
  },
  {
    id: 2,
    slug: "bal-kamil-sabun",
    name: "Bal & Çobanyastığı Sabunu",
    category: "sabunlar",
    price: 16,
    shortDesc: "Parlaqlıq verən gündəlik sabun.",
    description: "Bal və çobanyastığı ilə hazırlanmış formul dəri tonunu bərabərləşdirməyə kömək edir.",
    ingredients: ["Bal", "Çobanyastığı", "Şi yağı", "Bitki qliserini"],
  },
  {
    id: 3,
    slug: "kokos-aloe-sabun",
    name: "Kokos & Aloe Vera Sabunu",
    category: "sabunlar",
    price: 15,
    shortDesc: "Nəmləndirici effektli təmizləmə.",
    description: "Kokos və aloe vera sayəsində dərini yumşaldır, təmizlikdən sonra dartılma hissini azaldır.",
    ingredients: ["Kokos yağı", "Aloe vera", "Düyü nişastası", "Bitki qliserini"],
  },
  {
    id: 4,
    slug: "aktiv-komur-sabun",
    name: "Aktiv Kömür Sabunu",
    category: "sabunlar",
    price: 18,
    shortDesc: "Dərin təmizləyici gündəlik baxım.",
    description: "Aktiv kömürlə zəngin bu sabun məsamələri təmizləyir və yağ balansını qorumağa dəstək olur.",
    ingredients: ["Aktiv kömür", "Zeytun yağı", "Nanə", "Kaolin gili"],
  },
  {
    id: 5,
    slug: "duz-sitrus-skrab",
    name: "Dəniz Duzu & Sitrus Skrabı",
    category: "skrablar",
    price: 22,
    shortDesc: "Canlandırıcı bədən skrabı.",
    description: "Dəniz duzu və sitrus yağları ilə ölü dəri hüceyrələrini aradan qaldırır və dərini hamarlaşdırır.",
    ingredients: ["Dəniz duzu", "Portağal yağı", "Badam yağı", "E vitamini"],
  },
  {
    id: 6,
    slug: "qehve-seker-skrab",
    name: "Qəhvə & Şəkər Skrabı",
    category: "skrablar",
    price: 24,
    shortDesc: "Enerji verən yumşaq peeling.",
    description: "Təbii qəhvə dənələri və şəkər kristalları ilə dəri səthini cilalayır.",
    ingredients: ["Qəhvə", "Qamış şəkəri", "Kokos yağı", "Vanil ekstraktı"],
  },
  {
    id: 7,
    slug: "argan-gul-skrab",
    name: "Argan & Gül Skrabı",
    category: "skrablar",
    price: 27,
    shortDesc: "Qidalandırıcı premium formul.",
    description: "Argan yağı və gül ləçəkləri ilə hazırlanan skrab dərini qidalandırır və elastikliyi artırır.",
    ingredients: ["Argan yağı", "Gül ləçəkləri", "Dəniz duzu", "Jojoba yağı"],
  },
  {
    id: 8,
    slug: "yasliq-cay-agaci-skrab",
    name: "Yaşıl Çay & Çay Ağacı Skrabı",
    category: "skrablar",
    price: 23,
    shortDesc: "Yağlı dəri üçün balanslayıcı skrab.",
    description: "Yaşıl çay və çay ağacı ekstraktı ilə dərini təmiz saxlayır və təravətləndirir.",
    ingredients: ["Yaşıl çay", "Çay ağacı yağı", "Qamış şəkəri", "Aloe vera"],
  },
  {
    id: 9,
    slug: "aloe-nem-kremi",
    name: "Aloe Nəmləndirici Krem",
    category: "nemlendiricilar",
    price: 28,
    shortDesc: "Gündəlik yüngül nəmləndirmə.",
    description: "Yüngül teksturalı aloe kremi dərini gün boyu nəmləndirir və rahatlıq hissi verir.",
    ingredients: ["Aloe vera", "Hialuron turşusu", "Pantenol", "E vitamini"],
  },
  {
    id: 10,
    slug: "bal-kerem-maskasi",
    name: "Bal Qidalandırıcı Krem",
    category: "nemlendiricilar",
    price: 31,
    shortDesc: "Quru dəri üçün intensiv baxım.",
    description: "Bal və şi yağı əsasında hazırlanmış krem dərinin qoruyucu baryerini gücləndirməyə kömək edir.",
    ingredients: ["Bal", "Şi yağı", "Skvalan", "Pantenol"],
  },
  {
    id: 11,
    slug: "gece-berpa-kremi",
    name: "Gecə Bərpa Kremi",
    category: "nemlendiricilar",
    price: 35,
    shortDesc: "Gecə üçün dərin bərpaedici krem.",
    description: "Gecə istifadəsi üçün hazırlanmış formul dərini sakitləşdirir və səhərə daha canlı görünüş yaradır.",
    ingredients: ["Ceramid", "Niacinamide", "Avokado yağı", "Allantoin"],
  },
  {
    id: 12,
    slug: "gundelik-qoruyucu-krem",
    name: "Gündəlik Qoruyucu Krem",
    category: "nemlendiricilar",
    price: 29,
    shortDesc: "Şəhər həyatı üçün qoruyucu nəmləndirmə.",
    description: "Yüngül qoruyucu qat yaradır, dərini nəmləndirir və gündəlik istifadə üçün ideal seçimdir.",
    ingredients: ["Jojoba yağı", "Aloe vera", "Skvalan", "Yaşıl çay ekstraktı"],
  },
];
