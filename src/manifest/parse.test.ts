import { describe, it, expect } from "vitest";
import { parseManifest } from "./parse.js";

describe("parseManifest", () => {
  it("parse un manifest valide", () => {
    const yaml = `
experts:
  design:
    sources: ["src/styles/tokens"]
    ownsCheck: ["ui"]
oracles:
  invariants: "vault/memory/*"
`;
    const res = parseManifest(yaml);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.manifest.experts.design.sources).toEqual(["src/styles/tokens"]);
      expect(res.manifest.oracles.invariants).toBe("vault/memory/*");
    }
  });

  it("rejette un expert sans sources", () => {
    const yaml = `
experts:
  design:
    ownsCheck: ["ui"]
`;
    const res = parseManifest(yaml);
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.errors.join(" ")).toMatch(/sources/);
    }
  });

  it("rejette un YAML invalide", () => {
    const res = parseManifest("experts: [unclosed");
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.errors[0]).toMatch(/YAML/);
    }
  });
});
