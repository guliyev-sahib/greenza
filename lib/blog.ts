export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: "Dəri baxımı" | "Təbii inqrediyentlər" | "Rutin";
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "zeytun-yaginin-deriye-7-faydasi",
    title: "Zeytun yağının dəriyə 7 faydası",
    description: "Gündəlik baxımda zeytun yağının nə üçün bu qədər güclü inqrediyent olduğunu sadə dillə izah edirik.",
    date: "14 Apr 2026",
    category: "Təbii inqrediyentlər",
    content: [
      "Zeytun yağı dərinin qoruyucu baryerini dəstəkləyən ən klassik təbii inqrediyentlərdən biridir. Tərkibindəki antioksidantlar sərbəst radikalların təsirini azaltmağa kömək edir.",
      "Düzgün formulada istifadə ediləndə zeytun yağı dərini ağırlaşdırmadan yumşaqlıq və elastiklik hissi yaradır. Bu xüsusilə quru və həssas dəri tipində özünü daha çox göstərir.",
      "Gündəlik rutində zeytun yağlı məhsulları təmizləmə və nəmləndirmə mərhələlərinə əlavə etməklə daha balanslı nəticə almaq mümkündür.",
      "Əsas qayda məhsulun ümumi formuluna diqqət etməkdir: təkcə bir inqrediyent deyil, bütün kompozisiya dəri ilə uyğun işləməlidir.",
    ],
  },
  {
    slug: "sizanaqdan-xilas-olmaq-ucun-5-tebii-usul",
    title: "Sızanaqdan xilas olmaq üçün 5 təbii üsul",
    description: "Dərini yormadan, ardıcıl və sakit bir rutinlə sızanağa meyilli dəriyə necə baxmaq olar?",
    date: "10 Apr 2026",
    category: "Dəri baxımı",
    content: [
      "Sızanaqlı dəri üçün ən vacib qayda aqressiv addımlardan qaçmaqdır. Həddindən artıq təmizləmə və çox sayda aktiv istifadə baryeri zəiflədə bilər.",
      "Gündə iki dəfə yumşaq təmizləmə, həftədə bir neçə dəfə nəzarətli eksfoliasiya və stabil nəmləndirmə uzunmüddətli nəticə verir.",
      "Təbii antiseptik və sakitləşdirici inqrediyentlər olan məhsullar qızartını azaltmağa kömək edir, amma davamlı istifadə daha önəmlidir.",
      "Rutinə başladıqdan sonra nəticəni qiymətləndirmək üçün minimum 3-4 həftə vaxt vermək tövsiyə olunur.",
    ],
  },
  {
    slug: "21-gunluk-sade-rutin-nece-qurulur",
    title: "21 günlük sadə rutin necə qurulur?",
    description: "Az addım, davamlı tətbiq və doğru məhsul seçimi ilə real nəticə almağın praktik planı.",
    date: "7 Apr 2026",
    category: "Rutin",
    content: [
      "Davamlı dəri baxımı üçün mürəkkəb sxemə ehtiyac yoxdur. Təmizlə, nəmləndir və həftəlik eksfoliasiya kimi əsas addımlar kifayətdir.",
      "Səhər və axşam üçün ayrı, amma bir-birini tamamlayan məhsullar seçmək dərinin balansını qoruyur.",
      "Rutinin uğurlu olması üçün hər məhsulu düzgün miqdarda və düzgün ardıcıllıqla istifadə etmək vacibdir.",
      "21 gün ərzində stabil tətbiq etdikdə dəri toxumasında və ümumi komfort hissində nəzərəçarpan dəyişiklik mümkündür.",
    ],
  },
  {
    slug: "hessas-deri-ucun-ingredient-secimi",
    title: "Həssas dəri üçün inqrediyent seçimi",
    description: "Həssas dəri üçün məhsul seçərkən nələrə baxmalı və hansı komponentlərdən uzaq durmalı?",
    date: "2 Apr 2026",
    category: "Dəri baxımı",
    content: [
      "Həssas dəri tipində sadə və qısa tərkibli məhsullar adətən daha yaxşı nəticə verir. Hər yeni məhsulu tədricən rutinə əlavə etmək daha təhlükəsizdir.",
      "Sakitləşdirici komponentlər, nəmləndirici bazalar və aşağı qıcıqlandırıcı formulalar gündəlik istifadə üçün daha uyğundur.",
      "Ətir və kəskin aktivlərin çox olduğu məhsullar bəzi insanlarda qızartı və diskomfort yarada bilər.",
      "Ən yaxşı yanaşma dərinin reaksiyasını izləmək və rutini mərhələli şəkildə qurmaqdır.",
    ],
  },
];

