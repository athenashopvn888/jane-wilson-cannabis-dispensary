# JWCD01 scoreboard

- Store: Jane Wilson Cannabis Dispensary
- Code: JWCD01
- PR: #1 https://github.com/athenashopvn888/jane-wilson-cannabis-dispensary/pull/1
- SHA: b2624760cd47b5b5642b21884e4fa49873119469
- Hours: 10:00 AM – 12:00 AM (midnight) daily. No 24-hour page.
- Canonical: https://janewilsoncannabisdispensary.com

## Temp stock method

`TEMP_STOCK_SOURCE=JFC01`

1. Mirrored snapshot of flowers and items in `app/lib/flowers.json` and `app/lib/items.json`.
2. Live refresh when `APPS_SCRIPT_URL` is set: `scripts/prebuild-stock.js` and `getMenu()` call `${APPS_SCRIPT_URL}?store=JFC01`.
3. If the live call is missing or fails, the mirrored JSON stays so tiers, cigarettes, and nicotine vapes stay non-empty.
4. Public UI does not name the source store. It shows: “Menu preview — confirm availability and prices at the Jane Wilson counter until the Jane Wilson live feed is connected.”

Flower weights: 3g, 5g, 14g, 28g (`price3g`, `price5g`, `price14g`, `price28g`).

## Placeholder paths

- `public/placeholders/banner-hero.svg`
- `public/placeholders/banner-carousel-1.svg`
- `public/placeholders/banner-carousel-2.svg`
- `public/placeholders/cigs-deal-hero.svg`
- `public/placeholders/cigs-pack-shot.svg`

Components are tagged `PLACEHOLDER_FOR_CODEX` in:

- `app/components/PlaceholderArt.tsx`
- `app/components/BannerPlaceholders.tsx`
- `app/components/CigsDealPlaceholder.tsx`

Existing art in `public/brand/` is unchanged.

## Rollback

Revert this PR. That restores the empty-menu scaffold and removes the temporary JSON, cigarette page, nicotine vape page, product routes, and Codex placeholder slots. Unset `APPS_SCRIPT_URL` on the host if it was added for the temporary refresh. Do not edit the source store’s menu files as part of rollback.
