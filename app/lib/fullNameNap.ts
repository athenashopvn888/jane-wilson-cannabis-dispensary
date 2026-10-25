/**
 * JWC01 exact full name + NAP. Name = original store name + "Dispensary Weed Delivery" (no GBP record).
 * Public Master Lines phone only (never the SOD line). Map link = the site's existing Google Maps pin.
 */
export const FULL_NAME_NAP = {
  "code": "JWC01",
  "fullName": "Jane Wilson Cannabis Dispensary Weed Delivery",
  "street": "2111 Jane St, Unit 12",
  "city": "North York",
  "region": "ON",
  "postal": "M3M 1A2",
  "phoneDisplay": "(437) 465-7700",
  "phoneTel": "tel:+14374657700",
  "hours": "Open daily 10 AM to 12 AM (midnight)",
  "mapsUrl": "https://maps.app.goo.gl/vxXQtLG52Fw6UeZy6",
  "placeId": "",
  "neighbourhood": "Jane and Wilson / Downsview",
  "intersection": "Jane St & Wilson Ave",
  "transit": "TTC 35 Jane and 935 Jane Express stop at Wilson Avenue",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
