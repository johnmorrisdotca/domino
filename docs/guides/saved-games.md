---
title: "Save and replay a game"
section: how-to
order: 4
description: "Validate a recorded game by replaying its native moves."
---

## Round-trip a move record

```ts
import {startTrain,trainMoves,playTrain,encodeTrain,decodeTrain,moveCount} from "@johnmorrisdotca/domino";
const game = startTrain(9,["A","B"],42)!;
const next = playTrain(game,trainMoves(game)[0])!;
const text = encodeTrain(next);
const restored = decodeTrain(text);
console.log(restored?.seed,restored && moveCount(restored),restored?.turn===next.turn);
```

The saved format contains its version, set, options, seed, players, computer flags and compact moves. It does not trust a stored hand, train or boneyard. `decodeTrain` validates the structure and replays all actions; incompatible versions, setup and illegal moves return `null`. A reload reconstructs the same deal rather than drawing a new one.

## Choose where to keep it

The codec returns text. Your host chooses a database column, download or explicit save control. The native demo's displayed game text is available for copying; its footer says nothing is stored or sent. Seat names are in the record, so a host should choose what names to share. For server boundaries, accept an action only through `playTrain` and send each seat only the information it should see.

The [CLI](cli.md) checks or narrates the same record through `check` and `replay`. See [decodeTrain](api:decodeTrain) and [the format notes](../../README.md#saved-games).
