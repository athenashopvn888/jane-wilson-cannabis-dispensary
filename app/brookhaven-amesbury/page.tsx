import LocalAreaPage, { areaMetadata } from "../components/LocalAreaPage";

const SLUG = "brookhaven-amesbury";

export const metadata = areaMetadata(SLUG);

export default function Page() {
  return <LocalAreaPage slug={SLUG} />;
}
