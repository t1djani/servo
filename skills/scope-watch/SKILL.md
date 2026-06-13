---
name: scope-watch
description: During execution, continuously diff the work in progress against the intent of the issue (the scope oracle), so drift is caught in flight rather than at review. Use while implementing a plan, especially across many steps.
---

# scope-watch

Hold the work to its intent while it is being built, not after. A human implementer keeps the goal in their head for hours; an agent loses it as the context fills with implementation detail and starts solving adjacent problems it was never asked to. This skill catches that drift in flight.

## What drift looks like

- Building something the issue did not ask for ("while I'm here, I'll also…").
- Quietly widening the change beyond the plan's scope.
- Solving a harder, more interesting problem than the one assigned.
- Touching files or systems the scope did not name.

## Procedure

1. **Anchor on the scope oracle.** From the manifest, read the `scope` source for this work (the issue / the spec's scope section). That is the intent: what this work *is*, and what it is *not*.

2. **Diff at each meaningful step.** As you implement, periodically compare the work in progress against that intent. Cheap question: *does this change still serve the stated scope, or did it grow a second purpose?*

3. **On suspected drift, stop the line.** This is the andon cord: stopping is cheap and expected; pushing through a scope smell is the failure. Surface the drift — "this step is adding X, which is outside the issue's scope" — and decide explicitly: is X in scope (update the scope oracle deliberately) or out (drop it)?

4. **Never widen scope silently.** If the work genuinely needs more than the issue covers, that is a decision for the human (CEO/client), not a default the agent takes mid-implementation.

## Rule

An agent that pushes through a scope smell to "be helpful" is the exact failure this skill exists to stop. Stopping to check is the cheap, correct move.
