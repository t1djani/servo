<div align="center">

<!-- assets/banner.png — see assets/PROMPTS.md for the Midjourney prompt -->
<img src="assets/banner.png" alt="servo" width="640" onerror="this.style.display='none'" />

# servo

**Process discipline built for AI agents, not humans.**
Ground every step in truth. Close the loop. Ship plans that run anywhere.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-d97757.svg)](https://docs.claude.com/en/docs/claude-code)
[![status: alpha](https://img.shields.io/badge/status-alpha-orange.svg)](#roadmap)

</div>

---

## Quickstart

> servo is in **alpha**. The gate (`/servo-gate`) and the manifest format are in place; the rest of the flow lands next. The block below installs it once published.

### Claude Code

```bash
/plugin marketplace add t1djani/servo
/plugin install servo@servo
```

## The idea

Most agent workflows assume a disciplined human at the wheel. An LLM agent is not that. It is a **high-gain actuator with no damping**: it converges fast and with confidence, even on the wrong answer.

servo treats the agent as what it is and builds the feedback loops around it. One rule sits underneath everything:

> A check is only worth running if it brings in information the producer did not have.

Re-running the same model on the same context is the agent grading its own homework. servo refuses to ship that.

## What's inside

Shipped:

| Piece | What it does |
|---|---|
| **`/servo-gate`** + the `servo-gate` skill | verify a spec / plan / diff against a named oracle, with a reviewer that did not produce it → `GO` / `FIX` / `STOP` |
| **the manifest** | one `.servo/manifest.yaml` per project, declaring oracles and experts — see [docs/manifest.md](docs/manifest.md) |

The rest of the flow (ground, diverge, scope-diff, scanner) lands next — see [Roadmap](#roadmap).

## How it works

**Core concepts**

- **Non-colluding perspective** — the primitive everything composes from. It sees a *different slice* of context, holds an *assigned stance* (often adversarial), and never sees the producer's reasoning, so it cannot rubber-stamp it.
- **Oracle** — a named source of ground truth (the *test-oracle* sense, nothing mystical). Every gate names the oracle it checks against. A gate with no oracle is theater, and servo treats that as a bug.
- **Three compositions**: **diverge** (a panel that generates and stress-tests options, with a mandated dissenter), **constrain** (make the failure *structurally impossible*, not just detectable), **verify** (a gate that returns `GO` / `FIX` / `STOP` against an oracle).

**Your project plugs in via one manifest.** servo scans a project once and proposes where your sources of truth live and which expert owns which check. You accept or adjust. The manifest is your project's adapter; everything else is generic.

```yaml
experts:
  design: { sources: ["src/styles/tokens", "docs/design.md"], ownsCheck: ["ui", "palette"] }
  data:   { sources: ["src/db", "docs/schema.md"],            ownsCheck: ["migrations"] }
oracles:
  invariants: "docs/invariants.md"     # what must never break
  scope:      "issue:{id}"             # what this work is (and isn't)
  acceptance: "issue:{id}.criteria"    # done = this
```

**The flow.** Each boundary re-grounds against the manifest and gates against a named oracle:

```
init → ground → diverge → spec  ⟂gate→  plan  ⟂gate→  execute  ⟂scope-diff ⟂gate→  done
```

Plans are the hardest artifact in the chain: closed (zero open decisions), pinned to a machine-checkable acceptance oracle, and written for the weakest executor you intend to run them on — so the same plan, run in another conversation or on a smaller model, produces the same result.

**Plugin layout:**

```
servo/
├── .claude-plugin/{plugin.json, marketplace.json}
├── skills/        # the phases and gates — markdown, this is the core
├── commands/      # /servo-gate, …
├── hooks/         # bash enforcement at phase boundaries
├── scripts/       # Python stdlib, only where a step is genuinely mechanical
└── examples/ · docs/
```

No build step, nothing to install. Skills are prompts; the few scripts are Python standard library.

## Develop

servo is markdown-first: skills and commands are prose, the manifest is YAML, enforcement hooks are bash, and the few mechanical scripts are Python standard library. There is nothing to build or install — edit a skill, reload the plugin, done.

## Contributing

Early days. Issues and ideas welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT License — see [LICENSE](LICENSE) for details. © t1djani

---

## Roadmap

- [x] **Foundation** · the `servo-gate` skill + `/servo-gate` command + the manifest format. The non-colluding verifier prompt is validated against a real feature.
- [ ] **Flow phases** · ground, diverge (expert panel), spec/plan gates, scope-diff, conservation — all skills.
- [ ] **Backtest harness** · replay against a finished feature, blind to the answer (Python).
- [ ] **Auto-scanner** · discover the manifest for any project (Python).
- [ ] **Differential plan validation** · run a plan through N executors, diff their behavior to find under-specification.
- [ ] **Council** · the diverge composition, shipped standalone.

## Brand assets

The banner lives at `assets/banner.png` (not generated yet). Midjourney prompts: [assets/PROMPTS.md](assets/PROMPTS.md).
