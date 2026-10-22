import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "node_modules/**"]),
  {
    files: ["app/components/ProductPhoto.tsx", "app/components/PlaceholderArt.tsx"],
    rules: {
      "@next/next/no-img-element": "off"
    }
  },
  {
    files: ["app/components/fleet/**/*.{ts,tsx}", "tests/kit-k-matrix.test.ts"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@next/next/no-img-element": "off"
    }
  }
]);
