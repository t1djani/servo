import { describe, it, expect, vi } from "vitest";
import { buildPrompt, runPerspective, type PerspectiveInput } from "./perspective.js";

const baseInput: PerspectiveInput = {
  artifact: "Le plan ajoute une colonne goldDiffAt15.",
  oracleSlice: "StoredMatch ne contient pas goldDiffAt15.",
  stance: "refute",
  model: { verifier: "sonnet", crossModel: true },
};

describe("buildPrompt", () => {
  it("inclut l'oracle, l'artefact, la posture, et l'instruction de non-collusion", () => {
    const p = buildPrompt(baseInput);
    expect(p).toContain("StoredMatch ne contient pas goldDiffAt15.");
    expect(p).toContain("Le plan ajoute une colonne goldDiffAt15.");
    expect(p).toContain("refute");
    expect(p).toMatch(/did NOT produce/i);
  });

  it("REFUSE un oracle vide (anti-théâtre §7b : pas de gate sans vérité-terrain)", () => {
    expect(() => buildPrompt({ ...baseInput, oracleSlice: "   " })).toThrow(/oracle/i);
  });
});

describe("runPerspective", () => {
  it("parse un verdict JSON renvoyé par le dispatch", async () => {
    const dispatch = vi.fn(async () =>
      JSON.stringify({ verdict: "STOP", findings: ["goldDiffAt15 absent de StoredMatch"] }),
    );
    const v = await runPerspective(baseInput, dispatch);
    expect(dispatch).toHaveBeenCalledWith("sonnet", expect.stringContaining("StoredMatch"));
    expect(v.verdict).toBe("STOP");
    expect(v.findings[0]).toMatch(/goldDiffAt15/);
  });

  it("dégrade en FIX si le dispatch ne renvoie pas du JSON", async () => {
    const dispatch = vi.fn(async () => "je pense que c'est bon");
    const v = await runPerspective(baseInput, dispatch);
    expect(v.verdict).toBe("FIX");
    expect(v.findings[0]).toMatch(/non-JSON/);
  });

  it("dégrade en FIX si le verdict n'est pas GO/FIX/STOP", async () => {
    const dispatch = vi.fn(async () => JSON.stringify({ verdict: "MAYBE", findings: [] }));
    const v = await runPerspective(baseInput, dispatch);
    expect(v.verdict).toBe("FIX");
    expect(v.findings[0]).toMatch(/verdict invalide/);
  });

  it("dégrade en FIX sur un JSON valide mais non-objet (null, nombre, tableau)", async () => {
    for (const raw of ["null", "42", "[1,2]"]) {
      const v = await runPerspective(baseInput, vi.fn(async () => raw));
      expect(v.verdict).toBe("FIX");
      expect(v.findings[0]).toMatch(/non-object/);
    }
  });
});
