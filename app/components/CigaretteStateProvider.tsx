"use client";

import { createContext, useContext } from "react";
import { SHOW_CIGARETTES } from "../lib/siteConfig";

export type CigaretteWording = {
  bannerText: string;
  promoBrands: string;
};

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

const CODED: PublicCigaretteState = {
  web: SHOW_CIGARETTES,
  tv: SHOW_CIGARETTES,
  wording: {
    bannerText: "Cigarettes: 2 packs $5 or $25 a carton",
    promoBrands: "BB Full, BB Light and Belmont. Marlboro & Belmont $10",
  },
};

const CigaretteStateContext = createContext<PublicCigaretteState>(CODED);

export default function CigaretteStateProvider({
  value = CODED,
  children,
}: {
  value?: PublicCigaretteState;
  children: React.ReactNode;
}) {
  return <CigaretteStateContext.Provider value={value}>{children}</CigaretteStateContext.Provider>;
}

export function useCigaretteState(): PublicCigaretteState {
  return useContext(CigaretteStateContext);
}
