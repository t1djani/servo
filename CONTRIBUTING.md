# Contributing to servo

servo is in early alpha. The architecture is moving, so the most useful contributions right now are issues: where the model breaks, where a gate would be theater, where a plan failed to reproduce on a different model.

## Ground rules

- **A check earns its place only if it injects ground truth the producer did not have.** New gates must name their oracle. A gate that re-runs the same model on the same context is theater and will be rejected.
- **Tests before code.** Every change ships with a failing test first, then the code that makes it pass.
- **The library stays dependency-free at runtime.** Runtime deps are bundled into `dist` (see `tsup.config.ts`); nothing should require a consumer to run `npm install`.

## Local setup

```bash
npm install
npm test          # vitest
npm run typecheck # tsc --noEmit
npm run build     # tsup → dist/index.js
```

## Commits

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `build:`). Keep each commit to one coherent change.
