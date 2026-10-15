---
title: "牌と合法な手を読む"
section: how-to
order: 2
description: "牌の数値を扱い、ルールから選べる手を読みます。"
---

## 手牌と置いた牌

手牌は`low * 16 + high`、置いた牌は向きを持つ`from * 16 + to`です。自分で分解し直さず、共通の関数を使います。牌の関数は有効な点数を前提とする計算で、不正な数を検証するものではありません。

```ts
import {tileOf,endsOf,laidAgainst,laidEnds,everyTile} from "@johnmorrisdotca/domino";
const tile = tileOf(6,4);
console.log(endsOf(tile),laidEnds(laidAgainst(tile,6)),everyTile(9).length);
```

## 選べる手を読む

`legalPlays`は置ける牌と道、`trainMoves`は引く、パス、次ラウンドも含めて返します。道番号は各席に続き、`players.length`が共用のメキシカントレインです。自分の手を出せずパスすると自分の道が開き、次にそこへ置くと閉じます。

未処理のダブルは、別の通常の手より先に覆います。`doubles:"chain"`ではダブルを続けて置き、最後の未処理ダブルから覆います。`mexican:"ownFirst"`では自分の道を始めてから共用の道を始められます。`TrainOptions`を変更するときは三項目すべてを指定します。

不正な手に`playTrain`は`null`を返すので、ホストの入力検証にも使います。手牌を出し切るか、全員が出せなくなるとラウンドが終わります。残った点の合計をラウンドごとに加え、少ない人が勝ちます。[trainMoves](api:trainMoves)と[READMEの規則](../../../README.md#mexican-train)を参照してください。
