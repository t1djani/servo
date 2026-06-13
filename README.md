<div align="center">

<img src="assets/banner.png" alt="servo" width="640" />

# servo

**Process discipline built for AI agents, not humans.**
Ground every step in truth. Close the loop. Ship plans that run anywhere.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-d97757.svg)](https://docs.claude.com/en/docs/claude-code)
[![status: alpha](https://img.shields.io/badge/status-alpha-orange.svg)](#roadmap)

</div>

---

## Quickstart

```bash
/plugin marketplace add t1djani/servo
/plugin install servo@servo
```

Then, in any project:

```bash
/scan-project     # discover the project's sources of truth → .servo/manifest.yaml
/servo-gate       # verify a spec / plan / diff against a named oracle
```

> Alpha. The flow and the gate work today; the heavier backtest tooling is on the [roadmap](#roadmap).

## The idea

Most agent workflows assume a disciplined human at the wheel. An LLM agent is not that. It is a **high-gain actuator with no damping**: it converges fast and with confidence, even on the wrong answer.

servo treats the agent as what it is and builds the feedback loops around it. One rule sits underneath everything:

> A check is only worth running if it brings in information the producer did not have.

Re-running the same model on the same context is the agent grading its own homework. servo refuses to ship that.

## Why it is different

A normal review re-reads your work with the same context that wrote it. A servo **gate** sends the work to a reviewer that did *not* produce it and judges it only against a named source of truth — your invariants, your tickets, your prior art. That one shift catches a class of failure plain review misses.

In testing, servo's gate caught that a "new" feature proposal was already most of the way built across two existing tickets — and stopped a duplicate before a line of code was written. The reviewer did not know the feature was new; it only checked the claim against the prior-art oracle, and the claim did not hold.

## What's inside

A small set of skills, each one phase of the loop. `servo-flow` routes between them.

| Phase | Skill | What it does |
|---|---|---|
| Setup | `scan-project` | discover the manifest — where truth lives, which domains (experts) the project has |
| Ground | `gather-context` | pull the relevant slices of ground truth, brief them, confirm in one batch |
| Diverge | `expert-panel` | convene the relevant domain experts plus a mandated dissenter on a real fork |
| Spec | `shape-spec` | write a spec that embeds its invariants and names its oracles |
| Plan | `seal-plan` | write a closed, deterministic plan, written for the weakest executor |
| Execute | `scope-watch` | diff the work in progress against the issue's intent, catching drift in flight |
| Done | `close-the-books` | reconcile every acceptance criterion and invariant, with evidence |
| Verify | `servo-gate` | the non-colluding gate, reused by spec / plan / diff — returns `GO` / `FIX` / `STOP` |

## How it works

**Core concepts**

- **Non-colluding perspective** — the primitive everything composes from. It sees a *different slice* of context, holds an *assigned stance* (often adversarial), and never sees the producer's reasoning, so it cannot rubber-stamp it.
- **Oracle** — a named source of ground truth (the *test-oracle* sense, nothing mystical). Every gate names the oracle it checks against. A gate with no oracle is theater, and servo treats that as a bug.
- **Three compositions**: **diverge** (a panel that generates and stress-tests options, with a mandated dissenter), **constrain** (make the failure *structurally impossible*, not just detectable), **verify** (a gate against an oracle).

**One manifest adapts servo to your project.** `scan-project` proposes `.servo/manifest.yaml`: where your sources of truth live and which expert owns which check. You accept or adjust. Everything else is generic. See [docs/manifest.md](docs/manifest.md).

```yaml
experts:
  data: { sources: ["src/db", "docs/schema.md"], ownsCheck: ["migrations"] }
oracles:
  invariants: "docs/invariants.md"   # what must never break
  scope: "issue:{id}"                # what this work is (and isn't)
  acceptance: "issue:{id}.criteria"  # done = this
```

**The flow.** Each boundary re-grounds against the manifest and gates against a named oracle:

```
scan → ground → diverge → spec  ⟂gate→  plan  ⟂gate→  execute  ⟂scope-watch ⟂gate→  done
```

**Cost scales to the stakes.** The fan-out (panels, multiple verifiers) is where tokens go, so servo tiers it. The default `quick` depth runs a minimal panel and a single oracle-grounded gate on a cheap model; `thorough` widens both for high-stakes, irreversible work. Set the default in the manifest, override per task.

**Plugin layout**

```
servo/
├── .claude-plugin/{plugin.json, marketplace.json}
├── skills/        # the phases and gates — markdown, this is the core
├── commands/      # /servo-gate, …
├── examples/      # a manifest to copy
└── docs/          # the manifest reference
```

## Develop

servo is markdown-first: skills and commands are prose, the manifest is YAML. There is nothing to build or install — edit a skill, reload the plugin, done. Mechanical helpers, when needed, are Python standard library; enforcement hooks are bash.

## Contributing

Early days. Issues and ideas welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE) © t1djani

---

## Roadmap

- [x] **The flow** · scan, ground, diverge (expert panel), spec / plan, scope-watch, conservation — all skills.
- [x] **The gate** · oracle-grounded, non-colluding, tiered by stakes. Validated against a real feature.
- [ ] **Backtest harness** · replay the flow against a finished feature, blind to the answer (Python).
- [ ] **Differential plan validation** · run a plan through N executors, diff their behavior to find under-specification.
- [ ] **Council** · the diverge composition, shipped standalone.
