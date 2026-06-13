---
name: close-the-books
description: Before calling work done, reconcile it against its opening commitments — every acceptance criterion ticked, every invariant re-verified — with evidence, not assertion. Use when about to claim a task is complete or before merging.
---

# close-the-books

Do not declare work done; reconcile it. Like counting the instruments before closing — the count at the end must match the commitments at the start, or something was left inside. This is a conservation check: the artifact's opening inventory (its acceptance criteria and the invariants it promised not to break) must all be accounted for, with evidence.

The failure this prevents: an agent asserting "done / fixed / passing" with confidence it has not earned, because it never ran the check.

## Procedure

1. **Recover the opening inventory.** From the plan and the manifest: the `acceptance` criteria (what "done" was defined as) and the `invariants` the work promised not to break.

2. **Tick each acceptance criterion — with evidence.** For every criterion, run the actual check (the test, the command, the observation) and confirm it passes. Quote the evidence. A criterion with no run is not ticked.

3. **Re-verify each invariant.** Confirm nothing the work promised not to break is broken. Run the relevant gate (`servo-gate` against `invariants`) if judgment is needed; otherwise check directly.

4. **Account for every item.** Every criterion ticked, every invariant verified, each with its evidence. If any item cannot be accounted for, the books do not close — the work is not done. Report the open item plainly.

## Rule

Evidence before assertion, always. "It should work" is not closing the books. Run the check, quote the output, then close. If a check failed or was skipped, say so — do not round up to "done".
