# Changelog

All notable changes to servo are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/), and versions follow [SemVer](https://semver.org/).

## [0.1.0] — 2026-06-13

First public alpha.

### Added
- **The flow**, as skills routed by `servo-flow`: `scan-project`, `gather-context`, `expert-panel`, `shape-spec`, `seal-plan`, `scope-watch`, `close-the-books`.
- **`servo-gate`** — non-colluding, oracle-grounded verification returning `GO` / `FIX` / `STOP`, with the `/servo-gate` command.
- **The manifest** (`.servo/manifest.yaml`) — oracles and experts, discovered by `scan-project`; a project's only adapter.
- **Depth tiering** (`quick` / `thorough`) to scale fan-out cost to the stakes, set in the manifest or per task.
- Docs: the manifest reference and an example manifest.
