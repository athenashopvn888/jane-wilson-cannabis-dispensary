import LocalAreaPage, { areaMetadata } from "../components/LocalAreaPage";

const SLUG = "oakdale";

export const metadata = areaMetadata(SLUG);

export default function Page() {
  return <LocalAreaPage slug={SLUG} />;
}
