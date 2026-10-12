import type { Faq } from "../lib/content/faqs";
import styles from "../jws-pages.module.css";

export default function FaqBlock({ faqs, title }: { faqs: Faq[]; title?: string }) {
  return (
    <section className={styles.faqs}>
      {title ? <h2>{title}</h2> : null}
      {faqs.map((f) => (
        <details key={f.q} id={f.id} className={styles.faqItem}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  );
}

export function faqSchema(faqs: Faq[], id: string) {
  return { "@type": "FAQPage", "@id": id, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}
