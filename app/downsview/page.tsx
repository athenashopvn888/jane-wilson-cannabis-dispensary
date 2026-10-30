import LocalAreaPage, { areaMetadata } from "../components/LocalAreaPage";

const SLUG = "downsview";

export const metadata = areaMetadata(SLUG);

export default function Page() {
  return <LocalAreaPage slug={SLUG} />;
}
