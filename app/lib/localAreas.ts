import { AREA_LINKS, type AreaSlug } from "./shopLinks";
import { STORE } from "./store";

export type LocalArea = {
  slug: AreaSlug;
  path: string;
  title: string;
  h1: string;
  description: string;
  kicker: string;
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
};

const phone = STORE.phone;
const hours = STORE.hoursLabel;

export const LOCAL_AREAS: LocalArea[] = [
  {
    slug: "downsview",
    path: "/downsview",
    title: "Downsview",
    h1: "Jane Wilson Cannabis for Downsview",
    description: "Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12 is the Jane and Wilson counter for the Downsview corridor in North York. Adults 19+.",
    kicker: "Downsview · Jane and Wilson",
    lead: "People who know this part of North York as Downsview use the same counter: Unit 12 at 2111 Jane Street, by Wilson Avenue.",
    sections: [
      {
        heading: "Where the counter is",
        paragraphs: [
          `${STORE.name} is at ${STORE.address}. The shop is a short trip from the rest of Downsview, on Jane Street at Wilson Avenue.`,
          `A TTC stop at Jane and Wilson is about 200 metres from Unit 12. The 35 Jane and 935 Jane Express serve that stop. Hours are ${hours}.`
        ]
      },
      {
        heading: "What to open before you come",
        paragraphs: [
          "The flower menu is split into Exotic, Premium, AAA+, AA, and Budget. Edibles, pre-rolls, THC vapes, concentrates, and accessories are their own pages when those rows are on the menu.",
          `Call ${phone} if one name is the reason for the trip. Adults 19+, and we ID anyone who looks under 25.`
        ]
      }
    ],
    faqs: [
      { q: "Is the shop in the Downsview corridor?", a: `Yes. ${STORE.name} is at ${STORE.address}, on Jane Street by Wilson Avenue.` },
      { q: "How do I get there from Downsview?", a: "Use the Jane Street buses to the Wilson Avenue stop. That stop is about 200 metres from Unit 12." },
      { q: "What are the hours?", a: `The counter is open ${hours}.` }
    ]
  },
  {
    slug: "jane-and-wilson",
    path: "/jane-and-wilson",
    title: "Jane and Wilson",
    h1: "The cannabis shop at Jane and Wilson",
    description: "Jane Wilson Cannabis Dispensary is the Unit 12 shop at 2111 Jane St, at Jane Street and Wilson Avenue in North York. Adults 19+.",
    kicker: "Jane Street · Wilson Avenue",
    lead: "The shop takes its corner from the intersection. Unit 12 is at 2111 Jane Street, at Jane and Wilson in North York.",
    sections: [
      {
        heading: "The corner",
        paragraphs: [
          "Jane Street runs north and south. Wilson Avenue crosses it here. North York Sheridan Mall and the rest of the retail strip sit on this same corner.",
          `The 35 Jane and 935 Jane Express stop at Wilson Avenue, about 200 metres from the door. If you drive, check the posted signs. There is no dedicated lot.`
        ]
      },
      {
        heading: "At the counter",
        paragraphs: [
          `Hours are ${hours}. Flower is grouped into five tiers, and the other menu sections are pre-rolls, THC vapes, edibles, concentrates, and accessories.`,
          `Call ${phone} before you travel if you need one product confirmed. Adults 19+ with photo ID.`
        ]
      }
    ],
    faqs: [
      { q: "What is the address at Jane and Wilson?", a: `${STORE.name}, ${STORE.address}.` },
      { q: "Which bus stops here?", a: "The 35 Jane and 935 Jane Express stop at Wilson Avenue, about 200 metres from Unit 12." },
      { q: "What should I bring?", a: "Government photo ID. You must be 19+, and anyone who looks under 25 is asked for ID." }
    ]
  },
  {
    slug: "oakdale",
    path: "/oakdale",
    title: "Oakdale",
    h1: "Jane Wilson Cannabis from Oakdale",
    description: "From Oakdale and the Wilson Avenue strip west of Jane, the counter is Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12. Adults 19+.",
    kicker: "Oakdale · Wilson Avenue",
    lead: "Oakdale and the Wilson Avenue strip west of Jane Street are part of the same Jane and Wilson area. The counter is still Unit 12 at 2111 Jane Street.",
    sections: [
      {
        heading: "The walk or the bus to Jane",
        paragraphs: [
          "Wilson Avenue west of Jane is the local retail strip toward Highway 400, including the area the city studies as Jane and Wilson. The shop is on Jane Street at that intersection, not inside the mall.",
          `Come east to Jane Street, then use the Wilson Avenue stop on the 35 Jane. It is about 200 metres from Unit 12. Hours are ${hours}.`
        ]
      },
      {
        heading: "Before you leave Oakdale",
        paragraphs: [
          `Check the menu online, then call ${phone} if a strain or a vape is the reason for the trip. Listings change through the day.`,
          "In-store flower prices are for the counter. Delivery, where it is offered, uses its own menu."
        ]
      }
    ],
    faqs: [
      { q: "Is there a separate Oakdale shop?", a: `No. The counter for this area is ${STORE.name} at ${STORE.address}.` },
      { q: "How far is the bus stop?", a: "The Jane and Wilson TTC stop is about 200 metres from Unit 12." },
      { q: "When are you open?", a: `The counter is open ${hours}.` }
    ]
  },
  {
    slug: "black-creek",
    path: "/black-creek",
    title: "Black Creek",
    h1: "Jane Wilson Cannabis by Black Creek",
    description: "Black Creek runs through the Jane and Wilson area. Jane Wilson Cannabis Dispensary is at 2111 Jane St, Unit 12, North York. Adults 19+.",
    kicker: "Black Creek · Jane and Wilson",
    lead: "Black Creek crosses this part of North York around Jane and Wilson. The cannabis counter for the corner is Unit 12 at 2111 Jane Street.",
    sections: [
      {
        heading: "The same Jane Street door",
        paragraphs: [
          `${STORE.name} is in Ward 7, Humber River-Black Creek, at ${STORE.street}. It is the walk-in shop on Jane Street by Wilson Avenue.`,
          `The 35 Jane stops at Wilson, about 200 metres away. Hours are ${hours}. Adults 19+ with photo ID.`
        ]
      },
      {
        heading: "What the menu is",
        paragraphs: [
          "Five flower tiers, plus pre-rolls, THC vapes, nicotine vapes, edibles, concentrates, and accessories when those rows are listed.",
          `Call ${phone} to confirm a product before you make the trip.`
        ]
      }
    ],
    faqs: [
      { q: "Which shop is this for the Black Creek area?", a: `${STORE.name} at ${STORE.address}.` },
      { q: "Do you deliver from here?", a: "Delivery orders, when they are open, leave from this same counter and use delivery prices. The walk-in menu is separate." },
      { q: "What are the hours?", a: `The counter is open ${hours}.` }
    ]
  },
  {
    slug: "brookhaven-amesbury",
    path: "/brookhaven-amesbury",
    title: "Brookhaven-Amesbury",
    h1: "From Brookhaven-Amesbury to Jane and Wilson",
    description: "Brookhaven-Amesbury is south along Jane Street. Jane Wilson Cannabis Dispensary is north of there, at 2111 Jane St, Unit 12, by Wilson Avenue. Adults 19+.",
    kicker: "Brookhaven-Amesbury · Jane Street",
    lead: "Brookhaven-Amesbury sits south of Lawrence Avenue West, with Jane Street along its west side. The shop is farther north on that same street, at Wilson Avenue.",
    sections: [
      {
        heading: "Ride Jane Street north",
        paragraphs: [
          "The 35 Jane bus runs Jane Street from the Lawrence stretch up to Wilson Avenue. The Wilson stop is about 200 metres from Unit 12 at 2111 Jane Street.",
          `The counter is open ${hours}. There is no dedicated parking lot, so read the signs if you drive.`
        ]
      },
      {
        heading: "At Unit 12",
        paragraphs: [
          `This is ${STORE.name}, the neighbourhood shop for Jane and Wilson. Flower tiers and the other menu sections are on this site.`,
          `Call ${phone} when you need a product confirmed. Adults 19+. Bring photo ID.`
        ]
      }
    ],
    faqs: [
      { q: "Is the shop inside Brookhaven-Amesbury?", a: `The shop is north of that neighbourhood, at Jane and Wilson: ${STORE.address}.` },
      { q: "Which bus goes there?", a: "The 35 Jane runs north to the Wilson Avenue stop, about 200 metres from Unit 12." },
      { q: "What are the hours?", a: `The counter is open ${hours}.` }
    ]
  },
  {
    slug: "yorkdale",
    path: "/yorkdale",
    title: "Yorkdale",
    h1: "From Yorkdale to the Jane and Wilson shop",
    description: "Yorkdale is east of Jane Wilson Cannabis Dispensary along Wilson Avenue. The shop is at 2111 Jane St, Unit 12, North York. Adults 19+.",
    kicker: "Yorkdale · Wilson Avenue",
    lead: "Yorkdale sits east of the shop along Wilson Avenue. The counter is not at the mall. It is Unit 12 at 2111 Jane Street, where Wilson meets Jane.",
    sections: [
      {
        heading: "Along Wilson Avenue",
        paragraphs: [
          "Stay on Wilson Avenue west from the Yorkdale and Allen Road area until you reach Jane Street. The shop is on Jane at that corner.",
          `If you use the Jane Street bus, get off at Wilson Avenue. The stop is about 200 metres from the door. Hours are ${hours}.`
        ]
      },
      {
        heading: "What you can check first",
        paragraphs: [
          "Open the flower tiers and the category pages for pre-rolls, THC vapes, edibles, concentrates, and accessories. The menu changes through the day.",
          `Call ${phone} before you leave Yorkdale if one product is the reason for the trip. Adults 19+ with photo ID.`
        ]
      }
    ],
    faqs: [
      { q: "Is Jane Wilson at Yorkdale?", a: `No. ${STORE.name} is at ${STORE.address}, west of Yorkdale at Jane and Wilson.` },
      { q: "How do I reach the shop from the east?", a: "Follow Wilson Avenue west to Jane Street. The TTC stop at Jane and Wilson is about 200 metres from Unit 12." },
      { q: "What are the hours?", a: `The counter is open ${hours}.` }
    ]
  }
];

export function localAreaBySlug(slug: string) {
  return LOCAL_AREAS.find((area) => area.slug === slug);
}
