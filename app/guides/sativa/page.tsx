import type { Metadata } from "next";
import GuideHubPage from "../_components/GuideHubPage";
import { guideHub } from "../../lib/content/guideHubs";
import { STORE } from "../../lib/store";

const hub = guideHub("sativa");
export const metadata: Metadata = { title: { absolute: "Sativa Strain Guides | Jane Wilson Cannabis Dispensary" }, description: hub.description, alternates: { canonical: `${STORE.origin}/guides/sativa` } };
export default function Page() { return <GuideHubPage hub={hub} />; }
