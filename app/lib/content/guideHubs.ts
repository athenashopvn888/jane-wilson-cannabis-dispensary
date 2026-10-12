export type GuideFamily = "indica" | "sativa" | "hybrid";
export type Img = { file: string; alt: string; title: string; w: number; h: number };
export type GuideHub = { slug: GuideFamily | "strains-a-to-z"; label: string; title: string; description: string; intro: string; image: Img; points: string[]; faqs: { q: string; a: string }[] };

const images: Record<GuideFamily, Img> = {
  indica: { file: "jane-wilson-strain-guide-hero-indica.webp", alt: "Illustrated purple cannabis leaf macro for indica strain guides", title: "Indica strain guide artwork", w: 1200, h: 630 },
  sativa: { file: "jane-wilson-strain-guide-hero-sativa.webp", alt: "Illustrated green cannabis leaf macro for sativa strain guides", title: "Sativa strain guide artwork", w: 1200, h: 630 },
  hybrid: { file: "jane-wilson-strain-guide-hero-hybrid.webp", alt: "Illustrated purple and green cannabis leaf macro for hybrid strain guides", title: "Hybrid strain guide artwork", w: 1200, h: 630 }
};

export const GUIDE_HUBS: GuideHub[] = [
  {
    slug: "indica", label: "Indica", title: "Indica Strain Guides in North York",
    description: "Indica strain guides from Jane Wilson Cannabis Dispensary: family trees and aroma notes for well-known indica names, plus what to look for at the shop.",
    intro: "Indica is the label you'll see on a lot of dessert, Kush and purple strains. Every guide below covers where the strain comes from, what it smells like and what to look for in the jar.",
    image: images.indica,
    points: ["Compare the name and grower on the package.", "Smell before you decide, aroma tells you a lot.", "Ask us at the counter if you want help comparing."],
    faqs: [
      { q: "What does indica mean on a menu?", a: "It's a broad label for certain strains and crosses. It's a rough guide, so the strain name and package tell you more." },
      { q: "Are all indica strains the same?", a: "No. Two jars with the same name can look and smell different depending on the grower and the batch." },
      { q: "How do I know what's in today?", a: "Open our menu page, or call us on (437) 465-7700." },
      { q: "Can I shop online?", a: "Browse the menu online and pick up on Jane St, or order delivery from our delivery page." }
    ]
  },
  {
    slug: "sativa", label: "Sativa", title: "Sativa Strain Guides in North York",
    description: "Sativa strain guides from Jane Wilson Cannabis Dispensary: family trees and aroma notes for well-known sativa names, plus what to look for at the shop.",
    intro: "Sativa is the label you'll see on citrus, pine and haze strains. These guides cover the family tree, the aroma and what to look for.",
    image: images.sativa,
    points: ["Check the full strain name and grower.", "Citrus and pine are the usual giveaways.", "Ask us at the counter for help comparing."],
    faqs: [
      { q: "What does sativa mean on a menu?", a: "It's a broad label for certain strains and crosses. Take it as a rough guide and read the strain name and package." },
      { q: "Why can two jars with the same name look different?", a: "Different growers and batches mean different looks and smells, even under one strain name." },
      { q: "How do I see what you have today?", a: "Open our menu page, or call us on (437) 465-7700." },
      { q: "Do you deliver?", a: "Yes. Start on our delivery page." }
    ]
  },
  {
    slug: "hybrid", label: "Hybrid", title: "Hybrid Strain Guides in North York",
    description: "Hybrid strain guides from Jane Wilson Cannabis Dispensary: family trees and aroma notes for well-known hybrid names, plus what to look for at the shop.",
    intro: "Hybrids are crosses between different lines, and they make up most menus. These guides cover the big names, who their parents are and what they smell like.",
    image: images.hybrid,
    points: ["Look at the parent strains to get a feel for the smell.", "Compare the package and listed THC.", "Ask us at the counter if you want a second opinion."],
    faqs: [
      { q: "What is a hybrid strain?", a: "A cross between different cannabis lines, such as Gelato from Sunset Sherbet and Thin Mint cookies." },
      { q: "What does indica-leaning or sativa-leaning mean?", a: "It's how a hybrid is usually sorted on menus. It's only a rough guide." },
      { q: "Do you have these strains today?", a: "Our selection changes through the day. Open our menu, or call us on (437) 465-7700." },
      { q: "Where are you?", a: "2111 Jane St, Unit 12, in North York, near Jane Street and Wilson Avenue." }
    ]
  },
  {
    slug: "strains-a-to-z", label: "A–Z", title: "Cannabis Strains A–Z",
    description: "Every strain guide from Jane Wilson Cannabis Dispensary in one A to Z list, with family trees, aroma notes and links to our menu.",
    intro: "Looking for a strain by name? Every guide is listed here, A to Z. Each one covers where the strain comes from, what it smells like and what to look for.",
    image: images.hybrid,
    points: ["Start with the name, then check the grower.", "Expect different batches to look and smell a little different.", "Open the menu to see what's in today."],
    faqs: [
      { q: "Is this every strain you carry?", a: "No. These are the guides we've written so far, and we keep adding more. Our menu shows what's on the shelf." },
      { q: "Does a guide mean the strain is in stock?", a: "Not always. Our selection changes through the day, so open the menu or call us on (437) 465-7700." },
      { q: "Why do the guides say \"commonly reported\"?", a: "Strain family trees are often debated, so we share the version most growers agree on." },
      { q: "Can I get these delivered?", a: "Start on our delivery page." }
    ]
  }
];

export const guideHub = (slug: GuideHub["slug"]) => GUIDE_HUBS.find((hub) => hub.slug === slug)!;
export const guideFamily = (type: string): GuideFamily => (type.startsWith("indica") ? "indica" : type.startsWith("sativa") ? "sativa" : "hybrid");
