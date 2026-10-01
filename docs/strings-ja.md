# Domino's words, in English and Japanese

Made from `src/strings.ts` by `pnpm docs:make`; a test fails if the two differ, so this list is never out of date.

**The Japanese has not yet been reviewed by a native reader.** If a line reads wrongly or unnaturally, please
open a *Fix a translation* issue with the string's name. `{who}` and the other braces are filled in when shown.
Names that begin `cli` are the command line's; the others are the table's.

| Name | English | Japanese |
| --- | --- | --- |
| `set9` | Double-nine | ダブルナイン |
| `set12` | Double-twelve | ダブルトゥエルブ |
| `set15` | Double-fifteen | ダブルフィフティーン |
| `lengthFull` | Every double | すべてのダブル |
| `lengthShort` | Short | 短め |
| `doublesOne` | Cover one | 1枚で覆う |
| `doublesChain` | Chain | 連続 |
| `mexicanAny` | Anyone, any time | いつでも誰でも |
| `mexicanOwnFirst` | After your own | 自分の道のあと |
| `you` | You | あなた |
| `computer` | Computer {n} | コンピューター{n} |
| `player` | Player {n} | プレイヤー{n} |
| `mexican` | Mexican Train | メキシカントレイン |
| `trainYours` | Your train | あなたの道 |
| `trainOf` | {who}'s train | {who}の道 |
| `open` | open | 開放 |
| `closed` | closed | 閉鎖 |
| `tilesLeft` | {n} left | 残り{n}枚 |
| `boneyard` | Boneyard: {n} | 山: {n}枚 |
| `round` | Round {n} of {total}, hub double {engine} | 第{n}ラウンド（全{total}）、ハブのダブル {engine} |
| `needs` | Next: {n} | 次: {n} |
| `hub` | Hub | ハブ |
| `total` | Total | 合計 |
| `pips` | {n} pips | {n}点 |
| `layHere` | Lay here | ここに置く |
| `draw` | Draw a tile | 1枚引く |
| `pass` | Pass | パス |
| `nextRound` | Next round | 次のラウンド |
| `again` | Play again | もう一度 |
| `yourTurn` | Your turn. Tap a tile to lay it. | あなたの番です。牌をタップして置きます。 |
| `yourTurnCover` | Your turn. Cover the double. | あなたの番です。ダブルを覆ってください。 |
| `yourTurnDraw` | Nothing fits. Draw a tile. | 置ける牌がありません。1枚引いてください。 |
| `yourTurnPass` | Nothing fits. Pass. | 置ける牌がありません。パスしてください。 |
| `yourTurnChoose` | Choose a train for the tile. | 牌を置く道を選んでください。 |
| `thinking` | {who} to play. | {who}の番です。 |
| `roundOver` | Round over. {why} | ラウンド終了。{why} |
| `outBy` | {who} played out. | {who}が出し切りました。 |
| `blocked` | Nobody can play. | 誰も置けません。 |
| `gameOver` | Game over. {who} won with {pips} pips. | ゲーム終了。{who}の勝ち（{pips}点）。 |
| `laid` | {who} laid {tile} on {train}. | {who}が{tile}を{train}に置きました。 |
| `drew` | {who} drew a tile. | {who}が1枚引きました。 |
| `passed` | {who} passed. | {who}はパスしました。 |
| `dealt` | Round {n} dealt: the hub double is {engine}. | 第{n}ラウンドを配りました。ハブのダブルは{engine}です。 |
| `cliUnknown` | unknown option {part} | 不明なオプションです: {part} |
| `cliNeeds` | {part} needs a value | {part} には値が必要です |
| `cliTryHelp` | Try `domino --help`. | `domino --help` をご覧ください。 |
| `cliLangBad` | --lang takes en or ja | --lang は en か ja です |
| `cliNoCommand` | say what to do: deal, play, check or replay | コマンドを指定してください: deal, play, check, replay |
| `cliCommandBad` | “{part}” is not a command: deal, play, check or replay | 「{part}」はコマンドではありません: deal, play, check, replay |
| `cliSetBad` | --set takes 9, 12 or 15 | --set は 9、12、15 のいずれかです |
| `cliPlayersBad` | --players takes a whole number from 2 to 8 | --players は2〜8の整数です |
| `cliSeedBad` | --seed takes a whole number from 0 to 4294967295 | --seed は0〜4294967295の整数です |
| `cliValueBad` | {part} takes one of: {choices} | {part} は次のいずれかです: {choices} |
| `cliNoSaved` | there is no saved game to read: give it after the command, or with --stdin | 読む保存ゲームがありません。コマンドの後ろに書くか、--stdin を使ってください |
| `cliSavedBad` | that is not a game these rules can play out again | このルールでは最後まで再現できないゲームです |
| `cliFresh` | seed {seed} (pass --seed {seed} to repeat this) | シード {seed}（--seed {seed} で同じ結果を再現できます） |
| `cliDeal` | {set}, {players} players, seed {seed} | {set}、{players}人、シード {seed} |
| `cliSeat` | {who}: {tiles} | {who}: {tiles} |
| `cliBoneyard` | Boneyard: {n} tiles | 山: {n}枚 |
| `cliPlayed` | {set}, {players} players, seed {seed}, {rounds} rounds; moves made: {moves} | {set}、{players}人、シード {seed}、{rounds}ラウンド、手数: {moves} |
| `cliWinner` | Winner: {who} with {pips} pips. | 勝者: {who}（{pips}点）。 |
| `cliWinners` | Winners: {who}, each with {pips} pips. | 勝者: {who}（それぞれ{pips}点）。 |
| `cliSaved` | Saved game: | 保存したゲーム: |
| `cliPhasePlaying` | Round {n} of {total} is being played; {who} is to play. | 第{n}ラウンド（全{total}）の途中です。{who}の番です。 |
| `cliPhaseRoundOver` | Round {n} of {total} is over; the next is to be dealt. | 第{n}ラウンド（全{total}）が終わりました。次のラウンドを配ります。 |
| `cliPhaseFinished` | The game is over. | ゲームは終了しています。 |

## The command line's help

`cliUsage`, in English:

```
Usage: domino <command> [options]

Dominoes and Mexican Train: the same deal for the same seed, on every machine.

  domino deal --seed 2026 --players 4      the deal a seed makes: every hand, and the hub double
  domino play --seed 2026 --players 4      a game played out by computers, with its scores
  domino play --seed 2026 --moves          ...and every move, in words
  domino play --seed 2026 --save           ...and the saved game, as text
  domino check "<saved game>"              read a saved game back through the rules, and say where it stands
  domino replay "<saved game>"             every move of a saved game, in words

Options:
      --set <9|12|15>        the set, by its highest double (12 unless said)
      --players <2..8>       how many sit at the table (4 unless said)
  -s, --seed <n>             a whole number (one is drawn, and named on standard error, unless given)
      --length <full|short>  every round, or half of them (full unless said)
      --doubles <one|chain>  cover each double at once, or chain doubles (one unless said)
      --mexican <any|own-first>
                             the Mexican Train open to all, or only once you have laid on your own
      --moves                play: print every move
      --save                 play: print the saved game on the last line
      --stdin                check, replay: read the saved game from standard input
  -j, --json                 print JSON (format 1) for deal, play and check
      --lang <en|ja>         English or Japanese (default: your system's)
  -h, --help                 this help
  -v, --version              the version

Exit codes: 0 done, 1 what was asked for could not be done (a saved game the
rules refuse), 2 the command was wrong.
```

and in Japanese:

```
使い方: domino <コマンド> [オプション]

ドミノとメキシカントレイン。同じシードなら、どの環境でも同じ配りになります。

  domino deal --seed 2026 --players 4      シードが作る配り（全員の手牌とハブのダブル）
  domino play --seed 2026 --players 4      コンピューターだけで最後まで遊び、得点を表示
  domino play --seed 2026 --moves          ...さらに、すべての手を言葉で表示
  domino play --seed 2026 --save           ...さらに、保存したゲームをテキストで表示
  domino check "<保存したゲーム>"          保存したゲームをルールどおりに読み直し、状況を表示
  domino replay "<保存したゲーム>"         保存したゲームのすべての手を言葉で表示

オプション:
      --set <9|12|15>        セット（最大のダブルで指定。指定なしは12）
      --players <2..8>       卓の人数（指定なしは4）
  -s, --seed <n>             整数（指定がなければ決めて、標準エラーに表示します）
      --length <full|short>  すべてのラウンド、またはその半分（指定なしは full）
      --doubles <one|chain>  ダブルをすぐ覆う、または連続で出せる（指定なしは one）
      --mexican <any|own-first>
                             メキシカントレインを誰でも使える、または自分の道に置いたあと
      --moves                play: すべての手を表示
      --save                 play: 最後の行に保存したゲームを表示
      --stdin                check, replay: 保存したゲームを標準入力から読む
  -j, --json                 deal, play, check の結果をJSON（形式1）で表示
      --lang <en|ja>         英語または日本語（指定なしはシステムの言語）
  -h, --help                 このヘルプ
  -v, --version              バージョン

終了コード: 0 完了、1 できなかった（ルールが受け付けない保存ゲーム）、
2 コマンドの誤り。
```
