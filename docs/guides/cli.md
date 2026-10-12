---
title: "Use the command line"
section: how-to
order: 5
description: "Deal, play, check and replay through the same native rules."
---

## A reproducible command

```sh
npx @johnmorrisdotca/domino deal --set 9 --players 2 --seed 42 --lang en
npx @johnmorrisdotca/domino play --set 9 --players 2 --seed 42 --length short --save
```

Pass a seed to reproduce output. Without one the executable draws a seed and names it on standard error. `check` validates a saved game, and `replay` narrates its moves. `--stdin` reads a record from standard input; `--json` supplies machine-readable output where supported. See `domino --help` for each option and [the complete usage](../../README.md#the-command-line).

## Call the pure CLI from code

```ts
import {runCli} from "@johnmorrisdotca/domino";
const result = runCli(["deal","--set","9","--players","2","--seed","42","--json"],{locale:"en-US"});
console.log(result.code,JSON.parse(result.out).seed,result.err);
```

`runCli` receives arguments and optional surroundings; it returns output, error and status without touching process streams. Exit code 0 means success, 1 a refused game/action and 2 invalid command usage. Language follows an explicit flag, then language environment variables, then the system locale; Japanese tags select Japanese and other tags English. Supply locale or environment explicitly for stable automation.
