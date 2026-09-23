import { STORE } from "../lib/store";

export default function Footer() {
  return (
    <footer>
      <div><strong>{STORE.name}</strong><br />{STORE.street}<br />{STORE.locality}</div>
      <div><a href={`tel:${STORE.phoneHref}`}>{STORE.phone}</a><br /><a href={STORE.maps}>Open in Google Maps</a></div>
      <div>Adults 19+ only.<br />Please enjoy responsibly.</div>
    </footer>
  );
}
