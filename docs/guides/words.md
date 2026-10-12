---
title: "Name seats and announce moves"
section: how-to
order: 6
description: "Use the package words for the state your table actually has."
---

## Read the same state the rules read

```ts
import {startTrain,trainStatus,trainName,mexicanOf,trainSeatName} from "@johnmorrisdotca/domino";
const game = startTrain(9,["",""],42,undefined,[false,true])!;
console.log(trainSeatName(game,0,"en",0));
console.log(trainStatus(game,"ja",0));
console.log(trainName(game,mexicanOf(game),"en",0));
```

`you` is the local seat; omit it for a terminal or computers-only observer. A given name wins over generic labels. Blank seats become numbered players or computers, and the shared train has its own label. `trainNews` is empty before the first move; then it reports the recorded last move. `trainStatus` follows pending doubles, draws, passes and round/game endings.

## Add host words deliberately

`DOMINO_STRINGS` supplies English and Japanese templates. `dominoSay` interpolates braces and leaves a missing value untouched. Keep template keys consistent in another language rather than concatenating a sentence around numbers. The generated [Japanese string list](../strings-ja.md) pairs existing wording with English. The native demo's Docs link follows its selected language; API identifiers remain unchanged in both references.
