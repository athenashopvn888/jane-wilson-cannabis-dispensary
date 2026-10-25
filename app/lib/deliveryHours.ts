/**
 * Fleet delivery window (the same daily window other fleet stores publish).
 * Customer-facing copy uses the label only. Do not name internal programs here.
 */
export const DELIVERY_HOURS_LABEL = "10:00 a.m. to 10:00 p.m. daily";
export const DELIVERY_HOURS_OPENS = "10:00";
export const DELIVERY_HOURS_CLOSES = "22:00";
export const DELIVERY_HOURS_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
] as const;

export function deliveryHoursSchema() {
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...DELIVERY_HOURS_DAYS],
    opens: DELIVERY_HOURS_OPENS,
    closes: DELIVERY_HOURS_CLOSES
  };
}
