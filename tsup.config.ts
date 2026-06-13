import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  bundle: true,
  noExternal: ["zod", "yaml"], // inline les deps → dist autonome (pas de npm install à l'install)
  clean: true,
  dts: false,
});
