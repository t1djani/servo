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

> servo is in **alpha**. P1 ships the engine (a bundled TypeScript library). The installable skill and gate surface lands in P2 — the block below is the target install shape.

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

P1 (the foundation, shipped):

| Piece | What it does |
|---|---|
| **oracle manifest** | declares where your ground truth lives and which expert owns each kind of check |
| **non-colluding perspective** | the verification primitive — a reviewer that judges an artifact only against a named oracle |
| **verifier-model selection** | runs the verifier on the most distant model available, to cut shared bias |

Wired into the runtime as skills, commands and hooks in later slices — see [Roadmap](#roadmap).

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

**Plugin layout** (target):

```
servo/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/          # P2+  the phases and gates
├── commands/        # P2+  /servo-init, /servo-gate
├── hooks/           # P2+  gate enforcement at phase boundaries
└── src/  →  dist/   # P1   the engine, bundled with zero runtime deps
```

## Develop

Requires Node ≥ 20.

```bash
npm install
npm test          # vitest
npm run typecheck # tsc --noEmit
npm run build     # tsup → dist/index.js (deps inlined)
```

## Contributing

Early days. Issues and ideas welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT License — see [LICENSE](LICENSE) for details. © t1djani

---

## Roadmap

- [x] **P1 — Foundation** · manifest schema + parser, verifier-model selection, the non-colluding perspective primitive. Bundled to a standalone `dist` with zero runtime dependencies.
- [ ] **P2 — Gates** · spec-gate / plan-gate wired to the runtime, anti-theater check, differential plan validation.
- [ ] **P3 — Backtest harness** · replay against a finished feature, blind to the answer.
- [ ] **P4 — Full flow** · ground, diverge panel, scope-diff, conservation.
- [ ] **P5 — Auto-scanner** · onboarding that discovers the manifest for any project.
- [ ] **P6 — Council** · the diverge composition, shipped standalone.

## Brand assets

The banner lives at `assets/banner.png` (not generated yet). Midjourney prompts: [assets/PROMPTS.md](assets/PROMPTS.md).
