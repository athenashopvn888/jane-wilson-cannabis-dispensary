import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import JsonLd from "../../components/JsonLd";
import Nav from "../../components/Nav";
import styles from "./article.module.css";

const TITLE = "How to Tell If Weed Is Old: A No-Nonsense Field Guide for Your Stash";
const DESCRIPTION =
  "Jane Wilson likes a clear route from A to B, so here it is: the signs people actually check, and why the date on the package beats any guess.";
const CANONICAL = "https://janewilsoncannabisdispensary.com/resources/how-to-tell-if-weed-is-old";
const PUBLISHED = "2026-11-14";

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

export default function HowToTellIfWeedIsOldPage() {
  return (
    <main className={styles.main}>
      <JsonLd data={articleSchema} />
      <Nav />
      <article className={styles.article}>
        <h1>{TITLE}</h1>
        <p className={styles.checked}>Last checked: November 10, 2026</p>
        <p>
          You find a jar at the back of the drawer. No idea when you bought it. You crack the lid, take a sniff, and
          get... not much. So now you&apos;re googling <strong>how to tell if weed is old</strong>, half-hoping the
          internet will tell you it&apos;s fine. Jane Wilson likes a clear route from A to B, so here it is: the signs
          people actually check, what the label can and can&apos;t tell you, and why the date on the package beats any
          guess. Observation words only. Adults 19+ only.
        </p>

        <h2>How can you tell if weed is old?</h2>
        <p>
          You can tell if weed is old by checking four things in order: the smell, the colour, how dry it feels, and
          how the frosty bits look, and then confirming with the packaging date on the label. None of these is a lab
          test. Together, they give you a pretty honest read.
        </p>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Check</th>
                <th>Fresher-looking flower</th>
                <th>Older-looking flower</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Smell</strong>
                </td>
                <td>Clear, distinct aroma when you open the jar</td>
                <td>Faint, flat or barely there</td>
              </tr>
              <tr>
                <td>
                  <strong>Colour</strong>
                </td>
                <td>Even colour, the shade you remember</td>
                <td>Dull or faded next to how it looked when new</td>
              </tr>
              <tr>
                <td>
                  <strong>Feel</strong>
                </td>
                <td>A little give; small stems bend before they snap</td>
                <td>Brittle; crumbles to dust between your fingers</td>
              </tr>
              <tr>
                <td>
                  <strong>Frost</strong>
                </td>
                <td>Trichomes look intact on the bud</td>
                <td>Frost looks flattened, smudged or knocked loose into the bottom of the bag</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>1. The sniff test</h3>
        <p>
          Smell is the first clue most people use, and it&apos;s the easiest. Bud that&apos;s been sitting open, warm
          or in the light for a long time tends to lose its punchy aroma and go flat. If the jar smells like almost
          nothing, that&apos;s your first flag.
        </p>

        <h3>2. The colour check</h3>
        <p>
          Hold it up to normal light. You&apos;re not judging the strain&apos;s natural colour (some are purple, some
          lime, some darker). You&apos;re comparing it to how <em>this</em> batch looked when it was new. Dull and
          faded is the tell.
        </p>

        <h3>3. The squeeze test</h3>
        <p>
          Gently press a nug. Dried flower should still have a little spring. If it shatters into powder or every stem
          snaps like a dry twig, it has dried out past where you&apos;d want it.
        </p>

        <h3>4. The frost check</h3>
        <p>
          Those sparkly trichomes on the outside of the bud are fragile. Handling, grinding and time knock them loose.
          If the outside looks bald and the bottom of the bag is dusty, the bud has been bounced around a lot.
        </p>

        <h2>Does weed go bad?</h2>
        <p>
          Yes, weed can go bad in the everyday sense: over time it dries out, its aroma fades, and it stops looking or
          smelling the way it did when it was packaged. That&apos;s a quality call, not a lab result, which is exactly
          why the label matters.
        </p>
        <p>
          If something about a package looks like a genuine quality problem, don&apos;t guess. Health Canada&apos;s
          consumer label guide says every label carries the producer&apos;s{" "}
          <strong>name, phone number and email</strong>, and you can contact them about a quality issue, quoting the{" "}
          <strong>lot number and packaging date</strong>.
          Health Canada also takes quality reports directly through its cannabis reporting form.
        </p>

        <h2>What does the packaging date on a Canadian label tell you?</h2>
        <p>
          The packaging date tells you when the product was put into its package, and it&apos;s required on every legal
          cannabis label in Canada, according to Health Canada&apos;s label guide. That makes it the most reliable
          &quot;how old is this?&quot; clue you have.
        </p>
        <p>
          Here&apos;s the part people miss. An <strong>expiry date is optional</strong>, not required. Health Canada
          lists it as optional information a producer <em>can</em>{" "}add. So most of the time, you&apos;re working from
          the packaging date, not a &quot;best before.&quot; Read it like a timestamp: the further back it is, the more
          those four checks above matter.
        </p>
        <p>
          The guide also says labels must show <strong>recommended storage conditions</strong>, such as temperature,
          light or humidity, &quot;to ensure the product&apos;s quality.&quot; Translation: the producer is telling you
          how to keep it. Worth reading.
        </p>

        <h2>How long does weed stay fresh?</h2>
        <p>
          There&apos;s no single number for how long weed stays fresh, and Health Canada doesn&apos;t set one: the
          expiry date is optional, so the label usually gives you a packaging date and storage instructions rather than
          a countdown. How it&apos;s stored is what moves the needle.
        </p>
        <p>
          That&apos;s why two jars packaged the same week can look and smell totally different a few months later. One
          sat sealed in a cool cupboard; the other rode around open in a warm car.
        </p>

        <h2>Should you grind weed ahead of time?</h2>
        <p>
          Most people don&apos;t, and the habit is simple: grinding breaks the buds open and puts more of the flower in
          contact with the air, so grind what you plan to use and leave the rest whole. We broke down the trade-offs
          in our <Link href="/resources/pre-ground-cannabis-vs-whole-flower">pre-ground vs whole flower guide</Link> if
          you want the full comparison.
        </p>
        <p>The practical move: grind what you plan to use, when you plan to use it, and keep the rest whole.</p>
        <blockquote>
          <p>
            <strong>Keep-it-fresh box (the one-line version):</strong> follow the storage conditions printed on the
            label, keep the container sealed, and store it somewhere cool, dark and out of reach of kids and pets.
          </p>
        </blockquote>
        <p>That&apos;s it. Storage is a whole topic of its own, and this isn&apos;t that article.</p>

        <h2>How to tell if weed is old: quick answers</h2>
        <p>
          <strong>Is the packaging date the same as an expiry date?</strong> No. Packaging date is required; expiry
          date is optional.
        </p>
        <p>
          <strong>Can I tell how old weed is just by looking?</strong> You can get a rough read from smell, colour,
          feel and frost. The packaging date confirms it.
        </p>
        <p>
          <strong>What if something looks wrong with a package?</strong>{" "}Contact the producer using the label&apos;s
          contact details, with the lot number and packaging date, or report it to Health Canada.
        </p>

        <h2>Know how to tell if weed is old? Come check a label with us</h2>
        <p>
          Now you know how to tell if weed is old, so come practise on a fresh label. Jane Wilson Cannabis Dispensary
          is at 2111 Jane St in North York, near Jane St &amp; Wilson Ave, about 200 m from the stop at Jane &amp;
          Wilson. Ask to see the packaging date on anything you&apos;re curious about and we&apos;ll walk through it
          with you. Plan your trip on our <Link href="/visit">visit page</Link>. Adults 19+ only. Bring
          government-issued photo ID.
        </p>
      </article>
      <Footer />
    </main>
  );
}
