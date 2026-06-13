---
name: servo-gate
description: Verify an artifact (a spec, a plan, a diff, a claim) against a named oracle from the project manifest, using a reviewer that did not produce it. Returns GO / FIX / STOP. Use before accepting a spec or plan, or before merging.
---

# servo-gate

Verify an artifact against ground truth, using a **non-colluding** reviewer: one that did not produce the artifact and judges it only against a named oracle. A gate that does not read an independent oracle is theater — this skill refuses to run without one.

The rule underneath: a check is only worth running if it brings in information the producer did not have. Re-reading the artifact with the same context that wrote it is the agent grading its own homework.

## What you need

- The **artifact**: the text under review (a spec, a plan, a diff, a single claim).
- The **oracle key**: which source of truth to check against (e.g. `scope`, `invariants`, `acceptance`). The project's keys live in `.servo/manifest.yaml`.
- The **stance** (default `refute`): the posture the reviewer takes.

## Procedure

1. **Resolve the oracle.** Read `.servo/manifest.yaml` in the project. Find the key under `oracles:`. Its value is the *source* — where the ground truth lives (a file path, `git:main`, `vault:...`, `linear:...`). If the key is not in the manifest, stop and report the available keys; do not guess.

2. **Read the source → the oracle slice.** Read the source yourself (Read tool, MCP, git, whatever the source type calls for) and capture the relevant content. This text is the **oracle slice**. If you cannot read it, stop — never invent ground truth.

3. **Refuse an empty oracle.** If the oracle slice is empty or whitespace, stop: a gate with no ground truth is theater. This refusal is by design (§7b).

4. **Build the verifier prompt** by filling this exact template:

   ```
   You are a non-colluding "<STANCE>" reviewer.
   You did NOT produce the artifact. Judge it ONLY against the ground truth below.
   If the ground truth does not support a claim in the artifact, flag it.

   ## Ground truth (authoritative oracle)
   <ORACLE SLICE>

   ## Artifact under review
   <ARTIFACT>

   Reply with JSON only: {"verdict":"GO|FIX|STOP","findings":["..."]}
   ```

5. **Dispatch the verifier — the real non-colluding step.** Spawn a subagent with the Agent tool and give it **exactly** the prompt from step 4 and nothing else. It must not see your reasoning or how the artifact was produced. When more than one model is available, run the verifier on a **different model than the one that produced the artifact** (§7d) to cut shared bias. Tell it to reply with only the JSON object.

6. **Read the verdict.** Parse the reviewer's JSON: `{"verdict": "GO" | "FIX" | "STOP", "findings": [...]}`. If the response is not valid JSON, or `verdict` is missing or not one of the three values, treat the result as **FIX** and record that the verifier response was malformed.

7. **Report** the `verdict` and the `findings`, naming the oracle key that was checked.

## Tiering — keep it cheap (§7e)

- **Default: one verifier** (steps 5–6 once). Most gates are low-stakes.
- **Escalate to a panel** of 3 verifiers (steps 5–6 three times) only when the artifact is high-stakes: irreversible, security-sensitive, a production migration, or the human flagged it. Keep any dissenting finding; take **STOP** if a majority stops.

Do not panel by default. A panel on a low-stakes gate is the ceremony this skill exists to avoid.

## Rules

- No oracle, no gate. Step 3 is not optional.
- The verifier never sees the producer's reasoning. That separation is what makes the verdict worth anything.
