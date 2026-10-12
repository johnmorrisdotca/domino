---
title: "音の読込とホスト操作"
section: explanation
order: 7
description: "遅延読込、ミュート、音の後片付けを理解します。"
---

## ホストの操作を待つ

```ts no-run
import {createTileSounds} from "@johnmorrisdotca/domino/tile-sounds";
const sounds = createTileSounds({muted:true,volume:0.6});
const button = document.createElement("button");
button.textContent = "音を有効にする";
button.addEventListener("click",()=>{sounds.setMuted(false);sounds.play("lay");});
document.body.append(button);
console.log(sounds.muted);
// ホストの卓を取り除くとき:
sounds.close();
```

作成時には録音を読み込まず、音声コンテキストも作りません。最初の再生で読み込み、ミュート中はダウンロードしません。ブラウザーではユーザーの操作が必要な場合があります。音声が使えない環境や読込失敗では、無音または標準の合成音になり、ゲームは失敗しません。

## 音は必要なときだけ

操作には `/tile-sounds`、AAC の録音には `/sounds` を使います。録音は Kenney's Casino Audio の CC0 素材で、[CREDITS.md](../../../CREDITS.md)に出典があります。連続音は `soundTimes` で数と間隔を調整します。ミュートは新しい音を止め、close はプレイヤーを終了します。置く、引く、混ぜる、パスの音をいつ鳴らすかはホスト側で決めます。ルール自体は音を鳴らしません。
