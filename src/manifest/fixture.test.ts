import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { parseManifest } from "./parse.js";

describe("fixture hardstuck", () => {
  it("la fixture HS faite main est un manifest valide", () => {
    const path = fileURLToPath(new URL("../../fixtures/hardstuck.manifest.yaml", import.meta.url));
    const res = parseManifest(readFileSync(path, "utf8"));
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(Object.keys(res.manifest.experts)).toContain("gating");
      expect(res.manifest.oracles.scope).toBe("linear:HAR-{n}");
    }
  });
});
