import control from "../../../tools/eval/control/result-plain.json"
import dev from "../../../tools/eval/dev/result-plain.json"
import heldout from "../../../tools/eval/heldout/result-plain.json"
import native16 from "../../../tools/eval/native16/result-plain.json"
import stress from "../../../tools/eval/stress/result-plain.json"
import units from "../../../tools/eval/units/result-plain.json"

export const LIVE_RUN_COUNT_COMMAND = "npx tsx tools/scripts/report/live-run-count.ts"
export const STRESS_COMMAND = "npx tsx tools/scripts/measure/analyse-stress.ts"

type Entry = { readonly closeCode?: number }

type ResultFile = {
  readonly results?: readonly Entry[]
  readonly outcomes?: readonly Entry[]
  readonly scored?: readonly Entry[]
}

export type SessionRun = {
  readonly id: string
  readonly sessions: number
  readonly codes: ReadonlyMap<number, number>
  readonly evidence: "file" | "report"
}

function entriesOf(file: ResultFile): readonly Entry[] {
  if (file.results !== undefined && file.results.length > 0) {
    return file.results
  }
  if (file.outcomes !== undefined && file.outcomes.length > 0) {
    return file.outcomes
  }
  return file.scored ?? []
}

function fromFile(id: string, file: ResultFile): SessionRun {
  const entries = entriesOf(file)
  const codes = new Map<number, number>()
  for (const entry of entries) {
    if (entry.closeCode !== undefined) {
      codes.set(entry.closeCode, (codes.get(entry.closeCode) ?? 0) + 1)
    }
  }
  return { id, sessions: entries.length, codes, evidence: "file" }
}

function fromReport(id: string, closes: readonly (readonly [number, number])[]): SessionRun {
  return {
    id,
    sessions: closes.reduce((sum, [, count]) => sum + count, 0),
    codes: new Map(closes),
    evidence: "report",
  }
}

export const REPORT_ACCOUNT_RUNS: readonly SessionRun[] = Object.freeze([
  fromReport("tools/eval/dev at 1 s spacing, overwritten", [
    [1000, 19],
    [1008, 21],
  ]),
  fromReport("tools/eval/dev, four files re-run", [[1000, 4]]),
])

const BEFORE_LEDGER: readonly SessionRun[] = Object.freeze([
  fromFile("tools/eval/dev/result-plain.json", dev as ResultFile),
  fromFile("tools/eval/control/result-plain.json", control as ResultFile),
  fromFile("tools/eval/native16/result-plain.json", native16 as ResultFile),
  fromFile("tools/eval/units/result-plain.json", units as ResultFile),
  fromFile("tools/eval/heldout/result-plain.json", heldout as ResultFile),
  ...REPORT_ACCOUNT_RUNS,
])

const STRESS_RUN: SessionRun = fromFile("tools/eval/stress/result-plain.json", stress as ResultFile)

export function beforeLedgerRuns(): readonly SessionRun[] {
  return BEFORE_LEDGER
}

export function stressRun(): SessionRun {
  return STRESS_RUN
}

export function sessionsIn(runs: readonly SessionRun[]): number {
  return runs.reduce((sum, run) => sum + run.sessions, 0)
}

export function closesIn(runs: readonly SessionRun[], code: number): number {
  return runs.reduce((sum, run) => sum + (run.codes.get(code) ?? 0), 0)
}

export function codesSeen(runs: readonly SessionRun[]): readonly number[] {
  return [...new Set(runs.flatMap((run) => [...run.codes.keys()]))].sort((a, b) => a - b)
}
