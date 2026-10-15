---
title: "コンピューターで進める"
section: how-to
order: 3
description: "上限を設け、決定的な合法手で進めます。"
---

## 上限を設けて進める

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

次の手がある間だけ`computerMove`を呼びます。置く、引く、パス、次ラウンドを選ぶため、同じゲームを人でもコンピューターでも進められます。ホスト側で上限を設け、完成と報告する前に最終状態を確認します。

## 表示と選択を分ける

コンピューターは自分の手牌と公開の卓だけを読み、他人の手牌や山の順序は使いません。自分の道を計画し、別の道に重い牌を出し、覆えるダブルを優先します。同じ状態なら同じ手です。画面の待ち時間やアニメーションはホスト側で扱います。ルールにブラウザーのタイマーはありません。[computerMove](api:computerMove)と[longestRun](api:longestRun)を参照してください。
