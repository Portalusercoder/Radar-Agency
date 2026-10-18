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
  { value: "ads", label: { ar: "إدارة الإعلانات", en: "Ads management" } },
  { value: "consult", label: { ar: "استشارة تسويقية واستراتيجية", en: "Marketing consulting and strategy" } },
  { value: "store", label: { ar: "متجر سلة أو زد", en: "Salla or Zid store" } },
  { value: "creative", label: { ar: "تصاميم إعلانية", en: "Ad design" } },
  { value: "social", label: { ar: "إدارة سناب وتيك توك وانستقرام", en: "Snapchat, TikTok, Instagram" } },
  { value: "influencer", label: { ar: "تسويق بالمؤثرين", en: "Influencer marketing" } },
  { value: "seo", label: { ar: "تحسين محركات البحث", en: "Search visibility" } },
  { value: "geo", label: { ar: "الظهور في البحث بالذكاء الاصطناعي", en: "Generative Engine Optimization" } },
  { value: "local-seo", label: { ar: "تحسين الظهور المحلي وخرائط قوقل", en: "Local SEO and Google Maps" } },
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
  promise: Text;
  from: string;
  customPrice?: boolean;
  includes: { title: Text; text: Text }[];
  why: Text;
  stats: { value: Text; label: Text }[];
};

export const SERVICES: ServicePage[] = [
  {
    slug: "advertisement",
    icon: "ads",
    title: { ar: "إدارة الإعلانات", en: "Ads management" },
    promise: {
      ar: "نصرف ميزانيتك على المنصات اللي السعودي يفتحها كل يوم: سناب شات، تيك توك، قوقل، وانستقرام. نقيس بالريال لا بالانطباعات.",
      en: "We put your budget on the apps Saudis open every day: Snapchat, TikTok, Google, and Instagram. We measure in riyals, not impressions.",
    },
    from: "2,000",
    includes: [
      { title: { ar: "صياغة الإعلان", en: "Ad copy" }, text: { ar: "نصوص قصيرة باللهجة اللي يفهمها عميلك، مو ترجمة إنجليزي.", en: "Short copy in the dialect your customer speaks — not translated English." } },
      { title: { ar: "استهداف السوق السعودي", en: "Saudi targeting" }, text: { ar: "مدن، اهتمامات، وأوقات الذروة في الرياض وجدة والدمام.", en: "Cities, interests, and peak hours in Riyadh, Jeddah, and Dammam." } },
      { title: { ar: "إطلاق الحملات", en: "Launch" }, text: { ar: "سناب، تيك توك، قوقل، وميتا — حسب المنتج والجمهور.", en: "Snapchat, TikTok, Google, and Meta — matched to the product and audience." } },
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
    slug: "social-media",
    icon: "social",
    title: { ar: "إدارة المنصات", en: "Social management" },
    promise: {
      ar: "محتوى سناب وتيك توك وانستقرام بخطة شهرية، لهجة محلية، وجدولة ثابتة. الحساب يتكلم بصوت مشروعك.",
      en: "Snapchat, TikTok, and Instagram with a monthly plan, local voice, and a fixed schedule. The account sounds like your business.",
    },
    from: "2,000",
    includes: [
      { title: { ar: "خطة محتوى شهرية", en: "Monthly plan" }, text: { ar: "تقويم واضح: قصص، ريلز، عروض، ومحتوى يثبت الثقة.", en: "A clear calendar: stories, reels, offers, and trust-building posts." } },
      { title: { ar: "كتابة باللهجة السعودية", en: "Saudi voice" }, text: { ar: "نكتب كما يتكلم عميلك، مو فصحى معلّبة.", en: "We write the way your customer talks, not canned formal Arabic." } },
      { title: { ar: "تصميم المنشورات", en: "Creative" }, text: { ar: "قصص وبنرات وبطاقات منتج بنفس الهوية.", en: "Stories, banners, and product cards in one identity." } },
      { title: { ar: "نشر وجدولة", en: "Publishing" }, text: { ar: "نلتزم بمواعيد الذروة، خصوصًا بعد العصر والمساء.", en: "We post at peak hours, especially late afternoon and evening." } },
      { title: { ar: "تفاعل وتحليل", en: "Engagement" }, text: { ar: "ردود، الموثق، وتقرير شهري بالأرقام اللي تهمك.", en: "Replies, inbox, and a monthly report on the numbers that matter." } },
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
  {
    slug: "graphic-design",
    icon: "design",
    title: { ar: "التصميم والهوية", en: "Design and identity" },
    promise: {
      ar: "تصاميم تخدم البيع: إعلان، متجر، هوية. مو ديكور يملأ الفراغ.",
      en: "Design that sells: ads, store, identity. Not decoration that fills space.",
    },
    from: "249",
    includes: [
      { title: { ar: "إعلانات المنصات", en: "Platform ads" }, text: { ar: "مقاسات سناب وتيك توك وانستقرام وقوقل جاهزة للإطلاق.", en: "Snapchat, TikTok, Instagram, and Google sizes ready to launch." } },
      { title: { ar: "مواد المتجر", en: "Store assets" }, text: { ar: "سلايدر سلة/زد، بنرات، وبطاقات منتج.", en: "Salla/Zid sliders, banners, and product cards." } },
      { title: { ar: "محتوى المنصات", en: "Social templates" }, text: { ar: "قصص، أغلفة، قوالب ثابتة للهوية.", en: "Stories, covers, and reusable identity templates." } },
      { title: { ar: "مطبوعات", en: "Print" }, text: { ar: "كروت، رول أب، أوراق رسمية إذا احتجت حضورًا أرضيًا.", en: "Cards, roll-ups, and letterhead when you need an offline presence." } },
      { title: { ar: "تطوير الهوية", en: "Identity" }, text: { ar: "شعار، ألوان، وملف استخدام يقدر فريقك يكمل عليه.", en: "Mark, colors, and a usage file your team can keep working from." } },
    ],
    why: {
      ar: "في سوق مزدحم بالإعلانات العمودية، التصميم الضعيف يأكل الميزانية قبل ما يوصل العميل.",
      en: "In a feed full of vertical ads, weak design spends the budget before the customer arrives.",
    },
    stats: [
      { value: { ar: "+1,000", en: "+1,000" }, label: { ar: "تصميم نفّذناه", en: "designs delivered" } },
      { value: { ar: "95٪", en: "95%" }, label: { ar: "التزام بالتسليم", en: "on-time delivery" } },
      { value: { ar: "+10", en: "+10" }, label: { ar: "هويات أعدنا بناءها", en: "identities rebuilt" } },
    ],
  },
  {
    slug: "online-stores",
    icon: "store",
    title: { ar: "متاجر سلة وزد", en: "Salla and Zid stores" },
    promise: {
      ar: "نبني أو نحسّن متجرك على المنصات اللي التاجر السعودي يبيع منها فعلًا: سلة وزد. تجربة شراء قصيرة، وسرعة، وربط للإعلانات.",
      en: "We build or fix stores on the platforms Saudi merchants actually sell from: Salla and Zid. Short checkout, speed, and ads ready to track.",
    },
    from: "5,999",
    includes: [
      { title: { ar: "تجربة الشراء", en: "Checkout" }, text: { ar: "تقليل الخطوات من الإعلان إلى الدفع (مدى / Apple Pay / تقسيط).", en: "Fewer steps from ad to pay (Mada / Apple Pay / installments)." } },
      { title: { ar: "رفع المنتجات", en: "Catalog" }, text: { ar: "صور، وصف عربي واضح، وتصنيف يسهّل البحث داخل المتجر.", en: "Photos, clear Arabic copy, and categories people can find." } },
      { title: { ar: "سرعة المتجر", en: "Speed" }, text: { ar: "صفحات خفيفة؛ العميل ما ينتظر على شبكة الجوال.", en: "Light pages. The customer should not wait on mobile data." } },
      { title: { ar: "بنرات وعروض", en: "Banners" }, text: { ar: "نكتب ونصمّم الواجهة الأولى اللي تشوفها الزائرة.", en: "We write and design the first screen a visitor sees." } },
      { title: { ar: "جاهزية الإعلان", en: "Tracking" }, text: { ar: "بكسل سناب وتيك توك وقوقل وميتا، عشان الصرف ما يضيع.", en: "Snap, TikTok, Google, and Meta pixels so spend is not wasted." } },
    ],
    why: {
      ar: "أكثر من 68 ألف تاجر يبيعون على سلة. المتجر الحلو بدون تتبع إعلاني متجر يتفرّج عليه الناس وما يطلبون.",
      en: "More than 68,000 merchants sell on Salla. A beautiful store with no tracking is a store people browse and do not buy.",
    },
    stats: [
      { value: { ar: "48٪", en: "48%" }, label: { ar: "تحسين تحويل بعد إعادة تصميم", en: "conversion lift after redesign" } },
      { value: { ar: "+20", en: "+20" }, label: { ar: "متجر صممناه", en: "stores designed" } },
      { value: { ar: "4.9/5", en: "4.9/5" }, label: { ar: "تقييم العملاء", en: "client rating" } },
    ],
  },
  {
    slug: "seo",
    title: { ar: "الظهور في قوقل", en: "Google visibility" },
    icon: "seo",
    promise: {
      ar: "باقة ثلاثة أشهر تخلّي «متجر عود الرياض» أو «عطور جدة» يوصّلون لك، مو للمنافس. بعدها شهرين متابعة.",
      en: "A three-month package so “oud store Riyadh” or “Jeddah perfume” reach you, not a competitor. Then two months of follow-up.",
    },
    from: "",
    customPrice: true,
    includes: [
      { title: { ar: "كلمات السوق المحلي", en: "Local queries" }, text: { ar: "نشتغل على بحث السعوديين بالعربي، بما فيه اللهجات والأسماء التجارية.", en: "We work the Arabic searches Saudis actually type, including dialect and brand names." } },
      { title: { ar: "إصلاح الصفحات", en: "Page fixes" }, text: { ar: "عناوين، سرعة، وروابط داخلية من غير حشو أو سبام.", en: "Titles, speed, and internal links — no stuffing or spam." } },
      { title: { ar: "محتوى يجاوب", en: "Useful content" }, text: { ar: "مقالات تفيد العميل وتبني ثقة قوقل، مو تكرار منسوخ.", en: "Articles that help the customer and earn Google’s trust, not copied filler." } },
      { title: { ar: "تقارير شهرية", en: "Monthly reports" }, text: { ar: "كلمات، زيارات، وطلبات — ثلاثة أشهر شغل وشهرين رصد.", en: "Queries, visits, and leads — three months of work, two months of watch." } },
    ],
    why: {
      ar: "الإعلان يوقف إذا وقف الصرف. البحث يبني أصلًا طويلًا لمنشأتك في السوق السعودي.",
      en: "Ads stop when spend stops. Search builds a longer asset for your business in Saudi.",
    },
    stats: [
      { value: { ar: "3 أشهر", en: "3 months" }, label: { ar: "مدة التنفيذ", en: "build period" } },
      { value: { ar: "شهران", en: "2 months" }, label: { ar: "متابعة بعدها", en: "follow-up after" } },
      { value: { ar: "شهري", en: "Monthly" }, label: { ar: "تقرير عربي", en: "Arabic report" } },
    ],
  },
  {
    slug: "geo",
    icon: "geo",
    title: { ar: "الظهور في البحث بالذكاء الاصطناعي", en: "Generative Engine Optimization" },
    promise: {
      ar: "نجهّز علامتك عشان تظهر في إجابات أدوات الذكاء الاصطناعي — قوقل AI Overviews، وChatGPT، ومنصات مشابهة — بنفس وضوح ظهورك في البحث التقليدي.",
      en: "We prepare your brand to show up in AI answers — Google AI Overviews, ChatGPT, and similar tools — with the same clarity you want in classic search.",
    },
    from: "",
    customPrice: true,
    includes: [
      { title: { ar: "مصادر قابلة للاستشهاد", en: "Citable sources" }, text: { ar: "صفحات عربية واضحة تقدر النماذج تعتمد عليها بدل ما تقتبس من منافس.", en: "Clear Arabic pages models can cite, instead of quoting a competitor." } },
      { title: { ar: "كيان العلامة", en: "Brand entity" }, text: { ar: "نوحّد اسمك، خدماتك، ومدنك عبر الموقع والملفات العامة.", en: "We align your name, services, and cities across the site and public profiles." } },
      { title: { ar: "أسئلة السوق", en: "Market questions" }, text: { ar: "نغطّي الأسئلة اللي العميل السعودي يسألها قبل ما يشتري.", en: "We cover the questions a Saudi customer asks before they buy." } },
      { title: { ar: "قياس الإشارات", en: "Signal tracking" }, text: { ar: "نرصد أين تُذكر علامتك في نتائج البحث التوليدي، ونعدّل المحتوى وفق ذلك.", en: "We watch where your brand is mentioned in generative results and adjust the content." } },
    ],
    why: {
      ar: "البحث تغيّر: العميل يسأل أداة ذكاء اصطناعي قبل ما يضغط عشر روابط. إذا ما كنت مصدرًا، يروح الطلب لغيرك.",
      en: "Search changed: people ask an AI tool before they click ten links. If you are not a source, the demand goes elsewhere.",
    },
    stats: [
      { value: { ar: "AI", en: "AI" }, label: { ar: "ظهور في الإجابات التوليدية", en: "visibility in generative answers" } },
      { value: { ar: "عربي", en: "Arabic" }, label: { ar: "محتوى يُستشهد به", en: "citable content" } },
      { value: { ar: "شهري", en: "Monthly" }, label: { ar: "مراجعة للإشارات", en: "signal review" } },
    ],
  },
  {
    slug: "local-seo",
    icon: "maps",
    title: { ar: "تحسين الظهور المحلي", en: "Local SEO" },
    promise: {
      ar: "نخليك تظهر في خرائط قوقل والحزمة المحلية لما العميل يبحث عن خدمتك في الرياض أو جدة أو الدمام.",
      en: "We get you into Google Maps and the local pack when someone searches for your service in Riyadh, Jeddah, or Dammam.",
    },
    from: "",
    customPrice: true,
    includes: [
      { title: { ar: "ملف النشاط على قوقل", en: "Business Profile" }, text: { ar: "نضبط الاسم، الفئة، الصور، وساعات العمل باللهجة والمعلومات الصحيحة.", en: "We set the name, category, photos, and hours with the right Arabic details." } },
      { title: { ar: "كلمات الحي والمدينة", en: "City and district queries" }, text: { ar: "نشتغل على بحث مثل «عطور الرياض» أو «عيادة في العليا».", en: "We work queries such as “oud Riyadh” or “clinic in Olaya.”" } },
      { title: { ar: "التقييمات والردود", en: "Reviews and replies" }, text: { ar: "خطة لجمع تقييمات حقيقية والرد عليها — بدون شراء تقييمات.", en: "A plan to collect real reviews and reply to them — we do not buy ratings." } },
      { title: { ar: "اتساق العناوين", en: "NAP consistency" }, text: { ar: "نفس الاسم والرقم والعنوان في الموقع والأدلة حتى ما يتشتت قوقل.", en: "The same name, number, and address on the site and directories so Google is not confused." } },
    ],
    why: {
      ar: "كثير من الطلب في السعودية يبدأ من الخريطة. ملف ضعيف يعني العميل يوقف عند المنافس الأقرب.",
      en: "A lot of Saudi demand starts on the map. A weak profile means the customer stops at the nearer competitor.",
    },
    stats: [
      { value: { ar: "Maps", en: "Maps" }, label: { ar: "ظهور على خرائط قوقل", en: "Google Maps visibility" } },
      { value: { ar: "3 مدن", en: "3 cities" }, label: { ar: "الرياض وجدة والدمام", en: "Riyadh, Jeddah, Dammam" } },
      { value: { ar: "محلي", en: "Local" }, label: { ar: "حزمة النتائج القريبة", en: "local pack" } },
    ],
  },
  {
    slug: "consulting",
    icon: "consult",
    title: { ar: "الاستشارة والاستراتيجية", en: "Marketing consulting and strategy" },
    promise: {
      ar: "قبل ما تصرف على الإعلان، نحدد لك التمركز، الجمهور، ومزيج القنوات المناسب لسوقك السعودي.",
      en: "Before you spend on ads, we set positioning, audience, and the channel mix that fits your Saudi market.",
    },
    from: "",
    customPrice: true,
    includes: [
      { title: { ar: "قراءة السوق", en: "Market read" }, text: { ar: "منافسونك، وين يشتري عميلك، وأي منصة تستحق الميزانية أولًا.", en: "Your competitors, where customers buy, and which platform deserves budget first." } },
      { title: { ar: "التمركز الذهني", en: "Positioning" }, text: { ar: "جملة واحدة يفهمها العميل لما يشوفك بين عشر إعلانات.", en: "One sentence the customer understands when they see you among ten ads." } },
      { title: { ar: "خطة القنوات", en: "Channel plan" }, text: { ar: "سناب، تيك توك، قوقل، مؤثرين، أو متجر — مو الستة مع بعض من اليوم الأول.", en: "Snapchat, TikTok, Google, creators, or the store — not all six on day one." } },
      { title: { ar: "مؤشرات واضحة", en: "Clear KPIs" }, text: { ar: "نتفق على طلب، تكلفة، وهامش — مو إعجابات.", en: "We agree on orders, cost, and margin — not likes." } },
    ],
    why: {
      ar: "الصرف بدون استراتيجية يشتري ضوضاء. الاستراتيجية تخبرك أين توقف وأين تكبّر.",
      en: "Spend without a strategy buys noise. Strategy tells you where to stop and where to scale.",
    },
    stats: [
      { value: { ar: "15 د", en: "15 min" }, label: { ar: "استشارة أولى سريعة", en: "first consult" } },
      { value: { ar: "قناتان", en: "2 channels" }, label: { ar: "نبدأ بالاختبار لا بالتوسع", en: "test first, then expand" } },
      { value: { ar: "الرياض", en: "Riyadh" }, label: { ar: "فريق يرد من هنا", en: "the team replies from here" } },
    ],
  },
  {
    slug: "influencer",
    icon: "influencer",
    title: { ar: "تسويق بالمؤثرين", en: "Influencer marketing" },
    promise: {
      ar: "نربطك بصنّاع محتوى سعوديين على سناب وتيك توك وانستقرام — باختيار يناسب المنتج، مو بعدد المتابعين فقط.",
      en: "We match you with Saudi creators on Snapchat, TikTok, and Instagram — chosen for the product, not follower count alone.",
    },
    from: "",
    customPrice: true,
    includes: [
      { title: { ar: "اختيار الصانع", en: "Creator fit" }, text: { ar: "جمهور محلي، لهجة، وسجل تعاونات قريبة من منتجك.", en: "A local audience, the right voice, and collaborations close to your product." } },
      { title: { ar: "الموجز والعرض", en: "Brief and offer" }, text: { ar: "نص واضح، زاوية تصوير، ورابط سلة أو واتساب.", en: "Clear copy, a shooting angle, and a Salla or WhatsApp link." } },
      { title: { ar: "التنفيذ والمتابعة", en: "Run and follow" }, text: { ar: "تنسيق النشر، مراجعة المادة، وتتبع الأكواد أو الروابط.", en: "We coordinate posting, review the asset, and track codes or links." } },
      { title: { ar: "قياس الطلب", en: "Demand, not vanity" }, text: { ar: "نحسب الطلب والتكلفة، مو بس المشاهدات.", en: "We count orders and cost, not just views." } },
    ],
    why: {
      ar: "المؤثر الغلط يصرف الميزانية على جمهور ما يشتري. الاختيار المحلي أخصر من حملة مشاهدات فارغة.",
      en: "The wrong creator spends the budget on people who will not buy. A local match is cheaper than empty views.",
    },
    stats: [
      { value: { ar: "سناب", en: "Snap" }, label: { ar: "وتيك توك وانستقرام", en: "TikTok and Instagram" } },
      { value: { ar: "محلي", en: "Local" }, label: { ar: "صنّاع من السوق السعودي", en: "creators from this market" } },
      { value: { ar: "الطلب", en: "Orders" }, label: { ar: "مقياس التعاون", en: "how we score a collab" } },
    ],
  },
];

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
  text: Text;
  img: string;
  to?: string;
}[] = [
  {
    id: "laduun",
    category: "stores",
    title: { ar: "لدن للعود", en: "Laduun Oud" },
    city: { ar: "السعودية", en: "Saudi Arabia" },
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
    img: "/media/bags.jpg",
    to: "/services/online-stores",
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
    img: "/media/snap.jpg",
    to: "/services/social-media",
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
    img: "/media/pack.jpg",
    to: "/services/graphic-design",
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
    img: "/media/phone.jpg",
    to: "/services/advertisement",
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
    to: "/services/advertisement",
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
  return (
    {
      advertisement: "ads",
      "social-media": "social",
      "graphic-design": "creative",
      "online-stores": "store",
      seo: "seo",
      geo: "geo",
      "local-seo": "local-seo",
      consulting: "consult",
      influencer: "influencer",
    }[slug] ?? "ads"
  );
}
