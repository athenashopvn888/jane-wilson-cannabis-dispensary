import type { Metadata } from "next";
import GuideHubPage from "../_components/GuideHubPage";
import { guideHub } from "../../lib/content/guideHubs";
import { STORE } from "../../lib/store";

const hub = guideHub("strains-a-to-z");
export const metadata: Metadata = { title: { absolute: "Cannabis Strains A–Z | Jane Wilson Cannabis Dispensary" }, description: hub.description, alternates: { canonical: `${STORE.origin}/guides/strains-a-to-z` } };
export default function Page() { return <GuideHubPage hub={hub} />; }
