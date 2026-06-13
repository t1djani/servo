import { describe, it, expect } from "vitest";
import { selectVerifierModel } from "./modelSelect.js";

describe("selectVerifierModel", () => {
  it("choisit un modèle DIFFÉRENT du producteur quand dispo", () => {
    const choice = selectVerifierModel("opus", ["opus", "sonnet", "haiku"]);
    expect(choice.crossModel).toBe(true);
    expect(choice.verifier).not.toBe("opus");
  });

  it("fallback sur le même modèle si c'est le seul dispo", () => {
    const choice = selectVerifierModel("opus", ["opus"]);
    expect(choice.crossModel).toBe(false);
    expect(choice.verifier).toBe("opus");
  });

  it("fallback sur le producteur si la liste est vide", () => {
    const choice = selectVerifierModel("opus", []);
    expect(choice).toEqual({ verifier: "opus", crossModel: false });
  });
});
