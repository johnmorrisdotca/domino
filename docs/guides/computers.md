---
title: "Let the computers play"
section: how-to
order: 3
description: "Advance deterministic legal turns with an explicit host limit."
---

## A bounded host loop

```ts
import {startTrain,computerMove,playTrain,moveCount,trainTotals} from "@johnmorrisdotca/domino";
let game = startTrain(9,["",""],42,{length:"short",doubles:"one",mexican:"any"},[true,true])!;
for(let n=0;n<5000 && game.phase!=="finished";n++) {
  const next = playTrain(game,computerMove(game));
  if(!next) throw new Error("Computer supplied an illegal move");
  game = next;
}
console.log(game.phase,moveCount(game),trainTotals(game));
```

Call `computerMove` only while another action is possible. It chooses a legal lay, draw, pass or next round, so the same game can be driven by a person or a computer. The bounded loop prevents an unattended host task from running forever; check the final phase before reporting a complete game.

## Keep display and choice separate

The computer reads its own hand and public table, not another hand or the boneyard order. It plans runs on its own train, sheds heavy tiles elsewhere and prefers doubles it can cover. Choices are deterministic for the same state. In a UI, the host schedules and animates turns; the rules contain no browser timer. See [computerMove](api:computerMove) and [longestRun](api:longestRun).
