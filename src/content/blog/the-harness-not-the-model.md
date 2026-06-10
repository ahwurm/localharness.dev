---
title: "The harness, not the model"
description: "What four working agent harnesses — and a survey of eight frameworks — teach about where capability lives, and what changes when the model is local."
date: 2026-06-10T14:00:00Z
ogImage: /og/blog-harness.png
---

Before writing a line of LocalHarness, I read other people's. Four production harnesses — [OpenHands](https://github.com/All-Hands-AI/OpenHands), [OpenCode](https://github.com/sst/opencode), [Claude Code](https://github.com/anthropics/claude-code), and GSD — plus a survey of eight multi-agent frameworks, written up in the repo's [architecture notes](https://github.com/ahwurm/localharness/blob/main/CONTEXT-HARNESS.md). The conclusion became the thesis on this site's front page: the harness, not the model, is where most of the capability lives. The same model can swing tens of benchmark points depending on the harness around it.

## What the working systems teach

Each harness proved a different pattern worth stealing:

- **OpenHands** — the event-driven core. Every step is an action/observation pair on a bus, a converter lets models without native function calling participate anyway, and the original stuck detector lives here.
- **OpenCode** — minimalism as architecture. A tiny tool interface, permissions as a blocking channel, compaction by message ID, local model auto-discovery.
- **Claude Code** — the ReAct while-loop as the irreducible core, deny-first permission evaluation, and a five-layer compaction pipeline.
- **GSD** — the lean orchestrator / fat subagent split, goal-backward verification, and atomic artifact commits.

The framework survey — LangGraph, CrewAI, AutoGen, Google ADK, OpenAI's Agents SDK, MetaGPT, Mem0, Anthropic's own agent patterns — mostly confirmed the same lessons at higher altitude: checkpointed state, agents-as-tools, summary-only returns, scoped memory.

## The leverage, ranked

Not every capability pays the same. Built around local models, five matter most:

1. **Lean orchestrator, fat subagent.** The notes call this the single most important pattern: the orchestrator stays at roughly ten to fifteen percent of its context and passes file *paths* to subagents, never contents — each subagent reads with a fresh window. On a local model's smaller window this is not a style preference. It is the difference between an org that runs all day and one that compacts itself into noise.

2. **Compaction sized to the model.** At frontier context lengths you rarely think about the window. Local windows vary by model and quantization, so the context budget is per-agent config and the compaction pipeline adapts to it. Context management is a first-class subsystem, not an emergency valve.

3. **Tool-calling fallback.** Native function calling where the model supports it; an XML path where it doesn't. Local models vary wildly here, and the fallback is what makes the model swappable — the harness's whole premise.

4. **Stuck detection and budgets.** Weaker models loop. Hash the recent action signatures; on repetition, force one different approach, then escalate. Cap actions and wall-clock per agent. Cheap to compute, and it bounds the blast radius of a bad night.

5. **Deny-first permissions.** Allow everything except a short deny list — config writes, credential files, sudo, self-modifying agent definitions. A headless org running at 3 AM cannot wait on approval prompts, so the deny list does the supervising.

Everything else — the typed event bus, the append-only JSONL trace, SQLite memory scoped per agent — exists so the five above leave receipts.

## Composition is the moat

None of these patterns is novel, which is the point. They are proven in systems with millions of users, recomposed around one constraint the originals don't share: the model is local — slower, smaller-windowed, and occasionally wrong in ways frontier models aren't. Borrow what's proven. Tune it for the box it runs on. Then benchmark the harness against your own model with a scenario corpus, because the only leverage you can ship is the part you can measure.
