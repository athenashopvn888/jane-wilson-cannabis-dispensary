import { STORE } from "./store";

export function collectionSchema({
  path,
  name,
  description,
  items
}: {
  path: string;
  name: string;
  description: string;
  items: Array<{ name: string; url: string }>;
}) {
  const url = `${STORE.origin}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { "@id": `${STORE.origin}/#website` },
        about: { "@id": `${STORE.origin}/#store` },
        mainEntity: { "@id": `${url}#itemlist` }
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        name,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: item.url
        }))
      }
    ]
  };
}
