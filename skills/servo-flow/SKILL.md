---
name: servo-flow
description: The servo process for a piece of work, phase by phase. Use at the start of any non-trivial task to know which phase you are in and which skill to run next.
---

# servo-flow

servo runs a piece of work as a feedback loop, not a straight line. Each phase boundary re-grounds against the project's oracles and gates the artifact against ground truth before moving on. The premise: the agent is a high-gain actuator with no damping — left alone it converges fast and confidently, even on the wrong answer. The phases supply the damping.

## The phases

```
scan-project → gather-context → expert-panel → shape-spec ⟂gate→ seal-plan ⟂gate→ execute ⟂scope-watch ⟂gate→ close-the-books
```

| Phase | Skill | When |
|---|---|---|
| Map the project | `scan-project` | once per project: discover the manifest (oracles + experts) |
| Ground | `gather-context` | at the start, and again at every phase boundary |
| Diverge | `expert-panel` | only for decisions with no ground truth yet (the real forks) |
| Spec | `shape-spec` → `servo-gate` | shape the spec, then gate it against invariants/scope |
| Plan | `seal-plan` → `servo-gate` | write a closed plan, then gate it against the spec |
| Execute | (TDD) + `scope-watch` → `servo-gate` | build, watching for drift, gating the diff |
| Done | `close-the-books` | reconcile every criterion and invariant |

## Two things that hold across all phases

- **The human is a seat at the table, not ceremony.** Always the *client* (nothing ships without their OK). Often the *CEO* (they carry the intent). Sometimes also an *expert* (they contribute, and get challenged like any expert). Capture their input richly, in batches — then pressure-test it.

- **Verification only counts if it injects ground truth the producer did not have.** Every gate names an oracle. A check that re-reads the artifact with the same context that wrote it is theater. Skip it.

## Skip what does not apply

Small, well-scoped work does not need the whole loop. A one-line fix needs `servo-gate` against `scope` at most. Reach for `expert-panel` only when there is a genuine fork. The loop scales down; do not run ceremony for its own sake.
