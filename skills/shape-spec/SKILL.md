---
name: shape-spec
description: Write a spec that carries its own guardrails — it embeds the invariants it must not break and names the oracles it will be judged against — then gate it. Use after the design forks are decided and before writing a plan.
---

# shape-spec

Turn a decided design into a spec that the rest of the flow can trust. A good servo spec is not just a description; it carries the means to check itself. Two moves make that happen.

## The two moves

- **Embed the invariants inline (constrain).** Whatever the work must never break — pulled from the `invariants` oracle and the relevant experts — is written *into* the spec as an explicit list, not left implicit. A constraint that is physically present in the document cannot be silently forgotten downstream.

- **Name the oracles (point, do not freeze).** The spec declares which sources it will be judged against — `scope`, `invariants`, `acceptance`, `prior-art` — by reference, so they stay fresh. (A plan, later, will *snapshot* its acceptance target instead; a spec evolves, so it points.)

## Procedure

1. **Start from the context brief** (`gather-context`) and the decided forks (`expert-panel`). Do not re-open settled decisions here.
2. **Write the spec.** State the goal, the approach, and the scope — including what is explicitly *out* of scope.
3. **Add an Invariants section.** List, inline, what must not break, each tagged with the oracle/expert it came from.
4. **Add an Oracles section.** Name the manifest keys this spec will be gated against.
5. **Gate the spec.** Run `servo-gate` on the spec, once per relevant oracle: against `invariants` (does it violate any?), `scope` (does it match the intent, no creep?), `prior-art` (does it ignore or contradict what exists?), `footguns` (does it walk into a known trap?). Fix what comes back `FIX`/`STOP`; do not proceed on an open finding.

## Rule

The spec is the last place divergence is allowed. After it, the plan is pure convergence. If a real fork is still open, go back to `expert-panel` — do not bury the choice in the spec for the plan to trip over.
