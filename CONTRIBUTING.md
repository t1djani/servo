# Contributing to servo

servo is in early alpha and markdown-first. The most useful contributions right now are issues: where the model breaks, where a gate would be theater, where a plan failed to reproduce on a different model.

## Shape of the plugin

- **Skills and commands are markdown.** They are prompts and procedures the agent runs. The core of servo is here, not in code.
- **The manifest is YAML** the agent reads directly. No parser to install.
- **Enforcement hooks are bash** — small, no dependencies.
- **Scripts are Python standard library**, and only exist where a step is genuinely mechanical (walking a tree, scoring, diffing). Default to a skill + the agent before reaching for a script. If a format forces a dependency, cite it in the skill rather than adding a build step.

There is no build and nothing to `install`. Edit a skill, reload the plugin.

## Ground rules

- **A check earns its place only if it injects ground truth the producer did not have.** Every gate names its oracle. A gate that re-reads the artifact with the same context is theater and will be rejected.
- **The verifier never sees the producer's reasoning.** That separation is the whole point.

## Commits

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`). One coherent change per commit.
