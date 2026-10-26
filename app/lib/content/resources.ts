export type TextPart = { kind: "text"; text: string } | { kind: "link"; href: string; label: string };

export type ResourceSection = {
  heading: string;
  paragraphs: TextPart[][];
};

export type ResourceArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: ResourceSection[];
  faqs: { q: string; a: string }[];
};

const tierLinks: TextPart[] = [
  { kind: "link", href: "/exotic-weed", label: "Exotic Weed" },
  { kind: "text", text: ", " },
  { kind: "link", href: "/premium-weed", label: "Premium Weed" },
  { kind: "text", text: ", " },
  { kind: "link", href: "/aaa-weed", label: "AAA+ Weed" },
  { kind: "text", text: ", " },
  { kind: "link", href: "/aa-weed", label: "AA Weed" },
  { kind: "text", text: ", and " },
  { kind: "link", href: "/budget-weed", label: "Budget Weed" },
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    slug: "flower-tiers-on-jane-street",
    title: "How the Jane Street flower tiers fit together",
    seoTitle: "Flower Tiers on Jane Street | Jane Wilson Cannabis Dispensary",
    description:
      "How Jane Wilson Cannabis Dispensary organizes Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed at 2111 Jane St, Unit 12 in North York. Adults 19+.",
    eyebrow: "Jane Street · Flower",
    intro:
      "Walk into Jane Wilson and you'll see five flower tiers, from Exotic at the top to Budget for everyday. Here's what sets each one apart, so you know where to look before you get to the counter.",
    sections: [
      {
        heading: "Start with the lane, then the name",
        paragraphs: [
          [
            { kind: "text", text: "The counter at 2111 Jane St, Unit 12 uses five flower lanes: " },
            ...tierLinks,
            { kind: "text", text: ". Exotic is our top shelf: the loudest aromas, frostiest buds and rarer cultivars. Premium sits right under it. AAA+ is solid, well-grown flower in the middle. AA and Budget are the everyday tiers, and AA is the only one with a true 5g." },
          ],
          [
            { kind: "text", text: "The tier tells you the grade, not what's in today. Names like Pink Kush, Gelato and Sour Diesel come and go, so check the " },
            { kind: "link", href: "/menu", label: "menu" },
            { kind: "text", text: " or ask us." },
          ],
        ],
      },
      {
        heading: "What to read before you come by",
        paragraphs: [
          [
            { kind: "text", text: "Use the " },
            { kind: "link", href: "/weed-dispensary-jane-street", label: "Jane Street weed dispensary" },
            { kind: "text", text: " page for the Unit 12 address, the Wilson Avenue corridor, and the Downsview context. Use the " },
            { kind: "link", href: "/guides", label: "cannabis strain guides" },
            { kind: "text", text: " when you want the family tree and the usual aroma of a name before you compare lanes. The guides are education. They are not a stock list." },
          ],
          [
            { kind: "text", text: "Exotic, Premium and AAA+ come in 3g, 6g, 14g and 28g, and they're the tiers with the in-store free gram. AA and Budget come in 3g, 5g, 14g and 28g. We're open 10 AM to midnight daily. You must be 19+, and we ID anyone who looks under 25." },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: "Does a tier page mean those flowers are in the jar today?",
        a: "No. Tier pages explain the lane and show the menu preview. Confirm the jar at 2111 Jane St, Unit 12.",
      },
      {
        q: "Where do I compare all five lanes?",
        a: "Open Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed, or start from the Jane Street weed dispensary page.",
      },
    ],
  },
  {
    slug: "indica-sativa-and-hybrid-in-north-york",
    title: "Indica, sativa, and hybrid before a North York visit",
    seoTitle: "Indica, Sativa and Hybrid Guides | Jane Wilson Cannabis Dispensary",
    description:
      "How to use indica, sativa, and hybrid labels at Jane Wilson Cannabis Dispensary on Jane Street in North York, with links to the strain guides. Adults 19+.",
    eyebrow: "North York · Strain labels",
    intro:
      "Indica, sativa and hybrid are handy labels, but they're only the start. At Jane Wilson, look at the strain name first, then the tier, then ask us about the batch.",
    sections: [
      {
        heading: "Labels are a starting point",
        paragraphs: [
          [
            { kind: "text", text: "The " },
            { kind: "link", href: "/guides/indica", label: "indica strain guides" },
            { kind: "text", text: " cover familiar Kush, dessert, and purple names. The " },
            { kind: "link", href: "/guides/sativa", label: "sativa strain guides" },
            { kind: "text", text: " lean citrus, pine, and haze. The " },
            { kind: "link", href: "/guides/hybrid", label: "hybrid strain guides" },
            { kind: "text", text: " are the wide middle, which is where most modern names sit. Two jars with the same name can still differ by grower and batch." },
          ],
          [
            { kind: "text", text: "If you want a single name, start with the " },
            { kind: "link", href: "/guides/pink-kush", label: "Pink Kush strain guide" },
            { kind: "text", text: ", the " },
            { kind: "link", href: "/guides/gelato", label: "Gelato strain guide" },
            { kind: "text", text: ", or the " },
            { kind: "link", href: "/guides/sour-diesel", label: "Sour Diesel strain guide" },
            { kind: "text", text: ". Those pages describe commonly reported lineage and aroma. They do not say the name is listed at Unit 12 today." },
          ],
        ],
      },
      {
        heading: "Pair a label with a Jane Street lane",
        paragraphs: [
          [
            { kind: "text", text: "After the label, pick a lane. Shoppers who want the top shelf start at " },
            { kind: "link", href: "/exotic-weed", label: "Exotic Weed" },
            { kind: "text", text: " or " },
            { kind: "link", href: "/premium-weed", label: "Premium Weed" },
            { kind: "text", text: ". The middle comparison lane is " },
            { kind: "link", href: "/aaa-weed", label: "AAA+ Weed" },
            { kind: "text", text: ". Value shopping stays on " },
            { kind: "link", href: "/aa-weed", label: "AA Weed" },
            { kind: "text", text: " and " },
            { kind: "link", href: "/budget-weed", label: "Budget Weed" },
            { kind: "text", text: "." },
          ],
          [
            { kind: "text", text: "The whole set of name pages lives on the " },
            { kind: "link", href: "/guides", label: "cannabis strain guides" },
            { kind: "text", text: " index. The storefront those guides belong to is the " },
            { kind: "link", href: "/weed-dispensary-jane-street", label: "Jane Street weed dispensary" },
            { kind: "text", text: " at 2111 Jane St, Unit 12, North York. Adults 19+ only." },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: "Does indica mean every jar feels the same?",
        a: "No. It is a broad label. The strain name, the grower, and the package tell you more than the label alone.",
      },
      {
        q: "Where are the Jane Wilson strain guides?",
        a: "On the cannabis strain guides index, grouped into indica, sativa, and hybrid, from the Jane Street store in North York.",
      },
    ],
  },
  {
    slug: "visiting-jane-street-at-wilson",
    title: "Visiting the dispensary at Jane Street and Wilson",
    seoTitle: "Visiting Jane Street at Wilson | Jane Wilson Cannabis Dispensary",
    description:
      "How to reach Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, near Wilson Avenue in North York. TTC 35 Jane notes, hours, and what to open before you leave. Adults 19+.",
    eyebrow: "Jane and Wilson · Visit",
    intro:
      "Jane Wilson Cannabis Dispensary is at Unit 12, 2111 Jane Street, North York, right by Wilson Avenue. Here's what to know before your first visit.",
    sections: [
      {
        heading: "The stop on Jane Street",
        paragraphs: [
          [
            { kind: "text", text: "The " },
            { kind: "link", href: "/weed-dispensary-jane-street", label: "Jane Street weed dispensary" },
            { kind: "text", text: " sits on Jane Street near Wilson Avenue. A TTC stop at Jane and Wilson is about 200 metres away. Driving, use the map pin on the " },
            { kind: "link", href: "/visit", label: "visit page" },
            { kind: "text", text: ". There's no dedicated lot, so check the posted signs." },
          ],
          [
            { kind: "text", text: "Hours are 10:00 AM to midnight daily. The " },
            { kind: "link", href: "/hours", label: "store hours" },
            { kind: "text", text: " page lists the same daily window. The public phone is 437-465-7700. Bring government-issued photo ID. Cannabis retail is for adults 19+." },
          ],
        ],
      },
      {
        heading: "What to open before you go",
        paragraphs: [
          [
            { kind: "text", text: "If you already know the lane, open " },
            { kind: "link", href: "/exotic-weed", label: "Exotic Weed" },
            { kind: "text", text: ", " },
            { kind: "link", href: "/premium-weed", label: "Premium Weed" },
            { kind: "text", text: ", " },
            { kind: "link", href: "/aaa-weed", label: "AAA+ Weed" },
            { kind: "text", text: ", " },
            { kind: "link", href: "/aa-weed", label: "AA Weed" },
            { kind: "text", text: ", or " },
            { kind: "link", href: "/budget-weed", label: "Budget Weed" },
            { kind: "text", text: ". If you are still choosing a name, use the " },
            { kind: "link", href: "/guides", label: "cannabis strain guides" },
            { kind: "text", text: ". The " },
            { kind: "link", href: "/menu", label: "in-store menu" },
            { kind: "text", text: " is a preview. If the list looks empty, give us a call." },
          ],
          [
            { kind: "text", text: "Coming from Downsview, along Jane, or from around Wilson? This is your shop. See our " },
            { kind: "link", href: "/weed-dispensary-jane-street", label: "Jane Street dispensary page" },
            { kind: "text", text: " for more." },
          ],
        ],
      },
    ],
    faqs: [
      {
        q: "Which TTC routes stop near the store?",
        a: "The 35 Jane and 935 Jane Express serve Jane Street, including Wilson Avenue. Confirm live service before you travel.",
      },
      {
        q: "What are the hours at Unit 12?",
        a: "Daily 10:00 AM to midnight. The address is 2111 Jane St, Unit 12, North York, ON M3M 1A2.",
      },
    ],
  },
];

export function resourceBySlug(slug: string) {
  return RESOURCE_ARTICLES.find((article) => article.slug === slug);
}
