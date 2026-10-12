---
title: "Read tiles and legal plays"
section: how-to
order: 2
description: "Use canonical tile numbers and let the rules choose actions."
---

## Canonical and laid tiles

A hand tile is `low * 16 + high`; a laid tile is oriented as `from * 16 + to`. Use the helpers rather than reversing those encodings yourself. Tile helpers expect valid pip values; they are arithmetic, not a validator for arbitrary numbers.

```ts
import {tileOf,endsOf,laidAgainst,laidEnds,everyTile} from "@johnmorrisdotca/domino";
const tile = tileOf(6,4);
console.log(endsOf(tile),laidEnds(laidAgainst(tile,6)),everyTile(9).length);
```

## Ask for the available actions

`legalPlays` lists lay targets; `trainMoves` also includes draw, pass and next-round actions. Train indices are player seats, then `players.length` for the shared Mexican Train. A private train becomes open after its owner cannot play, and closes when its owner next lays on it.

An uncovered double must be covered before ordinary play elsewhere. With `doubles:"chain"`, the current player may chain doubles, then covers the last uncovered one first. `mexican:"ownFirst"` delays that player's shared-train opening until their own train starts. Supply all three fields when overriding `TrainOptions`.

`playTrain` returns `null` for an illegal action, so use it at a host boundary too. A round ends when somebody empties their hand or the table is blocked. Score is the pips left, accumulated across rounds; the lowest total wins. See [trainMoves](api:trainMoves) and [the README rules](../../README.md#mexican-train).
