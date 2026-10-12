---
title: "Getting started"
section: tutorial
order: 1
description: "Deal a seeded table and take one legal move."
---

## Start from the rules

Install `@johnmorrisdotca/domino` with npm. Its root entry is plain data and pure functions, safe on a server and in a browser. A game needs a supported set, two to eight seats, a seed and optional house rules.

```ts
import {startTrain,trainMoves,playTrain,trainStatus} from "@johnmorrisdotca/domino";
const game = startTrain(9,["A","B"],42)!;
const move = trainMoves(game)[0];
const next = playTrain(game,move)!;
console.log(game.seed,game.hands.map(hand=>hand.length),move);
console.log(trainStatus(next,"en",0));
```

These assertions use valid fixed setup and a move supplied by the rules. For external setup or actions, branch on `null`. The original state stays untouched; render the returned state. A seed fixes the deal, while moves decide the game that follows.

## Pick your next step

[Legal plays and tile numbers](rules.md) explain the shared Mexican Train and doubles. [Computer play](computers.md) supplies deterministic turns. [Saving](saved-games.md) rebuilds the same game from its seed and record. There is a playable [native demo](https://johnmorrisdotca.github.io/domino/) and a [CLI guide](cli.md); the package does not supply a mounted custom element.
