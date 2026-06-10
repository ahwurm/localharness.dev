---
title: "Local is not small frontier"
description: "Designing for local models is a different discipline than designing for a frontier API — the gaps, and what the harness has to absorb."
date: 2026-06-10T13:00:00Z
ogImage: /og/blog-local-frontier.png
---

The naive model of local AI: frontier, but smaller numbers. Same design, lower scores, lower bill. That model fails in practice. Local is a different platform that happens to speak the same API, and most of the differences move work from the provider's side of the line to yours.

## What frontier gives you silently

A frontier API ships with an invisible platform team: function calling that virtually always parses, a long context window managed at someone else's expense, output reliability tuned across billions of requests, capacity as their problem, and a quietly improving model under the same endpoint. None of it appears in your architecture diagram — until it's gone.

## The gaps, one by one

**Tool calling is a spectrum, not a given.** Across local models, function-calling quality runs from frontier-grade to absent, and it does not track coding ability — strong coders can be weak callers, and some models publish no tool-calling score at all (worked through in the [model-selection notes](https://github.com/ahwurm/localharness/blob/main/CONTEXT-MODEL.md)). Two consequences: pick agentic models on tool-calling accuracy first, and build the XML fallback path so a weak caller still works.

**The context window is a budget you set.** Quantization size times memory headroom determines the usable window — the notes work through exactly this tradeoff on a 119 GiB box: heavier quant, less headroom, smaller practical context. So compaction becomes a first-class subsystem, sized per model in config, not a fallback you hope never fires.

**Reliability variance is yours to absorb.** Truncated JSON, repetition, loops that never terminate. The harness needs boundary guards on tool results, stuck detection over recent actions, and hard budgets on actions and wall-clock. Frontier models fail too — but a local harness has to treat failure as a steady state to engineer around, not an exception to log.

**You are the platform team.** The serving stack matters as much as the weights: the notes record a model that was simply broken in one runtime and fine in another. Quantization, engine, sampler settings — all yours now. The compensation is real, though: nothing changes under you. A pinned local model is the same model in March that it was in January, which is more than any API endpoint can promise.

**The cost structure inverts.** On frontier, tokens cost money and time is cheap. Locally, tokens are free and time is the scarce resource. This changes design more than any benchmark delta. At API prices, verification passes and second drafts are economically irrational; locally they cost nothing but latency — which, for a headless job, nobody is waiting on. The discipline shifts from *minimize tokens* to *spend tokens to buy reliability, inside the latency budget*.

**Privacy and determinism come free.** Nothing leaves the box, and nothing upgrades behind your back. For some workloads that's the entire business case.

## Design for the platform you have

The harness exists to absorb exactly these gaps — fallbacks, compaction, stuck detection, budgets — which is why [where capability actually lives](/blog/the-harness-not-the-model/) is a harness question before it is a model question. And the honest corollary: some workloads shouldn't migrate at all. Long-context synthesis and taste-bound writing often fail the audit, and [the audit exists for a reason](/localshift/).

Local is not small frontier. Treat it as its own platform and the constraints become design inputs. Treat it as a discount API and they become incidents.
