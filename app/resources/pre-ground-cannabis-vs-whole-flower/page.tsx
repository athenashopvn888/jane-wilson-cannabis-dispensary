import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import Nav from "../../components/Nav";
import styles from "./article.module.css";

const TITLE =
  "Pre-ground cannabis vs whole flower: what's different, what's the same, and what the label tells you";
const DESCRIPTION =
  "Dried cannabis comes in two broad forms: whole buds, or flower that's already been broken down.";
const CANONICAL =
  "https://janewilsoncannabisdispensary.com/resources/pre-ground-cannabis-vs-whole-flower";
const PUBLISHED = "2026-11-07";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: CANONICAL,
  url: CANONICAL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Organization", name: "Jane Wilson Cannabis Dispensary" },
  publisher: { "@type": "Organization", name: "Jane Wilson Cannabis Dispensary" },
};

export default function PreGroundCannabisVsWholeFlowerPage() {
  return (
    <main className={styles.main}>
      <JsonLd data={articleSchema} />
      <Nav />
      <article className={styles.article}>
        <h1 dangerouslySetInnerHTML={{ __html: TITLE }} />
        <p className={styles.checked}>
          <em>Last checked: September 30, 2026</em>
        </p>
        <p>
          Dried cannabis comes in two broad forms: whole buds, or flower that&apos;s already been broken down. The
          ground-up kind goes by names like <em>pre-ground</em>, <em>pre-milled</em>, <em>shake</em> or <em>shreds</em>.
          This guide for adults 19 and over covers what changes between the two, what stays the same on the package,
          and what federal law says about grinding it yourself.
        </p>

        <h2>Same product category, different shape</h2>
        <p>
          The label rules don&apos;t treat ground flower as its own category. Loose dried cannabis, whole or ground,
          falls under the same section of the federal Cannabis Regulations (section 125, for dried cannabis that
          isn&apos;t in discrete units). Either way, the label must show:
        </p>
        <ul>
          <li>
            the <strong>net weight in grams</strong>
          </li>
          <li>
            <strong>&quot;Total THC&quot;</strong> in milligrams per gram, which counts THCA that can convert to THC
          </li>
          <li>
            <strong>&quot;Total CBD&quot;</strong> in milligrams per gram, calculated the same way for CBDA
          </li>
        </ul>
        <p>Whole or milled, you read those three lines the same way.</p>

        <h2>Side by side</h2>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th />
                <th>Whole flower</th>
                <th>Pre-ground / shreds</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What&apos;s in the package</td>
                <td>Intact buds</td>
                <td>Flower already broken into small pieces</td>
              </tr>
              <tr>
                <td>What you can inspect by eye</td>
                <td>Bud size, structure, trim</td>
                <td>Colour and texture only</td>
              </tr>
              <tr>
                <td>Grinding needed before rolling</td>
                <td>Yes, by hand or grinder</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Required label lines</td>
                <td>Net weight, Total THC, Total CBD</td>
                <td>The same three</td>
              </tr>
              <tr>
                <td>How it&apos;s weighed against Ontario&apos;s cap</td>
                <td>Net grams</td>
                <td>Net grams</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The practical trade is simple. With whole flower you do the prep yourself and can see the buds you&apos;re
          getting. With pre-ground you skip the grinder, but the product&apos;s original structure is gone.
        </p>

        <h2>Reading a pre-ground package</h2>
        <ol>
          <li>
            <strong>Find the net weight.</strong> Pre-milled flower can come in larger packages, so check that the
            number fits what you&apos;re allowed to carry (see the limit below).
          </li>
          <li>
            <strong>Line up the two cannabinoid figures</strong> (both given per gram). That puts a ground product and
            a whole-bud product on the same per-gram scale.
          </li>
          <li>
            <strong>Read the product description on the package.</strong> It tells you what the product is: the names{" "}
            <em>shake</em> and <em>shreds</em> aren&apos;t defined terms in the Regulations.
          </li>
        </ol>

        <h2>Grinding it yourself: what the Act allows</h2>
        <p>
          The federal Cannabis Act gives adults room to work with their own cannabis. Subsection 12(2) says:{" "}
          <strong>
            &quot;An individual may alter the chemical or physical properties of any cannabis that they are not
            prohibited by this Act from possessing.&quot;
          </strong>{" "}
          Breaking up legally owned buds with a grinder or your fingers falls under that.
        </p>
        <p>
          There&apos;s one firm line in the same section. It&apos;s prohibited to alter cannabis&apos;s chemical or
          physical properties <strong>using an organic solvent</strong>, and the Act&apos;s definition of that term
          covers compounds that can explode or that catch fire very easily. A grinder is fine; solvent-based home
          extraction is not.
        </p>

        <h2>A short glossary</h2>
        <p>
          Retail terms for ground flower aren&apos;t standardised, so treat these as everyday usage rather than legal
          definitions:
        </p>
        <ul>
          <li>
            <strong>Pre-ground / pre-milled:</strong> flower that&apos;s been broken down by machine before packaging.
          </li>
          <li>
            <strong>Shake:</strong> loose, smaller pieces of flower. The word is used loosely, so the package
            description is what counts.
          </li>
          <li>
            <strong>Shreds:</strong> a product name some brands use for milled flower.
          </li>
          <li>
            <strong>Whole flower / bud:</strong> intact dried buds, ground by the buyer if needed.
          </li>
        </ul>
        <p>
          If a listing uses one of these words and you aren&apos;t sure what&apos;s in the bag, the label and the
          product description settle it.
        </p>

        <h2>Questions worth asking at the counter</h2>
        <ul>
          <li>Is this product sold milled, or is it whole buds?</li>
          <li>What net weight is the package, and does it come in smaller sizes?</li>
          <li>Where are the Total THC and Total CBD figures on this package?</li>
          <li>Is there a whole-bud product from the same producer I could compare it with?</li>
        </ul>

        <h2>The weight limit, whatever the form</h2>
        <p>
          Ontario&apos;s cannabis-laws page puts the public cap at <strong>30 grams (about one ounce)</strong> of dried
          cannabis or equivalent. Grinding doesn&apos;t change the weight, so a milled package counts gram for gram
          like whole buds. If you carry a large package of pre-ground flower plus anything else, add the net weights
          together before you leave the store.
        </p>

        <h2>Quick answers</h2>
        <p>
          <strong>Is pre-ground cannabis a different legal product from buds?</strong> No. Both are loose dried cannabis
          under section 125 of the Regulations, with the same three required label lines.
        </p>
        <p>
          <strong>Can I grind flower at home and carry it in a different container?</strong> Grinding is allowed under
          subsection 12(2) of the Act. How you carry cannabis in a car has separate Ontario rules, so check ontario.ca
          before a drive.
        </p>
        <p>
          <strong>Does grinding change how much I&apos;m carrying?</strong> No. The weight is the same before and
          after, and the 30 g cap applies to that weight.
        </p>

        <h2>Jane Wilson, on Jane Street at Wilson</h2>
        <p>
          You&apos;ll find Jane Wilson Cannabis Dispensary at 2111 Jane St, North York, close to the corner of Jane and
          Wilson. The Jane &amp; Wilson transit stop is about 200 m from the door. Staff at the counter can put a
          pre-ground package and a whole-bud package side by side so you can compare the labels. For the map pin and
          arrival notes, see <Link href="/visit">Visit Jane Wilson</Link>. Adults 19+ only; bring government photo ID.
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<!-- LOCAL NOTE (JWS01): address, Jane & Wilson cross street and the ~200 m stop distance are ✅ in STORE_FACTS.md. Route numbers, unit number, postcode and parking are deliberately left out. -->",
          }}
        />
        <p className={styles.sources}>
          <em>
            Primary texts consulted: Cannabis Regulations s.125; Cannabis Act s.8, s.12 and Schedule 3 (Justice
            Canada); Ontario government &quot;Cannabis laws&quot; page.
          </em>
        </p>
      </article>
      <Footer />
    </main>
  );
}
