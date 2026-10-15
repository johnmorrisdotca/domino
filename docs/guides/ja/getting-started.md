---
title: "はじめに"
section: tutorial
order: 1
description: "シード付きで配り、合法な一手を進めます。"
---

## ルールから始める

npmで`@johnmorrisdotca/domino`をインストールします。主入口はデータと純粋な関数で、サーバーでもブラウザーでも使えます。対応するセット、2〜8人の席、シード、必要なら追加ルールを指定します。

```ts
import {startTrain,trainMoves,playTrain,trainStatus} from "@johnmorrisdotca/domino";
const game = startTrain(9,["A","B"],42)!;
const move = trainMoves(game)[0];
const next = playTrain(game,move)!;
console.log(game.seed,game.hands.map(hand=>hand.length),move);
console.log(trainStatus(next,"ja",0));
```

この例は有効な設定とルールが返した手を使います。外部の設定や手では`null`を確認してください。元の状態は変わらず、返された状態を描画します。シードは配りを決め、その後の手がゲームを決めます。

## 次に読む

[合法な手と牌の数値](rules.md)、[コンピューターの手](computers.md)、[保存](saved-games.md)、[CLI](cli.md)を参照してください。[標準デモ](https://johnmorrisdotca.github.io/domino/)はそのまま遊べます。パッケージには設置用のカスタム要素はありません。
