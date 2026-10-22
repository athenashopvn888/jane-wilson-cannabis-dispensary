import { FULL_NAME_NAP } from "../lib/fullNameNap";

/** Used only when a sheet banner block is given an explicit title. */
export default function HomeTitleBlock({ title }: { title: string }) {
  return (
    <header data-home-title-block="">
      <h1>{title}</h1>
      <p data-fullname-subline="">{FULL_NAME_NAP.fullName}</p>
    </header>
  );
}
