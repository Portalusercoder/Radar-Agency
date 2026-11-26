import type { Text } from "./i18n";

export const SITE = {
  nameAr: "رادار",
  nameEn: "Radar",
  phone: "+966550766767",
  phoneDisplay: "055 076 6767",
  whatsapp: "https://wa.me/966550766767",
  email: "contact@radaragency.sa",
  dashboard: "https://dashboard.radaar-sa.com",
  instagram: "https://instagram.com/radaaragency",
  twitter: "https://twitter.com/RadaarAgency",
  linkedin: "https://www.linkedin.com/company/radaaragency/",
  jobs: "https://www.linkedin.com/company/radaaragency/jobs/",
};

export const SERVICE_OPTIONS: { value: string; label: Text }[] = [
  { value: "media-buying", label: { ar: "شراء الإعلانات (إعلانات مدفوعة)", en: "Media buying (paid ads)" } },
  { value: "store-design", label: { ar: "تصميم المتاجر (UI/UX)", en: "Store design (UI/UX)" } },
  { value: "branding", label: { ar: "الهوية والعلامة", en: "Branding" } },
  { value: "content-creation", label: { ar: "صناعة المحتوى", en: "Content creation" } },
];

export type ServiceIcon =
  | "ads"
  | "social"
  | "design"
  | "store"
  | "seo"
  | "geo"
  | "maps"
  | "consult"
  | "influencer";

export type ServicePage = {
  slug: string;
  icon: ServiceIcon;
  title: Text;
  /** Short label for the navbar dropdown and footer. */
  nav: Text;
  /** Tiny descriptor shown next to the label. */
  navNote: Text;
  promise: Text;
  from: string;
  customPrice?: boolean;
  includes: { title: Text; text: Text }[];
  why: Text;
  stats: { value: Text; label: Text }[];
};

/** Cover photo per service, used by the navbar menu and the home accordion. */
export const SERVICE_IMAGES: Record<string, string> = {
  "media-buying": "/media/poster.jpg",
  "store-design": "/media/store.jpg",
  branding: "/media/bags.jpg",
  "content-creation": "/media/snap.jpg",
};

export const SERVICES: ServicePage[] = [
  {
    slug: "media-buying",
    icon: "ads",
    title: { ar: "شراء الإعلانات (إعلانات مدفوعة)", en: "Media buying (paid ads)" },
    nav: { ar: "شراء الإعلانات", en: "Media buying" },
    navNote: { ar: "إعلانات مدفوعة", en: "Paid ads" },
    promise: {
      ar: "نصرف ميزانيتك على المنصات اللي السعودي يفتحها كل يوم: سناب شات، تيك توك، قوقل، وانستقرام. نقيس بالريال لا بالانطباعات.",
      en: "We put your budget on the apps Saudis open every day: Snapchat, TikTok, Google, and Instagram. We measure in riyals, not impressions.",
    },
    from: "2,000",
    includes: [
      { title: { ar: "صياغة الإعلان", en: "Ad copy" }, text: { ar: "نصوص قصيرة باللهجة اللي يفهمها عميلك، مو ترجمة إنجليزي.", en: "Short copy in the dialect your customer speaks — not translated English." } },
      { title: { ar: "استهداف السوق السعودي", en: "Saudi targeting" }, text: { ar: "مدن، اهتمامات، وأوقات الذروة في الرياض وجدة والدمام.", en: "Cities, interests, and peak hours in Riyadh, Jeddah, and Dammam." } },
      { title: { ar: "إطلاق الحملات", en: "Campaign launch" }, text: { ar: "سناب، تيك توك، قوقل، وميتا — حسب المنتج والجمهور.", en: "Snapchat, TikTok, Google, and Meta — matched to the product and audience." } },
      { title: { ar: "تحسين العائد", en: "Return" }, text: { ar: "نراقب ROAS وCPA ونعدّل أسبوعيًا، مو في آخر الشهر.", en: "We watch ROAS and CPA and adjust weekly, not at month-end." } },
      { title: { ar: "اختبارات A/B", en: "A/B tests" }, text: { ar: "صورتين، نصّين، عرضين. اللي يبيع نكبّر ميزانيته.", en: "Two images, two lines, two offers. We scale the one that sells." } },
      { title: { ar: "تقرير شهري بالعربي", en: "Monthly Arabic report" }, text: { ar: "صرف، مبيعات، تكلفة الطلب — واضح لصاحب المنشأة.", en: "Spend, sales, cost per order — clear for the business owner." } },
    ],
    why: {
      ar: "السوق السعودي يدفع أكثر من 86٪ من إنفاقه الإعلاني على السوشيال. اللي يفرّق مو الحضور، اللي يفرّق ربط الإعلان بمتجرك وقياس الطلب.",
      en: "Saudi advertisers put most of their digital spend on social. Presence is not the difference. Tying the ad to the store and measuring orders is.",
    },
    stats: [
      { value: { ar: "+12", en: "+12" }, label: { ar: "ROAS حققناه لعملاء", en: "ROAS delivered for clients" } },
      { value: { ar: "+5 مليون", en: "+5M" }, label: { ar: "ريال صرف إعلاني أديرناه", en: "SAR in ad spend managed" } },
      { value: { ar: "+400", en: "+400" }, label: { ar: "حملة أطلقناها", en: "campaigns launched" } },
    ],
  },
  {
    slug: "store-design",
    icon: "store",
    title: { ar: "تصميم المتاجر (UI/UX)", en: "Store design (UI/UX)" },
    nav: { ar: "تصميم المتاجر", en: "Store design" },
    navNote: { ar: "UI/UX", en: "UI/UX" },
    promise: {
      ar: "نصمم تجربة متجرك من أول نظرة لحد الدفع: واجهة واضحة، رحلة شراء قصيرة، وتنفيذ على سلة أو زد جاهز لتتبع الإعلان.",
      en: "We design your store experience from first glance to payment: a clear interface, a short buying path, and a Salla or Zid build that is ready to track ads.",
    },
    from: "5,999",
    includes: [
      { title: { ar: "رحلة المستخدم", en: "User flows" }, text: { ar: "نرسم الطريق من الإعلان إلى صفحة المنتج إلى الدفع، ونشيل أي خطوة زايدة.", en: "We map the path from ad to product page to payment and remove every extra step." } },
      { title: { ar: "تصميم الواجهة UI", en: "Interface design" }, text: { ar: "الصفحة الرئيسية، التصنيفات، وصفحة المنتج بهوية متجرك وخطوط عربية مقروءة.", en: "Home, collections, and product pages in your identity with readable Arabic type." } },
      { title: { ar: "تجربة الجوال أولًا", en: "Mobile first" }, text: { ar: "أغلب الطلبات من الجوال، فنبدأ التصميم منه ونتأكد أن الأزرار تنضغط بإبهام واحد.", en: "Most orders come from phones, so we start there and make sure buttons work with one thumb." } },
      { title: { ar: "تجربة الشراء", en: "Checkout UX" }, text: { ar: "مدى وآبل باي والتقسيط وخطوات أقل، عشان العميل ما يتراجع عند الدفع.", en: "Mada, Apple Pay, installments, and fewer steps so customers do not drop at payment." } },
      { title: { ar: "التنفيذ على سلة وزد", en: "Salla and Zid build" }, text: { ar: "نطبق التصميم داخل المنصة، نرفع المنتجات، ونضبط السرعة.", en: "We build the design inside the platform, load the catalog, and tune speed." } },
      { title: { ar: "جاهزية الإعلان", en: "Tracking ready" }, text: { ar: "بكسل سناب وتيك توك وقوقل وميتا قبل الإطلاق، عشان الصرف ما يضيع.", en: "Snap, TikTok, Google, and Meta pixels before launch so spend is not wasted." } },
    ],
    why: {
      ar: "أكثر من 68 ألف تاجر يبيعون على سلة. المتجر الحلو بدون رحلة شراء واضحة وتتبع إعلاني متجر يتفرّج عليه الناس وما يطلبون.",
      en: "More than 68,000 merchants sell on Salla. A beautiful store with no clear buying path and no tracking is a store people browse and do not buy from.",
    },
    stats: [
      { value: { ar: "48٪", en: "48%" }, label: { ar: "تحسين تحويل بعد إعادة تصميم", en: "conversion lift after redesign" } },
      { value: { ar: "+20", en: "+20" }, label: { ar: "متجر صممناه", en: "stores designed" } },
      { value: { ar: "4.9/5", en: "4.9/5" }, label: { ar: "تقييم العملاء", en: "client rating" } },
    ],
  },
  {
    slug: "branding",
    icon: "design",
    title: { ar: "الهوية والعلامة", en: "Branding" },
    nav: { ar: "الهوية والعلامة", en: "Branding" },
    navNote: { ar: "هوية", en: "Identity" },
    promise: {
      ar: "هوية تخدم البيع: شعار، ألوان، خطوط، ونبرة صوت يستخدمها فريقك كل أسبوع، مو ملف يتركن في جهاز.",
      en: "Identity that sells: a mark, colors, type, and a voice your team uses every week — not a file that sits on a drive.",
    },
    from: "",
    customPrice: true,
    includes: [
      { title: { ar: "الشعار والرمز", en: "Logo and mark" }, text: { ar: "شعار عربي وإنجليزي يقرأ بوضوح على الجوال واللوحات والتغليف.", en: "An Arabic and English mark that reads clearly on phones, signage, and packaging." } },
      { title: { ar: "الألوان والخطوط", en: "Color and type" }, text: { ar: "لوحة ألوان وخطوط عربية تعطي الإعلان والمتجر نفس الشخصية.", en: "A palette and Arabic type that give ads and the store one personality." } },
      { title: { ar: "نبرة الصوت", en: "Brand voice" }, text: { ar: "كيف تتكلم علامتك: كلمات نستخدمها، وكلمات نتجنبها، وبلهجة السوق.", en: "How your brand speaks: words we use, words we avoid, in the market’s voice." } },
      { title: { ar: "قوالب جاهزة", en: "Templates" }, text: { ar: "قصص وبنرات وبطاقات منتج يقدر فريقك يعدّلها بدون مصمم.", en: "Stories, banners, and product cards your team can edit without a designer." } },
      { title: { ar: "دليل الاستخدام", en: "Brand guidelines" }, text: { ar: "ملف واضح يحدد المسافات والاستخدامات الصحيحة والخاطئة.", en: "A clear file for spacing and the right and wrong ways to use the identity." } },
      { title: { ar: "مطبوعات", en: "Print" }, text: { ar: "كروت، رول أب، وأوراق رسمية لو احتجت حضورًا أرضيًا.", en: "Cards, roll-ups, and letterhead if you need an offline presence." } },
    ],
    why: {
      ar: "في سوق مزدحم بالإعلانات العمودية، العلامة الضعيفة تأكل الميزانية قبل ما يوصل العميل. الهوية الواضحة تخلي كل ريال إعلان يشتغل أكثر.",
      en: "In a feed full of vertical ads, a weak brand spends the budget before the customer arrives. A clear identity makes every riyal of advertising work harder.",
    },
    stats: [
      { value: { ar: "+1,000", en: "+1,000" }, label: { ar: "تصميم نفّذناه", en: "designs delivered" } },
      { value: { ar: "95٪", en: "95%" }, label: { ar: "التزام بالتسليم", en: "on-time delivery" } },
      { value: { ar: "+10", en: "+10" }, label: { ar: "هويات أعدنا بناءها", en: "identities rebuilt" } },
    ],
  },
  {
    slug: "content-creation",
    icon: "social",
    title: { ar: "صناعة المحتوى", en: "Content creation" },
    nav: { ar: "صناعة المحتوى", en: "Content creation" },
    navNote: { ar: "محتوى", en: "Content" },
    promise: {
      ar: "محتوى سناب وتيك توك وانستقرام بخطة شهرية ولهجة محلية: فيديو قصير، تصوير، وكتابة. الحساب يتكلم بصوت مشروعك.",
      en: "Snapchat, TikTok, and Instagram content on a monthly plan in a local voice: short video, photography, and writing. The account sounds like your business.",
    },
    from: "2,000",
    includes: [
      { title: { ar: "خطة محتوى شهرية", en: "Monthly plan" }, text: { ar: "تقويم واضح: قصص، ريلز، عروض، ومحتوى يثبت الثقة.", en: "A clear calendar: stories, reels, offers, and trust-building posts." } },
      { title: { ar: "فيديو قصير", en: "Short video" }, text: { ar: "ريلز وتيك توك وسناب بإيقاع سريع وأول ثلاث ثواني تمسك المشاهد.", en: "Reels, TikToks, and Snaps with a fast pace and a first three seconds that hold the viewer." } },
      { title: { ar: "تصوير المنتج", en: "Product shoots" }, text: { ar: "صور وفيديو للمنتج بإضاءة وزوايا تناسب الإعلان والمتجر.", en: "Photo and video of the product, lit and framed for ads and the store." } },
      { title: { ar: "كتابة باللهجة السعودية", en: "Saudi voice" }, text: { ar: "نكتب كما يتكلم عميلك، مو فصحى معلّبة.", en: "We write the way your customer talks, not canned formal Arabic." } },
      { title: { ar: "نشر وجدولة", en: "Publishing" }, text: { ar: "نلتزم بمواعيد الذروة، خصوصًا بعد العصر والمساء.", en: "We post at peak hours, especially late afternoon and evening." } },
      { title: { ar: "تفاعل وتقرير", en: "Engagement and report" }, text: { ar: "ردود، رسائل، وتقرير شهري بالأرقام اللي تهمك.", en: "Replies, inbox, and a monthly report on the numbers that matter." } },
    ],
    why: {
      ar: "سناب شات يوصل قرابة 90٪ من البالغين في السعودية. تيك توك هو أكبر جمهور. لو المحتوى منسوخ من انستقرام، السوق يحس فورًا.",
      en: "Snapchat still reaches most Saudi adults. TikTok is the largest audience. Reposted Instagram content is obvious here.",
    },
    stats: [
      { value: { ar: "+40", en: "+40" }, label: { ar: "عميل إدارة محتوى", en: "content retainers" } },
      { value: { ar: "+500", en: "+500" }, label: { ar: "نص كتبناه", en: "pieces of copy written" } },
      { value: { ar: "شهري", en: "Monthly" }, label: { ar: "تقرير ثابت", en: "fixed report" } },
    ],
  },
];

/** Each service lives at its own top-level page: /media-buying, /branding, … */
export function servicePath(slug: string) {
  return `/${slug}`;
}

/** Old slugs and removed services still resolve somewhere sensible. */
export const LEGACY_SERVICE_SLUGS: Record<string, string | null> = {
  advertisement: "media-buying",
  "social-media": "content-creation",
  "graphic-design": "branding",
  "online-stores": "store-design",
  seo: null,
  geo: null,
  "local-seo": null,
  consulting: null,
  influencer: null,
};

export const PACKAGES = [
  {
    id: "estitlaa",
    name: { ar: "باقة الاستطلاع", en: "Scout" },
    text: {
      ar: "نمسح منافسينك في السوق السعودي ونطلق تجربة بميزانية محدودة على منصتين — غالبًا سناب وتيك توك أو قوقل. نشوف وين الطلب قبل ما نكبّر الصرف.",
      en: "We map your Saudi competitors and run a small test on two platforms — usually Snapchat and TikTok or Google. We find demand before we raise spend.",
    },
  },
  {
    id: "eqlaa",
    name: { ar: "باقة الإقلاع", en: "Takeoff" },
    text: {
      ar: "بعد ما نتأكد أي قناة تبيع، نوسّع على ثلاث منصات ونثبّت رسالة إعلانية واحدة. تحسين أسبوعي وتقرير واضح.",
      en: "Once we know which channel sells, we expand to three platforms and lock one message. Weekly optimization, a clear report.",
    },
  },
  {
    id: "wosol",
    name: { ar: "باقة الوصول", en: "Reach" },
    text: {
      ar: "إدارة شهرية كاملة: إعلان، محتوى، وتحسين مستمر لحد ما توصل أرقام المبيعات اللي اتفقنا عليها.",
      en: "A full monthly retainer: ads, content, and ongoing optimization until we hit the sales numbers we agreed.",
    },
  },
];

export type WorkCategory = "stores" | "social" | "identity";

export const PORTFOLIO: {
  id: string;
  category: WorkCategory;
  title: Text;
  city: Text;
  date: Text;
  text: Text;
  img: string;
  to?: string;
}[] = [
  {
    id: "laduun",
    category: "stores",
    title: { ar: "لدن للعود", en: "Laduun Oud" },
    city: { ar: "السعودية", en: "Saudi Arabia" },
    date: { ar: "فبراير 2024", en: "Feb, 2024" },
    img: "/media/store.jpg",
    to: "/blog/case-laduun",
    text: {
      ar: "متجر عود. حسّنّا التجربة، المحتوى، والعروض. الزيارات +30٪ والمبيعات الإلكترونية +33٪ في الفترة الأولى.",
      en: "An oud store. We improved the experience, content, and offers. Visits +30% and online sales +33% in the first period.",
    },
  },
  {
    id: "salla-brands",
    category: "stores",
    title: { ar: "متاجر سلة", en: "Salla stores" },
    city: { ar: "الرياض وجدة", en: "Riyadh and Jeddah" },
    date: { ar: "نوفمبر 2025", en: "Nov, 2025" },
    img: "/media/bags.jpg",
    to: "/store-design",
    text: {
      ar: "بناء وتحسين واجهات سلة: منتجات، بنرات، وربط بكسل الإعلان قبل إطلاق الحملات.",
      en: "Building and fixing Salla storefronts: products, banners, and ad pixels before campaigns go live.",
    },
  },
  {
    id: "snap",
    category: "social",
    title: { ar: "حملات سناب شات", en: "Snapchat campaigns" },
    city: { ar: "المملكة", en: "Saudi Arabia" },
    date: { ar: "أغسطس 2025", en: "Aug, 2025" },
    img: "/media/snap.jpg",
    to: "/content-creation",
    text: {
      ar: "إعلانات قصص وفلاتر لمشاريع تجزئة وخدمات محلية — المنصة اللي 89٪ من البالغين يفتحونها.",
      en: "Story and filter ads for retail and local services — the app about 89% of adults still open.",
    },
  },
  {
    id: "identity",
    category: "identity",
    title: { ar: "هويات تجارية", en: "Brand identities" },
    city: { ar: "السعودية", en: "Saudi Arabia" },
    date: { ar: "يونيو 2025", en: "Jun, 2025" },
    img: "/media/pack.jpg",
    to: "/branding",
    text: {
      ar: "ملفات هوية لمشاريع ناشئة: شعار، ألوان، وقوالب إعلان يستخدمها فريقك كل أسبوع.",
      en: "Identity files for growing brands: mark, colors, and ad templates your team uses every week.",
    },
  },
  {
    id: "tiktok",
    category: "social",
    title: { ar: "حملات تيك توك", en: "TikTok campaigns" },
    city: { ar: "السعودية", en: "Saudi Arabia" },
    date: { ar: "مارس 2025", en: "Mar, 2025" },
    img: "/media/phone.jpg",
    to: "/media-buying",
    text: {
      ar: "إعلانات عمودية مربوطة بسلة أو واتساب — نفس المنصة اللي الجمهور يفتحها أطول وقت في اليوم.",
      en: "Vertical ads tied to Salla or WhatsApp — the app people here stay in the longest.",
    },
  },
  {
    id: "riyadh",
    category: "identity",
    title: { ar: "حضور من الرياض", en: "Presence from Riyadh" },
    city: { ar: "الرياض", en: "Riyadh" },
    date: { ar: "يناير 2025", en: "Jan, 2025" },
    img: "/media/city.jpg",
    to: "/portfolio",
    text: {
      ar: "تشغيل حملات وواجهات لمتاجر وخدمات محلية، بلهجة السوق وتقرير يقرأه صاحب المنشأة.",
      en: "Campaigns and storefronts for local shops and services, in the market’s voice, with a report the owner can read.",
    },
  },
];

export const PROOFS = [
  {
    id: "laduun",
    name: { ar: "لدن للعود", en: "Laduun Oud" },
    role: { ar: "دراسة حالة منشورة", en: "Published case study" },
    text: {
      ar: "متجر عود بغى يتوسّع أونلاين. حسّنّا التجربة والمحتوى والحملات. الزيارات +30٪ والمبيعات الإلكترونية +33٪ في الفترة الأولى.",
      en: "A Saudi oud store that wanted to grow online. We tightened the experience, content, and campaigns. Visits +30% and e-commerce sales +33% in the first period.",
    },
    metric: { ar: "+33٪", en: "+33%" },
    metricLabel: { ar: "مبيعات إلكترونية", en: "e-commerce sales" },
    to: "/blog/case-laduun",
  },
  {
    id: "spend",
    name: { ar: "تشغيل الإعلانات", en: "Paid media" },
    role: { ar: "أرقام منشورة من رادار", en: "Published Radar figures" },
    text: {
      ar: "أدرنا أكثر من خمسة ملايين ريال صرفًا إعلانيًا عبر أكثر من 400 حملة، ووصل العائد عند عملاء إلى +12.",
      en: "We have managed more than five million riyals in ad spend across more than 400 campaigns, with ROAS reaching +12 for clients.",
    },
    metric: { ar: "+12", en: "+12" },
    metricLabel: { ar: "ROAS لعملاء", en: "ROAS for clients" },
    to: "/media-buying",
  },
  {
    id: "visits",
    name: { ar: "لدن للعود", en: "Laduun Oud" },
    role: { ar: "نفس الدراسة المنشورة", en: "Same published study" },
    text: {
      ar: "قبل تكبير الصرف، ضبّطنا التجربة والعروض. النتيجة الأولى: الزيارات +30٪ مع ارتفاع المبيعات الإلكترونية.",
      en: "Before scaling spend, we fixed the experience and offers. First result: visits +30% alongside the e-commerce lift.",
    },
    metric: { ar: "+30٪", en: "+30%" },
    metricLabel: { ar: "زيارات المتجر", en: "store visits" },
    to: "/blog/case-laduun",
  },
];

export type PostCategory = "journal" | "cases";

export const POSTS: {
  slug: string;
  category: PostCategory;
  title: Text;
  date: Text;
  excerpt: Text;
  body: Text[];
}[] = [
  {
    slug: "saudi-snapchat",
    category: "journal",
    title: {
      ar: "ليش سناب شات ما زال قناة بيع في السعودية؟",
      en: "Why Snapchat is still a sales channel in Saudi",
    },
    date: { ar: "مارس 2026", en: "March 2026" },
    excerpt: {
      ar: "بينما تيك توك يكبر، سناب يحتفظ بـ 89٪ من البالغين هنا. هذا يغيّر شكل الحملة، مو بس شكل الإعلان.",
      en: "TikTok is growing, but Snapchat still holds about 89% of adults here. That changes the campaign, not just the creative.",
    },
    body: [
      {
        ar: "في أغلب الأسواق اختفى سناب لصالح تيك توك. في السعودية الوضع مختلف: المنصتان تعيشان مع بعض، والجمهور يفتح سناب قرابة خمسين مرة في اليوم.",
        en: "In most markets Snapchat faded behind TikTok. In Saudi they sit together, and people open Snapchat dozens of times a day.",
      },
      {
        ar: "إذا نسخت إعلان انستقرام ولصقته في سناب، السوق يعرف. القصة العمودية، العرض الواضح، ورابط السلة أو الواتساب هم اللي يحرّكون الطلب.",
        en: "Paste an Instagram ad into Snapchat and the market can tell. Vertical story, a clear offer, and a Salla or WhatsApp link are what move demand.",
      },
      {
        ar: "نبدأ عادة باختبار سناب مع منصة ثانية — تيك توك أو قوقل — قبل ما نوسّع الميزانية. هذا أرخص من «حضور على ست منصات» من اليوم الأول.",
        en: "We usually test Snapchat with a second platform — TikTok or Google — before we raise the budget. That is cheaper than “being on six platforms” on day one.",
      },
    ],
  },
  {
    slug: "salla-zid",
    category: "journal",
    title: {
      ar: "سلة وزد: وين تصرف الإعلان إذا المتجر يضيّع الطلب؟",
      en: "Salla and Zid: why ads fail when the store leaks demand",
    },
    date: { ar: "فبراير 2026", en: "February 2026" },
    excerpt: {
      ar: "68 ألف تاجر على سلة. المشكلة النادرة مو «ما عندي متجر». المشكلة إن الإعلان يوصل لصفحة بطيئة.",
      en: "68,000 merchants on Salla. The rare problem is not “I have no store.” It is an ad that lands on a slow page.",
    },
    body: [
      {
        ar: "التاجر السعودي يبني على سلة أو زد لأن الدفع المحلي والتقسيط والدعم العربي جاهزين. الإعلان ينجح إذا كانت خطوة الشراء قصيرة.",
        en: "Saudi merchants build on Salla or Zid because local pay, installments, and Arabic support are ready. Ads work when checkout is short.",
      },
      {
        ar: "قبل ما نكبّر الصرف نتأكد من البكسل، السلة، وخيارات مدى وآبل باي. بدونها تقرير الـ ROAS يكذب عليك.",
        en: "Before we scale spend we check the pixel, cart, and Mada / Apple Pay. Without that, the ROAS report lies.",
      },
      {
        ar: "إعادة تصميم بسيطة لصفحة المنتج أحيانًا ترفع التحويل أكثر من زيادة الميزانية.",
        en: "A simple product-page redesign often lifts conversion more than a bigger budget.",
      },
    ],
  },
  {
    slug: "case-laduun",
    category: "cases",
    title: { ar: "دراسة حالة: لدن للعود", en: "Case study: Laduun Oud" },
    date: { ar: "1 فبراير 2024", en: "1 February 2024" },
    excerpt: {
      ar: "متجر عود بغى يتوسّع أونلاين. الزيارات +30٪ والمبيعات +33٪ بعد تحسين التجربة والمحتوى والحملات.",
      en: "An oud store that wanted to grow online. Visits +30% and sales +33% after we fixed experience, content, and campaigns.",
    },
    body: [
      {
        ar: "العميل: لدن للعود — متجر متخصص بجودة عالية. التحدي: توسيع الوصول والمبيعات الإلكترونية.",
        en: "Client: Laduun Oud — a specialist store. Challenge: expand reach and online sales.",
      },
      {
        ar: "اشتغلنا على تجربة الموقع، خدمة العميل، العروض، التصاميم، المحتوى، والخطة الرقمية.",
        en: "We worked on the site experience, customer care, offers, design, content, and the digital plan.",
      },
      {
        ar: "النتيجة في الفترة الأولى: زيادة زيارات 30٪ وارتفاع مبيعات إلكترونية 33٪. دراسة الحالة الأصلية منشورة على موقع رادار.",
        en: "First-period result: visits up 30% and e-commerce sales up 33%. The original case was published on Radar’s site.",
      },
    ],
  },
  {
    slug: "always-on",
    category: "journal",
    title: {
      ar: "ليش الحملات الموسمية ما تكفي منشأتك؟",
      en: "Why seasonal bursts are not enough",
    },
    date: { ar: "يناير 2026", en: "January 2026" },
    excerpt: {
      ar: "رمضان واليوم الوطني مهمين. بس السوق السعودي صار يشتري كل يوم، والخوارزميات تتعلم من الاستمرار.",
      en: "Ramadan and National Day matter. But Saudi customers buy year-round, and the algorithms learn from continuity.",
    },
    body: [
      {
        ar: "الموسم يرفع الصوت. التشغيل المستمر يعلّم المنصة مين يشتري منك بعد الموسم.",
        en: "A season raises volume. Always-on teaching tells the platform who still buys after the season.",
      },
      {
        ar: "المنشآت اللي توقف الإعلان بعد الحملة ترجع لصفر التعلّم. تكلفة الطلب ترتفع في كل رجعة.",
        en: "Businesses that pause ads after a burst reset the learning. Cost per order rises every time they return.",
      },
      {
        ar: "الأفضل: ميزانية دائمة صغيرة، وتكبير محسوب في المواسم — مو العكس.",
        en: "Better: a small always-on budget, then a planned lift in peak seasons — not the reverse.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export function serviceLeadValue(slug: string) {
  return SERVICES.some((service) => service.slug === slug) ? slug : "media-buying";
}
