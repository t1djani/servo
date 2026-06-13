---
name: seal-plan
description: Write a plan that runs anywhere — closed (zero open decisions), pinned to a machine-checkable acceptance oracle, and written for the weakest executor you intend to use — then gate it against the spec. Use after the spec passes its gate.
---

# seal-plan

A plan is the hardest artifact in the flow. Its whole job is to be **portable and deterministic**: hand it to another conversation, or a smaller model, and you should get the same result. That only holds if the plan is sealed. Three properties seal it.

## The three properties

- **Closed — zero open decisions.** Every choice was made upstream (`expert-panel`, `shape-spec`). The plan is pure convergence. A plan that still contains a decision delegates that divergence to execution time, where each executor will resolve it differently — non-deterministic by construction. If you find an open choice while writing the plan, stop and settle it upstream.

- **Pinned to a machine-checkable acceptance oracle.** "Same result" needs a definition of "same". It is *behavioral equivalence*: the same acceptance criteria pass, the same invariants hold — not character-identical output. So the plan must name an acceptance oracle that a machine can check (tests, criteria), and **snapshot the volatile part into the plan itself**. A plan whose acceptance target can drift between writing and execution is not deterministic. (This is where a plan differs from a spec: the spec points at a live oracle for freshness; the plan snapshots for determinism.)

- **Written for the weakest executor (plan-to-the-floor).** Portability is relative to a capability floor. Write the plan for the *least* capable model you intend to run it on: exact file paths, complete code in every step, exact commands with expected output, zero placeholders. Writing for a strong model and running on a weak one breaks; the reverse is safe. If you will delegate to a cheaper model, the plan must be constrained enough that the cheap model cannot go wrong.

## Procedure

1. Map the files each task touches, then break the work into bite-sized, test-first tasks. Embed the spec's invariants inline so the executor cannot miss them.
2. For each task: the failing test, the command to see it fail, the minimal code, the command to see it pass, the commit. Real content in every step.
3. Snapshot the acceptance criteria into the plan.
4. **Gate the plan.** Run `servo-gate` against `spec` (does the plan cover it, no creep?) and against the plan's own closedness (any open decision, placeholder, or unreachable acceptance check is a `STOP`). Fix before executing.

## Note

Running the plan through two independent executors and diffing their behavior — to *measure* under-specification instead of guessing at it — is the strongest gate a plan can get. That differential check is a later phase; for now, the gate above is a strong floor.
