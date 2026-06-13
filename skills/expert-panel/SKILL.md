---
name: expert-panel
description: For a decision with no ground truth yet (a real design fork), convene the relevant domain experts plus a mandated dissenter, weigh the options, and let the human decide. Use instead of deciding alone or asking the human one question at a time.
---

# expert-panel

A good brainstorm is several experts, each master of a domain, who bring their knowledge and argue toward a decision. Use this when a choice has **no ground truth to check against yet** — a design fork, an architecture call, a tradeoff. For anything that can be checked against an oracle, use `servo-gate` instead; this skill is for generating and stress-testing options, not verifying them.

The failure this prevents: one model picking the first plausible option with false confidence, and a panel of same-context models agreeing with each other.

## Procedure

1. **Frame the fork.** State the decision and the constraints from the context brief (`gather-context`). If there is genuinely an oracle that settles it, stop — this is a gate, not a panel.

2. **Convene the MINIMAL relevant set — usually 2-3, not every plausibly-related domain.** From the manifest's `experts`, pick only the ones the decision genuinely turns on (a data fork wakes the data expert; it does not need the bot expert). Convening six experts on a three-expert problem is the waste this step must avoid.

   **How to spawn an expert:** an expert is **not a named agent type** — do not try to spawn an agent called `data` or `hs-coaching` (it does not exist and will fail). Spawn a plain general subagent and *give it the expert's identity as context*: the expert's `sources` from the manifest (read any `skill:` pointer as a file, read the listed code/notes), plus the **context brief** from `gather-context`, plus its assigned stance. That content IS the expert. Hand it the brief so it does not re-read the whole project — it only goes deeper into its own slice. Each expert is a real, separate perspective — not you role-playing all of them. These reader-experts can run on a **cheaper, faster model**; reserve the strong model for the synthesis in step 5.

3. **Seat the mandated dissenter.** Spawn one more perspective whose assigned job is to **disagree with the emerging consensus** — by duty, not by opinion (the "tenth man"). If everyone is converging, it must surface the strongest case against. Keep its dissent on the record even if overruled.

4. **Place the human.** The human is the CEO/client seat: they carry the intent and make the call. If they also hold a domain, their input is an expert contribution — and gets challenged like any other, not executed blindly.

5. **Synthesize, do not average.** Present the options scored, with the dissent kept visible. Recommend, but do not collapse to a forced consensus. Propose the open choices to the human in one batch, pre-filled.

## Scale to the stakes (cost)

The panel is the most expensive move in the flow — each expert is a subagent. Scale it:
- **Default (most decisions): 2-3 experts, on a cheap model, fed the brief.** Often a single dissenter is enough alongside them.
- **High-stakes only** (irreversible, expensive to reverse, security): widen the panel and run experts on the strong model.

If the human or the flow signalled a **quick** pass, lean to the smaller end (even reason from 2 lenses inline rather than spawning, accepting less independence for a low-stakes fork). A full panel on a routine fork is the ceremony this skill must not become.

## Rules

- Experts must not collude: each sees its own slice and stance, not the others' reasoning, until synthesis.
- The dissenter is structural. A panel with no dissent is the groupthink this skill exists to break.
