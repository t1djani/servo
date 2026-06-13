---
description: Verify the current spec / plan / diff against a named oracle from the manifest (GO / FIX / STOP).
---

Run a non-colluding gate using the `servo-gate` skill.

Figure out, from context or by asking me:
1. the **artifact** to review (the spec, plan, or diff at hand),
2. the **oracle key** from `.servo/manifest.yaml` (e.g. `scope`, `invariants`, `acceptance`).

Then follow the `servo-gate` skill procedure end to end and report the verdict and findings, naming the oracle you checked against.
