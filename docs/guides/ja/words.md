---
title: "席名と手の案内"
section: how-to
order: 6
description: "現在の卓の状態をパッケージの言葉で案内します。"
---

## 同じ状態を案内する

```ts
import {startTrain,trainStatus,trainName,mexicanOf,trainSeatName} from "@johnmorrisdotca/domino";
const game = startTrain(9,["",""],42,undefined,[false,true])!;
console.log(trainSeatName(game,0,"ja",0));
console.log(trainStatus(game,"ja",0));
console.log(trainName(game,mexicanOf(game),"ja",0));
```

`you`はこの端末の席です。ターミナルや全員コンピューターの観戦では省略します。指定した名前が汎用ラベルより優先します。空の席名は番号付きのプレイヤーやコンピューターになり、共用の道には専用の名前があります。最初の手の前は`trainNews`が空で、その後は最後の手を説明します。`trainStatus`はダブル、引く、パス、終了に応じます。

## ホストの言葉を加える

`DOMINO_STRINGS`に英語と日本語のテンプレートがあります。`dominoSay`は波括弧の値を置き換え、指定のない値はそのまま残します。別の言語では数値の前後をつなぐより、同じキーのテンプレートを用意します。[日本語一覧](../../strings-ja.md)に従来の訳と英語があります。標準デモのDocsリンクは選択中の言語に従い、APIの識別子は両言語で同じです。
