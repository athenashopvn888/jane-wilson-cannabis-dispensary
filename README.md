# Jane Wilson Cannabis Dispensary

Jane Street storefront site for Jane Wilson Cannabis Dispensary at 2111 Jane St, Unit 12, North York. Hours are 10:00 AM – 12:00 AM (midnight) daily. Adults 19+.

## Temporary menu

The flower tiers, native cigarettes, and nicotine vapes render a temporary on-hand menu so the storefront is usable before the Jane Wilson feed is connected.

- `TEMP_STOCK_SOURCE=JFC01` (see `docs/JWC01_SCOREBOARD.md`, `app/lib/inventory.ts`, and `.env.example`)
- Mirrored snapshot: `app/lib/flowers.json` and `app/lib/items.json`
- Optional live refresh: set `APPS_SCRIPT_URL`. Prebuild and the site request `?store=JFC01`.
- Public pages only say: “The menu changes through the day. Call or drop in to check a strain before you make the trip.”

Flower price columns are 3g, 5g, 14g, and 28g.

## Canonical host

`https://janewilsoncannabisdispensary.com`

Preview: `https://jane-wilson-cannabis-dispensary.vercel.app`
