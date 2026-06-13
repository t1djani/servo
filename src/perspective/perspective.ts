import type { ModelChoice } from "./modelSelect.js";

export interface PerspectiveInput {
  artifact: string;     // l'objet jugé
  oracleSlice: string;  // la vérité-terrain pour ce check (contenu de l'oracle nommé)
  stance: string;       // posture assignée, ex. "refute", "verify scope"
  model: ModelChoice;
}

export interface Verdict {
  verdict: "GO" | "FIX" | "STOP";
  findings: string[];
}

// Injecté : en prod enveloppe l'outil Agent de Claude Code ; en test, un stub.
export type Dispatch = (model: string, prompt: string) => Promise<string>;

export function buildPrompt(input: PerspectiveInput): string {
  // §7b / CONTRAINDRE : une perspective sans oracle = théâtre. On le rend
  // structurellement impossible — le primitif refuse de construire un gate vide.
  if (input.oracleSlice.trim() === "") {
    throw new Error("oracle vide : une perspective non-colludante exige une vérité-terrain (§7b)");
  }
  return [
    `You are a non-colluding "${input.stance}" reviewer.`,
    `You did NOT produce the artifact. Judge it ONLY against the ground truth below.`,
    `If the ground truth does not support a claim in the artifact, flag it.`,
    ``,
    `## Ground truth (authoritative oracle)`,
    input.oracleSlice,
    ``,
    `## Artifact under review`,
    input.artifact,
    ``,
    `Reply with JSON only: {"verdict":"GO|FIX|STOP","findings":["..."]}`,
  ].join("\n");
}

export async function runPerspective(input: PerspectiveInput, dispatch: Dispatch): Promise<Verdict> {
  const raw = await dispatch(input.model.verifier, buildPrompt(input));
  try {
    // Type d'entrée laxiste : le JSON du vérificateur n'est pas garanti conforme.
    const parsed = JSON.parse(raw) as { verdict?: unknown; findings?: unknown };
    if (parsed.verdict !== "GO" && parsed.verdict !== "FIX" && parsed.verdict !== "STOP") {
      return { verdict: "FIX", findings: [`verdict invalide: ${String(parsed.verdict)}`] };
    }
    const findings = Array.isArray(parsed.findings) ? parsed.findings.map(String) : [];
    return { verdict: parsed.verdict, findings };
  } catch {
    return { verdict: "FIX", findings: [`verifier returned non-JSON: ${raw.slice(0, 200)}`] };
  }
}
