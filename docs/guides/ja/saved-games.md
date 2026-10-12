---
title: "保存と再生"
section: how-to
order: 4
description: "記録された標準の手を再生して検証します。"
---

## 手の記録を往復する

```ts
import {startTrain,trainMoves,playTrain,encodeTrain,decodeTrain,moveCount} from "@johnmorrisdotca/domino";
const game = startTrain(9,["A","B"],42)!;
const next = playTrain(game,trainMoves(game)[0])!;
const text = encodeTrain(next);
const restored = decodeTrain(text);
console.log(restored?.seed,restored && moveCount(restored),restored?.turn===next.turn);
```

保存形式にはバージョン、セット、設定、シード、席名、コンピューターの指定、短い手の記録が入ります。保存された手牌や道、山は信用せず、`decodeTrain` が構造を確認してすべての手を再生します。対応しないバージョン、不正な設定や手は `null` です。再読込で新しく配り直すことはありません。

## 保存場所を選ぶ

コーデックは文字列を返し、保存先はホスト側で選びます。標準デモでは表示された記録をコピーでき、何も保存・送信しないとフッターに示しています。席名も記録に含まれるので、共有する名前はホスト側で決めます。サーバーでは `playTrain` で手を受け付け、各席には見えるべき情報だけを送ります。

[CLI](cli.md) の `check` と `replay` も同じ記録を扱います。[decodeTrain](api:decodeTrain)と [保存形式](../../../README.md#saved-games)を参照してください。
