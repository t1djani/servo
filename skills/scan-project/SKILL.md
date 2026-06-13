---
name: scan-project
description: Once per project, discover its manifest — where the project's ground truth lives and which domains (experts) it has — by scanning it, then propose a manifest for the human to accept or adjust. Use when a project has no .servo/manifest.yaml yet, or to refresh a stale one.
---

# scan-project

Give servo a project's `.servo/manifest.yaml` without hand-writing it. This skill discovers the project's sources of truth and its domains, then proposes a manifest. It is what makes one generic plugin work on any project — the manifest is the only project-specific adapter, and this builds it.

## Discover, do not ingest

The goal is a **map of pointers**, not a copy of the project. Sample enough signal to infer where truth lives and which domains exist; do not read everything. The output is the manifest, not an index.

## Procedure

1. **Enumerate candidate sources, tool-agnostic.** Look for:
   - local directories and files (codebase, `docs/`, notes, ADRs),
   - connected MCP servers (a tracker, a notes store, a database),
   - any declared memory or knowledge base.
   The source forms that end up in the manifest are generic (`path/...`, `git:main`, `issue:{id}`, `vault:...`) — see `docs/manifest.md`.

2. **Infer the experts (domains) — from the code, not from the tooling.** Read the project's actual structure (its domain folders, its docs) and infer the domains *it* has. Do **not** just mirror the existing skills, agents, or tools: those are *sources*, not the list of domains. A project's core domain often has no skill of its own — infer it anyway from the code (a `domain/coaching/` folder is a coaching expert whether or not a coaching skill exists). For each domain, a seat is a **role plus pointers to where its knowledge lives** — its depth comes from the sources it points at, read when convened, not from a baked-in description, and not from a dedicated skill (it does not need one). A scanned "design expert" that points at the real tokens file is deep; a generic one is not. Propose every domain the layout reveals, including ones with no existing skill or tool.

3. **Infer the oracles.** Map the recurring kinds of check to authoritative sources: what must never break (`invariants`), what a unit of work is (`scope`), what already exists/was decided (`prior-art`), what "done" means (`acceptance`), known traps (`footguns`).

4. **Ask only what the scan cannot infer.** The scan is not mute: when a detected source is unreadable (auth/path), a domain is ambiguous (is this a dev project or a docs repo?), the human knows a domain the scan missed, or you need to know which hat the human will wear — ask, in one batch. Fill the gaps of discovery; do not replace discovery with an interrogation.

5. **Propose a small, justified roster.** Present the proposed `experts` and `oracles` with, for each, *why* you inferred it and *where* its knowledge lives. Keep it small enough to validate at a glance. The human (CEO/client) accepts or adjusts.

6. **Write `.servo/manifest.yaml`.** Persist the accepted manifest. Re-run this skill to refresh it when the project's domains evolve.

## Rule

The manifest must point at sources that can actually be read to get real ground truth. A pointer to a source nobody can read is worse than no pointer — it makes later gates validate against nothing.
