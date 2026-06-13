---
name: gather-context
description: Before working on a task, pull the relevant slices of the project's ground truth from the manifest, write a short context brief, and confirm it with the human in one batch. Re-run at each phase boundary, not just at the start.
---

# gather-context

Load the ground truth a task needs before touching it — and again whenever the work has moved the ground. Context decays over a long session and drifts as the work changes state; the slice of truth that matters before writing a plan is not the same one that mattered before the brainstorm. So this is a recurring ritual, not a one-time setup.

The failure this prevents: an agent re-deriving facts that already exist (in the manifest's oracles), or asking the human to re-feed context the project already records.

## Procedure

1. **Read the manifest.** `.servo/manifest.yaml` lists the project's `oracles` (where ground truth lives) and `experts` (the domains). If there is no manifest, run `scan-project` first.

2. **Pull only the relevant slices.** For the task at hand, decide which oracles matter (scope of the work, invariants it could break, prior art that already exists, known footguns) and read those sources — and only those. Do not ingest everything; pull the slice the task needs.

3. **Write a short context brief.** A few lines: what the task is, what it must not break (invariants), what already exists (prior art), which footguns apply, which experts are relevant. Cite the oracle each fact came from.

4. **Confirm in one batch — not one question at a time.** Where the brief has gaps or assumptions, ask the human all the open questions at once, with proposed answers pre-filled from the context. The human is the CEO/client seat here: they own the intent. Their answers are input to pressure-test, not orders to execute blindly.

5. **Carry the brief forward — it is the cache.** The brief is read ONCE here and then **consumed by the downstream phases** (the expert panel, the gates). Hand subagents the brief instead of having each one re-read the raw oracles; a subagent only goes back to a raw source when it genuinely needs to go deeper than the brief. Reading the same vault notes and specs eleven times, once per subagent, is the main avoidable cost in the flow. At the next phase boundary, re-run this skill on the slice that now matters.

## Rule

Ground in what the project already records before asking the human or re-deriving. The manifest exists so you know where to look.
