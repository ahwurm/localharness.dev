// REAL ledger rows — no fabricated receipts (site rule).
// Source: docs/receipts/ledger.sample.jsonl on github.com/ahwurm/localshift @ origin/main —
// the sanitized public sample from the morning-report dogfood cutover (June 2026).
// Cosmetic normalizations only: rows sorted by ts (an append-only ledger accrues in time
// order; the sample file's row order is a sanitization artifact), ts shortened to
// "MM-DD HH:MMZ", exit_status + artifacts_ok rendered as one status clause ("artifact
// missing" wording from the row's own artifact-gate note). tokens/duration/trace/model_root
// fields omitted from display; model_id is constant across the sample (qwen3.6-27b) and
// stated once in the pane header. Full rows: docs/receipts/ledger.sample.jsonl.
export interface LedgerRow {
  t: string; // ts, shortened
  w: string; // workload
  ok: boolean; // exit_status === 0 && artifacts_ok
  s: string; // status clause
}

export const ledgerRows: LedgerRow[] = [
  { t: '06-11 22:14Z', w: 'report-writer-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-11 22:23Z', w: 'report-boss-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 00:51Z', w: 'market-research-local', ok: false, s: 'exit 1 · artifact missing' },
  { t: '06-12 01:05Z', w: 'market-research-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 01:58Z', w: 'morning-research-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 02:16Z', w: 'morning-reasoning-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 03:05Z', w: 'reasoning-qa', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 04:03Z', w: 'market-research-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 05:09Z', w: 'chart-analyst', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 06:38Z', w: 'chart-analyst', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 06:49Z', w: 'report-writer-local', ok: true, s: 'exit 0 · artifacts ok' },
  { t: '06-12 06:56Z', w: 'report-boss-local', ok: true, s: 'exit 0 · artifacts ok' },
];
