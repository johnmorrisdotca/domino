---
title: "コマンドライン"
section: how-to
order: 5
description: "同じ規則で配り、進め、検証・再生します。"
---

## 再現できるコマンド

```sh
npx @johnmorrisdotca/domino deal --set 9 --players 2 --seed 42 --lang ja
npx @johnmorrisdotca/domino play --set 9 --players 2 --seed 42 --length short --save
```

再現にはシードを渡します。省略すると実行ファイルがシードを選び、標準エラーに表示します。`check`は記録を検証し、`replay`は手を文章にします。`--stdin`で記録を標準入力から読み、対応するコマンドの`--json`は機械向けの結果を出します。`domino --help`と[全使用法](../../../README.md#the-command-line)を確認してください。

## 純粋なCLI関数

```ts
import {runCli} from "@johnmorrisdotca/domino";
const result = runCli(["deal","--set","9","--players","2","--seed","42","--json"],{locale:"en-US"});
console.log(result.code,JSON.parse(result.out).seed,result.err);
```

`runCli`は引数と環境を受け、プロセスのストリームに触れず出力・エラー・終了コードを返します。0は成功、1は拒否されたゲームや操作、2は使い方の誤りです。言語は明示した指定、言語の環境変数、システムの順です。日本語タグなら日本語、それ以外は英語です。自動処理では環境やロケールを明示します。
