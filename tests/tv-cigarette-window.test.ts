import assert from "node:assert/strict";
import test from "node:test";

import { isCigaretteFlashWindow, isNicotineQuietWindow } from "../app/tv/flashMessages.ts";
import { TV2_DAYTIME_END_HOUR, TV2_DAYTIME_START_HOUR, isTv2Daytime } from "../app/tv2/tv2Promos.ts";

test("TV cigarettes stay on from 17:00 until 09:00 America/Toronto", () => {
  assert.equal(TV2_DAYTIME_START_HOUR, 9);
  assert.equal(TV2_DAYTIME_END_HOUR, 17);

  const cigarettesOn = [
    "2026-10-07T21:00:00.000Z", // 17:00 EDT
    "2026-10-08T03:59:00.000Z", // 23:59 EDT
    "2026-10-07T12:00:00.000Z", // 08:00 EDT
    "2026-10-07T12:59:00.000Z", // 08:59 EDT
    "2026-01-15T22:00:00.000Z", // 17:00 EST
    "2026-01-15T13:59:00.000Z", // 08:59 EST
  ];
  const cigarettesOff = [
    "2026-10-07T13:00:00.000Z", // 09:00 EDT
    "2026-10-07T20:59:00.000Z", // 16:59 EDT
    "2026-01-15T14:00:00.000Z", // 09:00 EST
    "2026-01-15T21:59:00.000Z", // 16:59 EST
  ];

  for (const iso of cigarettesOn) {
    const now = new Date(iso);
    assert.equal(isCigaretteFlashWindow(now), true, iso);
    assert.equal(isNicotineQuietWindow(now), false, iso);
    assert.equal(isTv2Daytime(now), false, iso);
  }
  for (const iso of cigarettesOff) {
    const now = new Date(iso);
    assert.equal(isCigaretteFlashWindow(now), false, iso);
    assert.equal(isNicotineQuietWindow(now), true, iso);
    assert.equal(isTv2Daytime(now), true, iso);
  }
});
