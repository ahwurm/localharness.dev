---
title: "Flat-rate automation ends June 15"
description: "Anthropic is splitting headless usage from subscriptions. The right response is a workload audit, not a bigger budget."
date: 2026-06-10T15:00:00Z
ogImage: /og/blog-flat-rate.png
---

Anthropic is splitting its subscription in two. Starting June 15, interactive Claude Code stays on your plan — the sessions where you are present and typing. Everything headless — `claude -p`, the Agent SDK, GitHub Actions, third-party apps authenticated against your subscription — moves to a separate monthly credit pool: $20 on Pro, $100 on Max 5x, $200 on Max 20x. Credits don't roll over. When the pool is gone, usage either flows to standard API rates, if you've enabled usage credits, or stops. [Anthropic's help center](https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan) has the full mechanics.

The change is rational. A flat-rate subscription cannot underwrite unbounded automation, and a plan ceiling that scheduled workloads can exceed many times over was never a stable equilibrium. Pricing the correction was a when, not an if.

But vendor-rational and operator-rational are different ledgers.

## The economics

Interactive usage is bounded by human attention — you can only type so much. Automation is unbounded by design. Cron schedules accumulate. Agents spawn agents. Every pipeline you ship adds token volume while you sleep. Under flat-rate, that growth was invisible. Under a meter, every scheduled job has a marginal cost again, and automation portfolios start compounding the way cloud bills do.

The wrong response is budgeting for the growth. The right response is auditing the portfolio. Most headless AI jobs don't need a frontier model — they needed one to get *built*, which is a different thing.

## What moves, what stays

The jobs worth migrating to a local model share a profile:

- **Headless and scheduled.** No human waiting, so latency is your cheapest resource. The 5:30 AM report does not care about tokens per second.
- **Bounded context.** Inputs fit comfortably in a local model's window.
- **Verifiable output.** The job produces artifacts you can check — files written, schemas matched, sections present.
- **Modest tool surface.** Read, write, search, shell. Web-dependent workloads stay put for now.

What stays on frontier: judgment-heavy synthesis, long-context reasoning, customer-facing writing where taste is the bar. Some workloads will fail the audit honestly. That is the audit working.

## Proven, not assumed

Disclosure: from here on I am talking my own book.

[LocalShift](/localshift/) is a Claude Code plugin built for exactly this audit. Point it at a headless workload — a cron step, a skill, a bare prompt. It derives a quality eval for that specific workload, replicates the job on a local model, and judges local against frontier blind, 1v1. Three verdicts: **migrate**, **conditional**, **keep-frontier** — and the last is first-class. A workload that doesn't fit local hardware or misses the bar stays on frontier, with receipts. The bar is not frontier parity. It's *good enough, and works* — proven, not assumed.

The timing is deliberate: LocalShift launches June 15. The interactive stages — exploring the workload, designing the eval, judging — run inside Claude Code, which stays on-plan. The migrated job runs claude-free on [LocalHarness](/) against whatever OpenAI-compatible endpoint you already run: vLLM, Ollama, llama.cpp. Time gets longer. Cost goes to your power bill.

## Watch the edges

Two details Anthropic has not clarified publicly: how hooks fired from interactive sessions are classified, and where subagent and MCP usage lands. Hook-heavy operators should test before the 15th rather than learn from the invoice.

The meter is honest about what automation costs. The question it puts to every operator: is the portfolio honest about what automation needs? Run the audit. Migrate what passes. Keep what doesn't. Cost growth is a choice now.
