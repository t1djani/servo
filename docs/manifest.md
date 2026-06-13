# The manifest

A servo project keeps one file, `.servo/manifest.yaml`. It is the only project-specific configuration servo needs, and it is the adapter that lets one generic plugin work on any project. servo reads it directly — there is no parser library to install.

A full example: [`examples/manifest.example.yaml`](../examples/manifest.example.yaml).

## `experts`

The domains in your project, and where each domain's knowledge lives. A brainstorm or review convenes the relevant experts; each one reads its own sources before it speaks.

```yaml
experts:
  frontend:
    sources: ["src/components", "docs/design.md"]   # where this expert's knowledge lives
    ownsCheck: ["ui", "accessibility"]               # the kinds of check it owns
```

An expert's depth comes from its `sources`, read at the moment it is convened — not from a baked-in description. That is why a scanned, generic "frontend expert" can still be deep: it points at your actual design tokens and docs.

## `oracles`

The named sources of ground truth a gate checks against. Each entry maps a **check key** to a **source**.

```yaml
oracles:
  invariants: "docs/invariants.md"     # what must never break
  scope: "issue:{id}"                  # what the current work is (and isn't)
  acceptance: "issue:{id}.criteria"    # done = this
```

When `servo-gate` runs, it takes a key (e.g. `acceptance`), looks up the source, reads it, and uses its content as the oracle the verifier judges against. A gate with no resolvable, non-empty oracle does not run.

### Source forms

The source string tells the agent *where* to read. servo does not hard-code these; the agent resolves them with whatever tool fits:

| Form | Read with |
|---|---|
| `path/to/file.md` | the Read tool |
| `git:main` | git (the state of `main`) |
| `issue:{id}` | your tracker (e.g. an MCP) |
| `vault:note-name` | your notes store |

Use whatever forms your project actually has. The only contract is: the agent must be able to read the source and get real ground truth, or the gate stops.

## `defaults`

Optional. Sets how much rigor the flow spends by default, so you do not pay panel-and-multi-verifier cost on routine work.

```yaml
defaults:
  depth: quick   # quick | thorough
```

- `quick` (recommended default): minimal experts (2-3) on a cheap model, single oracle-grounded gates, inline reasoning for low-stakes forks.
- `thorough`: wider panels, multi-verifier gates, the strong model for synthesis — reserved for irreversible or high-stakes work.

A task can override the default ("this one is high-stakes, go thorough"). When unset, the flow behaves as `quick`.

## Freshness

A spec should point at a *live* oracle (read fresh each time). A plan, which must reproduce identically anywhere, should **snapshot** the volatile part of its acceptance oracle into the plan itself. Same idea, opposite default: the spec wants freshness, the plan wants determinism.
