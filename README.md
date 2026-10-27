<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/readme/banner.dark.png">
    <img src="docs/readme/banner.light.png" alt="Readback: a voice agent that takes prescription orders and proves it did not mishear" width="880" height="200">
  </picture>
</p>

<p align="center">
  The recognizer proposes. A validator or a regulator's list decides. A refusal is a result.
</p>

<p align="center">
  <!-- readme:buttons -->
  <a href="#run-locally"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/cta-run.dark.png"><img src="docs/readme/cta-run.light.png" alt="Run locally" width="145" height="44"></picture></a>
  <a href="docs/specification.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/cta-spec.dark.png"><img src="docs/readme/cta-spec.light.png" alt="Specification" width="164" height="44"></picture></a>
  <a href="docs/README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/cta-docs.dark.png"><img src="docs/readme/cta-docs.light.png" alt="Documentation" width="181" height="44"></picture></a>
  <!-- /readme:buttons -->
</p>

<p align="center">
  <!-- readme:status -->
  <a href="#results"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-status-1.dark.png"><img src="docs/readme/badge-status-1.light.png" alt="reflex yes on a listed pair: writes nothing" width="279" height="28"></picture></a>
  <a href="#why-it-exists"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-status-2.dark.png"><img src="docs/readme/badge-status-2.light.png" alt="listed drug: asked even at 1.00" width="221" height="28"></picture></a>
  <br>
  <a href="#results"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-status-3.dark.png"><img src="docs/readme/badge-status-3.light.png" alt="offline figures: free to reproduce" width="233" height="28"></picture></a>
  <a href="LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-status-4.dark.png"><img src="docs/readme/badge-status-4.light.png" alt="license: MIT" width="107" height="28"></picture></a>
  <!-- /readme:status -->
</p>

<p align="center">
  <!-- readme:stack -->
  <picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-stack-1.dark.png"><img src="docs/readme/badge-stack-1.light.png" alt="recognizer: universal-3-5-pro" width="216" height="28"></picture>
  <picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-stack-2.dark.png"><img src="docs/readme/badge-stack-2.light.png" alt="agent: AssemblyAI Voice Agent API" width="248" height="28"></picture>
  <br>
  <picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-stack-3.dark.png"><img src="docs/readme/badge-stack-3.light.png" alt="framework: Next.js 15" width="167" height="28"></picture>
  <picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-stack-4.dark.png"><img src="docs/readme/badge-stack-4.light.png" alt="language: TypeScript" width="165" height="28"></picture>
  <!-- /readme:stack -->
</p>

<p align="center">
  <!-- readme:nav -->
  <a href="#why-it-exists"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-1.dark.png"><img src="docs/readme/badge-nav-1.light.png" alt="Why it exists" width="104" height="26"></picture></a>
  <a href="#how-it-works"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-2.dark.png"><img src="docs/readme/badge-nav-2.light.png" alt="How it works" width="102" height="26"></picture></a>
  <a href="#try-it-in-two-minutes"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-3.dark.png"><img src="docs/readme/badge-nav-3.light.png" alt="Try it" width="56" height="26"></picture></a>
  <a href="#results"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-4.dark.png"><img src="docs/readme/badge-nav-4.light.png" alt="Results" width="72" height="26"></picture></a>
  <a href="#run-locally"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-5.dark.png"><img src="docs/readme/badge-nav-5.light.png" alt="Run locally" width="92" height="26"></picture></a>
  <a href="#structure"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-6.dark.png"><img src="docs/readme/badge-nav-6.light.png" alt="Structure" width="85" height="26"></picture></a>
  <a href="#limitations"><picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/badge-nav-7.dark.png"><img src="docs/readme/badge-nav-7.light.png" alt="Limitations" width="94" height="26"></picture></a>
  <!-- /readme:nav -->
</p>

<p align="center">
  <img src="docs/images/call-page.png" alt="The call page: the promise on the left, the microphone in the centre, three example lines to say on the right" width="880">
</p>

## Why it exists

A recognition error in prescription intake does not look like an error. AssemblyAI's own
example: *"A patient states an allergy to Lisinopril. The transcript reads Bisoprolol."*
Both drugs exist, both are plausible, nothing signals a fault. The vendor's
[own published figures](docs/sources.md#what-does-the-vendor-publish-about-recognition-errors)
set the scale: Universal-3.5 Pro Realtime has an entity error rate of **15.31%**, and at
84.69% per turn a five-turn conversation "comes through clean **43.6%** of the time". Reading
every entity back lifts that to 79.1% in a separate vendor projection, which assumes the caller
catches errors 70% of the time. A caller who hears "morphine, correct?" and says "yes" out of
habit is how that assumption fails.

> **High recognizer confidence does not protect against homophony.** The model can be
> certain it heard *morphine* while the caller said *hydromorphone*. Confidence proves
> nothing there; a regulator-published look-alike, sound-alike list does.

So a drug name on the ISMP List of Confused Drug Names is asked again **even at confidence
1.00**, and the question is contrastive: the agent names the drug it heard and every drug
the list pairs with it, and only a spoken name answers. A reflex "yes" writes nothing.

The name is the procedure. Read-back is required of flight crews by ICAO Annex 11 §3.7.3.1
and has been a Joint Commission requirement for verbal orders since 2003, so Readback
automates a step regulation already demands and busy practice skips. Why pharmacy, why this
procedure and who pays for it is the [product case](docs/product.md).

## How it works

Three decisions carry the design:

- **Confidence is not evidence.** The pair check runs **before** the confidence threshold. A drug on the published list is asked about at any certainty, including 1.00, and only the caller saying a name confirms it. Naming the partner corrects the value.
- **One constructor writes a field.** `ConfirmedValue` can be built only inside `gate.confirm()`. The order accepts nothing else, so "the model decided it was fine" is not a code path that exists. A machine check fails the build if a second way appears.
- **Arithmetic where it exists, voice where it does not.** An NPI (Luhn over `80840`) or a DEA number (mod-10) that passes its checksum above the field's threshold is written at once, without a read-back. A drug name has no check digit, so it is proved by the catalogue and read back, and we say so.

The browser holds both AssemblyAI sockets on short-lived tokens. The recognizer gives every
word a millisecond span and a confidence; the agent calls our server-side tools; the gate
decides what may be written.

```mermaid
%%{init: {"theme":"base","themeVariables":{"primaryColor":"#ffffff","primaryTextColor":"#08080c","primaryBorderColor":"#5c48db","secondaryColor":"#ececf1","tertiaryColor":"#f4f4f8","lineColor":"#55555e","textColor":"#08080c","noteBkgColor":"#ececf1","noteTextColor":"#34343b","actorBkg":"#ffffff","actorBorder":"#5c48db","fontFamily":"Manrope"}}}%%
flowchart LR
    S["Caller speaks"] --> R["Recognizer<br/>words · ms spans · confidence"]
    R --> P["Agent proposes a value<br/>quoting the words it came from"]
    P --> G{"Gate"}
    G -- "name on the ISMP list" --> C["Contrastive question<br/>only a spoken name answers"]
    G -- "validator fails" --> V["Asked again,<br/>then spelled out"]
    G -- "below the field's threshold,<br/>or read back by policy" --> B["Read back<br/>an explicit yes confirms"]
    G -- "checksum passes,<br/>above the threshold" --> W["ConfirmedValue"]
    C --> W
    B --> W
    V --> P
    W --> O["commit_order, held:<br/>refused until every<br/>required field is proved"]
```

Every written field keeps its provenance: the words that produced it, their timings, the
lowest confidence among them and the validator's verdict. The order in which the gate
reads these, and the contract of every tool the agent calls, are laid out
[branch by branch in the specification](docs/specification.md); how the sockets, routes,
storage and per-session agents fit together is the [architecture](docs/architecture.md). After the call
the server fetches the vendor's own transcript and marks each field `witnessed` or not in
the receipt, a second channel the browser cannot forge, described in the
[security model](docs/security.md).

<p align="center">
  <img src="docs/images/field-card.png" alt="What each arm of the replay ordered, and below it the field card for the drug name: confirmed aloud by the caller, and settled by a spoken name because the drug sits in a published look-alike pair" width="880">
</p>

<p align="center"><sub>The field card from the replay, under what each arm ordered: the words and timecodes behind
the value, the read-back, the caller's answer and the published pair that required a spoken name.</sub></p>

## Try it in two minutes

After [running it locally](#run-locally), open <http://localhost:3000>. The first four steps need no key and no microphone.

| Step | Open | What you should see |
|---|---|---|
| 1 | [The replay](http://localhost:3000/demo?autoplay=1) | Hydromorphone said, morphine heard at certainty 1.00. With the pair rule on, the agent asks which of the two and the caller's "Hydromorphone." is written; with only the pair rule off, morphine is read back, a "yes" confirms it and morphine is ordered |
| 2 | [Compare](http://localhost:3000/compare) | Six moments side by side: said, heard, certainty, the gate's verdict, and what the same gate writes with only its threshold and validators left on |
| 3 | [How it works](http://localhost:3000/how-it-works#attack) | An attack console: seven attempts to push a value past the gate, each refused with the error the code raised, one of them before the value reaches the gate. Nothing is written |
| 4 | [Metrics](http://localhost:3000/metrics) | Every figure with its command and set size, the pair rule's cost beside its catches, and a dash where nothing was measured |
| 5 | [Call it live](http://localhost:3000/), with a key and a public origin | Say "Hydromorphone, two milligrams". The agent names the drug and every drug the list pairs with it, and waits for a name |

<p align="center">
  <img src="docs/images/replay-two-arms.png" alt="The replay finished: with the pair rule on, hydromorphone is written after the caller names it; with only the pair rule off, a yes confirms morphine and morphine is ordered" width="880">
</p>

<p align="center"><sub>Step 1, the replay. The same synthesised session through the shipped gate twice, differing by one flag.</sub></p>

<p align="center">
  <img src="docs/images/receipt.png" alt="An order receipt rechecked in the browser: VALID, with the digest, DEA, NPI and catalogue checks passed" width="880">
</p>

<p align="center"><sub>The receipt of a production call placed by the synthesised-caller smoke harness, rechecked in
the browser: the sha256, the DEA and NPI check digits and the catalogue.</sub></p>

## Results

Every figure below is printed by a command in this repository, offline and free. The
[measurement report](tools/eval/REPORT.md) carries each one with its command and set size, and
[the evidence page](docs/evidence.md) grades every claim the project makes, from measured
to assumed.

| Figure | What it shows | Command |
|---|---|---|
| Without the pair rule a reflex yes writes 20 of 20 pair mishearings; with it, 0 | The pair rule is the only difference between the two arms | `npx tsx tools/scripts/measure/ab-gate.ts` |
| 59 of 59 correct drug names are asked about: 25 by the standing read-back, 13 by the threshold, 21 by a contrastive question | The cost side: which question a correct value gets | `npx tsx tools/scripts/measure/coverage-matrix.ts` |
| The 2023 ISMP list carries 514 pairs over 754 names; 502 of 3730 catalogue drugs carry a listed name | How much of the catalogue the pair rule reaches | `npx tsx tools/scripts/measure/ismp-coverage.ts` |
| NPI catches 100% of substitutions, DEA catches 95.2%, over 32 080 mutations | The two checksums are not equally strong, and the policy says so | `make audit-checksums` |
| 12 of 12 mutations killed | Every gate branch fails its own named test when broken | `make gate-mutation` |

The 20 curated pairs, each checked by hand against its row of the list, drive the demo and
the evaluation; the product rule reads the whole list.

## Run locally

```bash
npm ci
make data
make dev
make verify
```

`make dev` creates `.env.local` from `.env.example` when it is missing and serves
`http://localhost:3000`. The tests, the replay and `make honest` (every offline figure with its
command) need no key. A live call needs `ASSEMBLYAI_API_KEY`, `AGENT_TOOL_SECRET` and a public
HTTPS origin in `.env.local`, because AssemblyAI calls the agent's tools only on a public host:
a laptop needs a tunnel, and otherwise the tools are exercised on a deployment. Every variable
is listed in [how to run it locally](docs/architecture.md#how-to-run-it-locally). `make verify`
runs every check; what each one refuses, and which few commands spend credit, is in
[how it is verified](docs/verification.md).

## Structure

| Document | What it covers |
|---|---|
| [Architecture](docs/architecture.md) | What talks to what, one field from speech to a written value, running locally |
| [Specification](docs/specification.md) | The data model, field policy, the gate's branch order, every tool contract |
| [Security](docs/security.md) | Trust boundaries, tool authentication, the vendor witness |
| [Verification](docs/verification.md) | Every check, what it refuses, which commands spend credit |
| [Documentation](docs/README.md) | Every page |

### Built on AssemblyAI

| Capability | Why the product depends on it |
|---|---|
| Word-level timings and per-word confidence (`universal-3-5-pro`) | The gate takes the **lowest** confidence over the words behind a value; a turn-level score would hide the one failed word that is the drug name |
| Voice Agent API with server-side HTTP tools | AssemblyAI itself calls `propose_field`, `read_back` and `commit_order` on our server, so each tool call is a short HTTPS request to a serverless route and none runs in the browser |
| `commit_order` in `hold` execution mode | The agent waits for the server's verdict instead of talking over a write |
| `keyterms_prompt` | Biases the recognizer toward clinic, prescriber and unit words, and is forbidden, by a check, from ever containing a drug name the pair rule tests |
| Entity-aware turn detection | The vendor documents that the agent waits for a whole entity before ending a turn; we never send the two settings that switch it off, because an NPI dictated in digit groups is the case it protects |

## Limitations

- **The gate proves provenance, not truth.** Provenance is computed in the browser, so a
  hostile client can report words nobody said. The vendor's own transcript, fetched by the
  server after the call, witnesses each field, but it cannot block a commit during the
  call. The [threat model](docs/security.md) states what is and is not protected.
- **The pair rule is exactly as good as the 2023 ISMP list.** AssemblyAI's own example,
  lisinopril heard as bisoprolol, is on no published list, so only the plain read-back, which
  a reflex "yes" passes, stands between it and the order.
- **The evaluation audio is synthesised.** Recognition is real AssemblyAI traffic over
  desktop text-to-speech voices; no human-voice set has been measured. The recognizer has
  not been caught turning a listed name into its published partner in our corpus (0 of
  186 degraded utterances), so the rule rests on the published list, not on our data.
- **Live calls on production have run with a synthesised caller, not yet a human voice.**

These are the short versions. Each one, with what is measured, what enforces it and what
remains open, is set out in full in [the limitations](docs/limitations.md).

> **A technology demonstration, not a medical device.** Synthetic data only: no real
> patients, no real prescriptions. In an emergency call 911, or 988 for a mental health crisis.

<p align="center">
  <picture><source media="(prefers-color-scheme: dark)" srcset="docs/readme/mark.dark.png"><img src="docs/readme/mark.light.png" alt="" width="32" height="32"></picture>
  <br>
  <sub>Team GoatWhistle, AssemblyAI Voice Agent Hackathon on lablab.ai, 2026. Licensed under <a href="LICENSE">MIT</a>.</sub>
</p>
