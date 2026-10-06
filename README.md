<h1 align="center">Domino <sub>ドミノ</sub></h1>

<p align="center"><strong>Dominoes and Mexican Train for JavaScript and TypeScript.</strong><br>
Double-nine, double-twelve and double-fifteen sets; the full rules of Mexican Train for two to eight players; a computer player; seeded deals that replay exactly; and a saved game small enough to keep in a column; the words of the table in English and Japanese; tile sounds; and a command line. No dependencies.</p>

<p align="center">
  <a href="https://github.com/johnmorrisdotca/domino/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/johnmorrisdotca/domino/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://www.npmjs.com/package/@johnmorrisdotca/domino"><img alt="npm" src="https://img.shields.io/npm/v/@johnmorrisdotca/domino?color=2f5d4a"></a>
  <a href="./LICENSE"><img alt="MIT licence" src="https://img.shields.io/badge/licence-MIT-2f5d4a"></a>
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-0-2f5d4a">
  <img alt="TypeScript" src="https://img.shields.io/badge/types-TypeScript-3178c6">
</p>

<p align="center"><a href="https://johnmorrisdotca.github.io/domino/"><strong>Play Mexican Train →</strong></a> · <a href="https://johnmorrisdotca.github.io/domino/api.html">API reference</a></p>

<table align="center">
<tr>
<td align="center" valign="top">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/hero-desk-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/hero-desk-light.webp" alt="The demo on a desk, in English, a few turns into a game of Mexican Train for three: the page header with the language chooser, five cloth patches and the Help switch, the choices of set, players, rounds, doubles rule and Mexican Train rule, then the green table with a train for each seat and the Mexican Train, the status line Your turn, Cover the double, and your hand of tiles with the ones that may be laid lifted" width="600">
</picture>
<br><em>The demo on a desk: a double-nine table for three, a few turns in.</em>
</td>
<td align="center" valign="top">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/hero-phone-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/hero-phone-light.webp" alt="The demo on a phone, in Japanese: every train down the green table, the status line saying it is your turn to cover the double, and your hand of ten tiles with four lifted and gold-edged" width="190">
</picture>
<br><em>On a phone, in Japanese, in the device's light or dark.</em>
</td>
</tr>
</table>

Domino is the rules of dominoes as plain functions over plain data: the set, the tiles and what fits, a table of two to eight laying trains out from a hub double, a computer to fill any empty seat, and a game that is only its seed and its moves, so it replays exactly on any machine and is kept as a line of text. It has no screen of its own, because every site draws its own table; it gives the rules, the words and the sounds. [The demo](https://johnmorrisdotca.github.io/domino/) is a table built on it with nothing to install.

## In 30 seconds

```sh
npm install @johnmorrisdotca/domino
```

```ts
import { computerMove, encodeTrain, legalPlays, playTrain, startTrain } from "@johnmorrisdotca/domino";

// A double-twelve table for four, a computer in every seat but the first, dealt from seed 2026.
let game = startTrain(12, ["You", "", "", ""], 2026, undefined, [false, true, true, true])!;

legalPlays(game);                        // every tile you may lay, and on which train
game = playTrain(game, computerMove(game))!;   // a move: a new game, or null for one the rules refuse
encodeTrain(game);                       // the whole game as a short text, to keep and read back
```

Or from a terminal, with nothing to install:

```sh
npx @johnmorrisdotca/domino play --seed 2026 --players 3 --set 9 --length short
```

## Who it is for

- **Game sites and apps** that want a domino table with the rules already right,
  a computer for any empty seat, and games that can be saved and resumed.
- **Anyone writing a domino game of their own**, who wants the set, the tiles
  and their ends as plain numbers and pure functions to build on.
- **People who want to look at a game**: the command line deals a seed, plays
  one out and reads a kept game back, in English or Japanese.

## Features

- **The full rules of Mexican Train**, for two to eight players on a
  double-nine, double-twelve or double-fifteen set, with the house rules as
  options.
- **A computer player** that plans its longest run, plays doubles well and
  answers in a few milliseconds.
- **Seeded deals that replay exactly.** The same seed and table deal the same
  hands on every machine, and a game is only its table, its seed and its moves.
- **Saved games as text**, read back through the rules, so a changed save is
  refused.
- **The words of a table** in English and Japanese: whose turn it is, what was
  laid, how a round ended. See [Languages](#languages).
- **Tile sounds**, optional: tiles laid, drawn and shuffled, and a knock for a
  pass. See [Sounds](#sounds).
- **A command line**: deal a seed, play a game out, read a kept game back. See
  [The command line](#the-command-line).
- **No dependencies, and no drawing.** Plain functions over plain data.


### What's in it

Each picture is the real demo, a table drawn from the package's functions and taken from [the demo](https://johnmorrisdotca.github.io/domino/) with `pnpm screenshots:readme`, in light and dark.

<table>
<tr>
<td align="center" valign="top" width="50%">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/table-desk-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/table-desk-light.webp" alt="A double-twelve table for four on a desk, in the middle of the first round: a row for Your train and each computer's train and the Mexican Train, each with its tiles laid in a line from the hub double 12-12 and the number it needs next, the line Computer 4 laid 10-9 on Computer 4's train, and your hand of fifteen tiles with two lifted" width="400">
</picture>
<br><em><strong>The table.</strong> A train for every seat, the Mexican Train that anybody may add to, and the tiles in your hand that may be laid, lifted.</em>
</td>
<td align="center" valign="top" width="50%">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/big-table-desk-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/big-table-desk-light.webp" alt="A double-fifteen table for eight at the start of the first round: nine rows, one for each of the eight seats and the Mexican Train, each holding only the hub double 15-15, and your hand of fifteen tiles in a row with the two that may be laid lifted" width="400">
</picture>
<br><em><strong>The largest table.</strong> A double-fifteen set (136 tiles) for eight players, a hand of fifteen each.</em>
</td>
</tr>
<tr>
<td align="center" valign="top" width="50%">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/set-up-desk-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/set-up-desk-light.webp" alt="The demo's choices on a desk: the set (double-nine, double-twelve with double-twelve chosen, double-fifteen), the number of players (2, 3, 4 chosen, 6, 8), the rounds (Short chosen, Every double), the doubles rule (Cover one chosen, Chain), when the Mexican Train may start (Anyone, any time chosen, After your own), the Sound switch and the Deal again button" width="400">
</picture>
<br><em><strong>The options.</strong> The three sets, two to eight players, and the three house rules, all set when the game starts.</em>
</td>
<td align="center" valign="top" width="50%">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/using-it-desk-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/using-it-desk-light.webp" alt="The demo's Using it panel on a desk: the code that makes the game on the table (startTrain, legalPlays, playTrain with computerMove), the same deal on the command line as an npx line, and the game so far as the text encodeTrain writes, each with a copy button" width="400">
</picture>
<br><em><strong>The code behind the table.</strong> The panel shows the lines that make the game on the screen, the same deal on the command line, and the game kept as text.</em>
</td>
</tr>
<tr>
<td align="center" valign="top" width="50%">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/japanese-phone-dark.webp">
<img src="https://raw.githubusercontent.com/johnmorrisdotca/domino/main/docs/images/japanese-phone-light.webp" alt="The table on a phone in Japanese at the first turn of a double-nine game for three: the status line あなたの番です。牌をタップして置きます。, the round and hub, four trains each holding only the 9-9 double, and a hand of ten tiles with two lifted" width="240">
</picture>
<br><em><strong>In Japanese.</strong> The words of the table come from the package, in English or Japanese.</em>
</td>
<td></td>
</tr>
</table>

## Use it in your project

Domino has no screen of its own: it is plain functions over plain data, so
every framework uses it the same way. Keep the game in your state, show it
however you like, and pass each move through `playTrain`. The table in the
[demo](https://johnmorrisdotca.github.io/domino/) is
[`demo/page.js`](./demo/page.js), a page of plain DOM that does exactly that,
and the demo's *Using it* panel shows the code for the game on the table.

### Install

```sh
npm install @johnmorrisdotca/domino
# or: pnpm add @johnmorrisdotca/domino
# or: yarn add @johnmorrisdotca/domino
```

It is ES modules only, with its types included, and needs Node 22 or later outside a browser. A page with no bundler can import it from a CDN (`@1` is the major version): see the first example under [Examples](#examples).

### 1. The API alone

```ts
import { computerMove, decodeTrain, encodeTrain, legalPlays, mexicanOf, playTrain, startTrain, trainStatus } from "@johnmorrisdotca/domino";

let game = startTrain(9, ["Ann", "Ben", ""], 7, { length: "short", doubles: "chain", mexican: "ownFirst" }, [false, false, true])!;

legalPlays(game);                         // [{ tile, train }, …]: every lay now, a tile being a number
playTrain(game, { kind: "draw" });        // null: the rules refuse a draw while a tile fits
trainStatus(game, "en", 0);               // "Your turn. Tap a tile to lay it." (seat 0 is you)

const kept = encodeTrain(game);           // text: the table, the seed and the moves
decodeTrain(kept);                        // the same game, played again through the rules, or null
mexicanOf(game);                          // 3: the Mexican Train is numbered after the seats
```

### 2. A plain page

```html
<script type="module">
  import { startTrain, tileWords } from "./node_modules/@johnmorrisdotca/domino/dist/index.js";

  const game = startTrain(12, ["You", "", ""], 2026, undefined, [false, true, true]);
  document.body.textContent = game.hands[0].map(tileWords).join("  ");
</script>
```

No bundler is needed: `dist/index.js` is an ES module that imports nothing
outside the package, so a `<script type="module">` reads it as it is, from
wherever you serve it.

### 3. On a server

A game is its table, its seed and its moves, so a server keeps one short text
per game and plays it again through the rules whenever it needs the state.
`decodeTrain` trusts nothing it reads: a changed or invented save comes back
`null`, so a client can send moves and the server can check every one.

### 4. From a terminal

See [The command line](#the-command-line).
See [The command line](#the-command-line). There is no React, Vue, Svelte or Angular component, on purpose: a table is a
screen, and every site draws its own. Domino gives it the rules, the words and
the sounds, and [In a framework](#in-a-framework) holds a game in each one's state.

### In a framework

Domino has no component of its own, on purpose: a table is a screen, and every site draws its own. What every framework needs is the same, a game held in state and one function that applies a move, and each is a few lines. `playTrain` returns `null` for a move the rules refuse, so a handler can ignore it.

#### React

```jsx
import { useState } from "react";
import { computerMove, legalPlays, playTrain, startTrain, tileWords, trainStatus } from "@johnmorrisdotca/domino";

export function Table() {
  const [game, setGame] = useState(() => startTrain(9, ["You", "", ""], 2026, undefined, [false, true, true]));
  const lay = ({ tile, train }) => setGame((now) => playTrain(now, { kind: "play", tile, train }) ?? now);
  return (
    <section>
      <p role="status">{trainStatus(game, "en", 0)}</p>
      {game.toPlay === 0 && legalPlays(game).map((play) => (
        <button key={`${play.tile}-${play.train}`} onClick={() => lay(play)}>{tileWords(play.tile)} on train {play.train}</button>
      ))}
      {game.toPlay !== 0 && <button onClick={() => setGame((now) => playTrain(now, computerMove(now)) ?? now)}>Let the computer move</button>}
    </section>
  );
}
```

#### Vue

```vue
<script setup>
import { shallowRef } from "vue";
import { computerMove, legalPlays, playTrain, startTrain, tileWords, trainStatus } from "@johnmorrisdotca/domino";

const game = shallowRef(startTrain(9, ["You", "", ""], 2026, undefined, [false, true, true]));
const lay = (move) => { game.value = playTrain(game.value, move) ?? game.value; };
</script>

<template>
  <p role="status">{{ trainStatus(game, "en", 0) }}</p>
  <button v-for="play in game.toPlay === 0 ? legalPlays(game) : []" :key="`${play.tile}-${play.train}`" @click="lay({ kind: 'play', ...play })">
    {{ tileWords(play.tile) }} on train {{ play.train }}
  </button>
  <button v-if="game.toPlay !== 0" @click="lay(computerMove(game))">Let the computer move</button>
</template>
```

#### Svelte

```svelte
<script>
  import { computerMove, legalPlays, playTrain, startTrain, tileWords, trainStatus } from "@johnmorrisdotca/domino";

  let game = startTrain(9, ["You", "", ""], 2026, undefined, [false, true, true]);
  const lay = (move) => { game = playTrain(game, move) ?? game; };
</script>

<p role="status">{trainStatus(game, "en", 0)}</p>
{#if game.toPlay === 0}
  {#each legalPlays(game) as play}
    <button on:click={() => lay({ kind: "play", ...play })}>{tileWords(play.tile)} on train {play.train}</button>
  {/each}
{:else}
  <button on:click={() => lay(computerMove(game))}>Let the computer move</button>
{/if}
```

#### Angular

```ts no-check
import { Component, signal } from "@angular/core";
import { computerMove, legalPlays, playTrain, startTrain, trainStatus } from "@johnmorrisdotca/domino";

@Component({
  selector: "app-table",
  standalone: true,
  template: `<p role="status">{{ status() }}</p><button (click)="computer()">Let the computer move</button>`,
})
export class TableComponent {
  game = signal(startTrain(9, ["You", "", ""], 2026, undefined, [false, true, true])!);
  status = () => trainStatus(this.game(), "en", 0);
  computer() { this.game.update((now) => playTrain(now, computerMove(now)) ?? now); }
}
```

## Examples

Each example is a whole recipe: copy it and it works. They are run in CI against the built package (`pnpm test:readme`), so none of them is a guess, and the output shown is what they print.

### A table in a page, with no bundler

Save this as a file, serve it, and open it: a double-nine table for three with two computers, your hand as buttons, and the computers answering after each of your moves. The module comes from a CDN, and `@1` is the major version.

```html
<!doctype html>
<meta charset="utf-8">
<title>Mexican Train</title>
<p id="status" role="status"></p>
<div id="hand"></div>
<script type="module">
  import { computerMove, legalPlays, playTrain, startTrain, tileWords, trainStatus } from "https://cdn.jsdelivr.net/npm/@johnmorrisdotca/domino@1/dist/index.js";

  let game = startTrain(9, ["You", "", ""], 2026, undefined, [false, true, true]);

  function show() {
    document.getElementById("status").textContent = trainStatus(game, "en", 0);
    document.getElementById("hand").replaceChildren(...legalPlays(game).filter(() => game.toPlay === 0).map(({ tile, train }) => {
      const button = document.createElement("button");
      button.textContent = `${tileWords(tile)} on train ${train}`;
      button.onclick = () => { game = playTrain(game, { kind: "play", tile, train }) ?? game; answer(); };
      return button;
    }));
  }
  function answer() {
    while (game.phase === "playing" && game.toPlay !== 0) game = playTrain(game, computerMove(game)) ?? game;
    show();
  }
  answer();
</script>
```

### Deal a seed and read the hands

The same seed and table deal the same hands on every machine, so a seed is a deal you can name. `endsOf` gives a tile's two ends, and `tileWords` says one.

```ts
import { startTrain, tileWords } from "@johnmorrisdotca/domino";

const game = startTrain(12, ["You", "", "", ""], 2026, undefined, [false, true, true, true])!;
console.log(game.hands[0].map(tileWords).join("  "));   // your fifteen tiles
console.log(game.engine, game.hands.map((hand) => hand.length), game.boneyard.length);
```

```text
4–2  2–0  6–2  8–1  7–6  6–4  8–3  6–6  3–3  9–9  8–2  12–9  11–0  4–0  9–5
12 [ 15, 15, 15, 15 ] 30
```

### Let the computers play a whole game

`computerMove` is a move for whoever is to play, in any phase, so a game with only computers at the table is a loop. This is the game the command line plays for the same seed: 277 moves, and Computer 3 wins with 57 pips.

```ts
import { computerMove, playTrain, startTrain, trainTotals } from "@johnmorrisdotca/domino";

let game = startTrain(9, ["", "", ""], 2026, { length: "short", doubles: "one", mexican: "any" }, [true, true, true])!;
let moves = 0;
while (game.phase !== "finished") {
  game = playTrain(game, computerMove(game))!;
  moves += 1;
}
console.log(moves, "moves in", game.rounds, "rounds");
console.log("pips by seat:", trainTotals(game), "winner: seat", game.winners[0]);
```

```text
277 moves in 5 rounds
pips by seat: [ 88, 117, 57 ] winner: seat 2
```

### House rules

Three options change the game, and all three are set when the game starts: how many rounds (`length`), what a double does (`doubles`) and when the Mexican Train may be started (`mexican`). A table the rules do not allow is `null`.

```ts
import { startTrain, TRAIN_DEFAULT_OPTIONS } from "@johnmorrisdotca/domino";

console.log(TRAIN_DEFAULT_OPTIONS);
const house = startTrain(15, ["Ann", "Ben", "Cho"], 99, { length: "short", doubles: "chain", mexican: "ownFirst" });
console.log(house?.options, house?.rounds, house?.hands[0].length);   // double-fifteen: 16 rounds, or 8 when short
console.log(startTrain(12, ["Only one at the table"]));              // a table needs two to eight
```

```text
{ length: 'full', doubles: 'one', mexican: 'any' }
{ length: 'short', doubles: 'chain', mexican: 'ownFirst' } 8 12
null
```

### Keep a game and read it back

A game is its table, its seed and its moves, so the saved text is short, and what is read back is made again by playing every move through the rules. A changed save is `null`.

```ts
import { computerMove, decodeTrain, encodeTrain, playTrain, startTrain } from "@johnmorrisdotca/domino";

let game = startTrain(12, ["You", "", "", ""], 2026, undefined, [false, true, true, true])!;
game = playTrain(game, computerMove(game))!;

const kept = encodeTrain(game);
console.log(kept);
console.log(decodeTrain(kept)?.last);                                   // the same game, and its last move
console.log(decodeTrain(kept.replace('"seed":2026', '"seed":2027')));   // a changed seed no longer makes these moves: null
```

```text
{"v":1,"set":12,"options":{"length":"full","doubles":"one","mexican":"any"},"seed":2026,"players":["You","","",""],"computers":[false,true,true,true],"moves":"p156.0"}
{ seat: 0, move: { kind: 'play', tile: 156, train: 0 } }
null
```

### A server that checks every move

The client sends a move and the server holds the saved text. `decodeTrain` trusts nothing it reads, and `playTrain` refuses a move the rules do not allow, so the server never has to believe the client.

```ts
import { decodeTrain, encodeTrain, legalPlays, playTrain, startTrain, type TrainMove } from "@johnmorrisdotca/domino";

const saved = encodeTrain(startTrain(12, ["Ann", "Ben"], 5)!);   // what the database holds

/** The new saved text, or null when the save is not a game or the move is not a legal one. */
function accept(saved: string, move: TrainMove): string | null {
  const game = decodeTrain(saved);
  const next = game === null ? null : playTrain(game, move);
  return next === null ? null : encodeTrain(next);
}

const game = decodeTrain(saved)!;
const legal = legalPlays(game)[0]!;
console.log(accept(saved, { kind: "play", tile: legal.tile, train: legal.train })?.endsWith(`"moves":"p${legal.tile}.${legal.train}"}`));
console.log(accept(saved, { kind: "draw" }));                      // a draw while a tile fits: refused
console.log(accept("not a game", { kind: "pass" }));               // refused
```

```text
true
null
null
```

### The words of a table, in two languages

The package says what the rules have already decided, in a sentence a page can put in an `aria-live` region: whose turn it is, what was just laid, who is who.

```ts
import { computerMove, playTrain, startTrain, trainNews, trainSeatName, trainStatus } from "@johnmorrisdotca/domino";

let game = startTrain(9, ["You", "", ""], 7, undefined, [false, true, true])!;
console.log(trainStatus(game, "en", 0), "|", trainStatus(game, "ja", 0));
game = playTrain(game, computerMove(game))!;
console.log(trainNews(game, "en", 0));
console.log(trainSeatName(game, 1, "en", 0), "|", trainSeatName(game, 1, "ja", 0));
```

```text
Your turn. Tap a tile to lay it. | あなたの番です。牌をタップして置きます。
You laid 9–7 on Your train.
Computer 2 | コンピューター2
```

### The command line, and the same thing from code

`domino check` reads a saved game back through the rules and says where it stands, and `domino replay` says every move in words. `runCli` is the whole command line as a pure function, so the same text comes back from a test or a server.

```sh
npx @johnmorrisdotca/domino check '{"v":1,"set":9,"options":{"length":"short","doubles":"chain","mexican":"ownFirst"},"seed":7,"players":["Ann","Ben",""],"computers":[false,false,true],"moves":""}'
```

```text
Double-nine, 3 players, seed 7, 5 rounds; moves made: 0
Round 1 of 5 is being played; Ann is to play.
```

```ts
import { runCli } from "@johnmorrisdotca/domino";

const result = runCli(["deal", "--seed", "7", "--players", "2", "--set", "9"]);
console.log(result.code, result.out.split("\n")[0]);
console.log(runCli(["check", "{}"]));   // exit code 1: what was asked for could not be done
```

```text
0 Double-nine, 2 players, seed 7
{
  code: 1,
  out: '',
  err: 'domino: that is not a game these rules can play out again\n'
}
```

### Tile sounds that wait for a tap

A browser lets a page make sound only after somebody has touched it, and a muted table never downloads the recordings. The player is silent until asked, and nothing throws where there is no audio.

```ts no-run
import { createTileSounds } from "@johnmorrisdotca/domino/tile-sounds";

const sounds = createTileSounds({ muted: true, volume: 0.6 });   // nothing is fetched yet
document.querySelector("#sound")!.addEventListener("click", () => {
  sounds.setMuted(false);
  sounds.play("shuffle");               // the first sound fetches the recordings
});
sounds.play("lay");                     // a tile laid: silent while muted
```

## Mexican Train

A hub double in the middle, a train out of it for every player, and one more,
the Mexican Train, that anybody may add to. Rounds count down from the set's
highest double, the hub, to the blank; whoever goes out first ends the round, and
the fewest pips over the whole game wins.

- **Sets**: double-nine (55 tiles), double-twelve (91, the usual one) and
  double-fifteen (136), with the hand size for each set and number of players.
- **House rules**, as options: `length` (`full`, every round, or `short`),
  `doubles` (`one`: a double laid must be covered next, or `chain`), and
  `mexican` (`any`: anyone may start the Mexican Train, or `ownFirst`).
- **Trains open and close**: a player who cannot lay draws, and if still stuck
  marks their train open for everyone until they next lay on it.
- **A blocked round** ends when nobody can lay and nothing is left to draw.
- **A computer player** (`computerMove`) that lays its longest run on its own
  train and plays doubles well, in a few milliseconds.
- **Saved games**: `encodeTrain` and `decodeTrain` write and read a game as
  text, and reading trusts nothing: every move is played again through the
  rules, and a changed save is refused.

A tile is a number, `a × 16 + b` with `a ≤ b` (`TRAIN_PIP_BASE`), so a hand is
an array of numbers and a game is plain data that can be stored or sent as it is.

## Saved games

A kept game is JSON: the version, the set, the options, the seed, the names,
which seats are computers, and the moves. A move is a few characters:
`p<tile>.<train>` for a tile laid (the tile as its number, the train by seat,
the Mexican Train last), `d` for a draw, `x` for a pass and `n` for the next
round dealt. The game in *In 30 seconds*, after its one move, is:

```json
{"v":1,"set":12,"options":{"length":"full","doubles":"one","mexican":"any"},"seed":2026,"players":["You","","",""],"computers":[false,true,true,true],"moves":"p156.0"}
```

Nothing else is kept: hands, trains and the boneyard are made again from the
seed (`replayTrain`), so what is read back is exactly the game those moves make,
or nothing at all. Every game in `src/mexicanTrain/train.fixture.json` was kept by
people on itsutsu.com before the move to this package, and is dealt and played
again exactly by the tests.

## The command line

```sh
npm install -g @johnmorrisdotca/domino    # then `domino`, or use npx with nothing installed
```

```text
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

```sh
$ domino deal --seed 2026 --players 3 --set 9
Double-nine, 3 players, seed 2026
Round 1 of 10, hub double 9
Computer 1: 3-0 4-2 4-3 6-3 6-6 7-7 8-4 8-7 9-4 9-5
Computer 2: 1-1 2-0 2-1 5-0 5-1 7-3 7-4 8-0 8-2 8-6
Computer 3: 0-0 2-2 3-3 5-4 7-1 7-2 7-5 9-1 9-2 9-3
Boneyard: 24 tiles
$ domino play --seed 2026 --players 3 --set 9 --length short
Double-nine, 3 players, seed 2026, 5 rounds; moves made: 277
Hub    Computer 1  Computer 2  Computer 3
9              23          51          0*
8              11          0*          16
7              0*          58          27
6              54          0*           0
5              0*           8          14
Total          88         117          57

Winner: Computer 3 with 57 pips.
```

In the table of scores a `*` marks the seat that played out. The language
follows `--lang`, then `LC_ALL`, `LC_MESSAGES` and `LANG`, then the system's.
A seed that is not given is drawn and named on standard error, so the run can
be repeated. The command line is run as a child process on Linux, macOS and
Windows in CI.

From code, the whole command line is one pure function:

```ts
import { runCli } from "@johnmorrisdotca/domino";

runCli(["deal", "--seed", "2026", "--players", "3", "--set", "9"]);   // { code: 0, out: "Double-nine, 3 players, …", err: "" }
```

## Sounds

Recordings for a table to play: the tiles shuffled, one drawn, one laid, and a
knock on the table for a pass. Nothing sounds unless a table asks, and nothing is
fetched until the first sound.

```ts no-check
import { createTileSounds } from "@johnmorrisdotca/domino/tile-sounds";

const sounds = createTileSounds();           // silent until asked: nothing is fetched yet
sounds.play("shuffle");
sounds.play("draw", { count: 7, gap: 120 });  // seven tiles drawn, one after another
sounds.play("lay");                          // a tile laid on a train
sounds.play("knock");                        // a pass
muteButton.onclick = () => sounds.setMuted(!sounds.muted);
```

| Kind | What it is |
| --- | --- |
| `shuffle` | the tiles stirred face down |
| `draw` | a tile taken from the boneyard; `{ count }` takes several, one every `gap` milliseconds |
| `lay` | a tile set down on a train |
| `knock` | a rap on the table: a pass |

- **What they really are.** The recordings are poker chips, from Kenney's
  [Casino Audio](https://kenney.nl/assets/casino-audio) (CC0), because that is the
  nearest recorded click of a hard tile on a table that is free to use. They are
  not dominoes, and [CREDITS.md](./CREDITS.md) says so, names each file
  and what was done to it.
- **What it costs.** The player is small, and the recordings are a few tens of
  kilobytes of AAC in a module of their own (`@johnmorrisdotca/domino/sounds`),
  fetched by the first sound and never before: a muted table never downloads them.
- **A browser only lets a page make sound after somebody has touched it**, so a
  sound asked for by code before any tap is silent.
- If the recordings cannot be fetched or decoded, a short sound made in the
  browser stands in. Nothing throws where there is no audio, as on a server.
- Options of `createTileSounds`: `muted` (start muted), `volume` (0 to 1; 0.6
  unless said), `load` (where the recordings come from) and `window` (the window
  to make sound in, or `null` for silence). The demo's table has a **Sound**
  switch, off until pressed.

## API

The [API reference](https://johnmorrisdotca.github.io/domino/api.html) (also kept in the repository as [`docs/api.md`](https://github.com/johnmorrisdotca/domino/blob/main/docs/api.md)) lists every export of every entry point with its signature and its doc comment. It is made from the source by `pnpm docs:api`, and a test fails when it falls behind the code.

| Export | What it does |
| --- | --- |
| `startTrain(set, players, seed?, options?, computers?)` | A new game, or null for a table the rules do not allow |
| `playTrain(game, move)` | The game after a move, or null for a move the rules refuse |
| `trainMoves`, `legalPlays`, `mayLay`, `openEnd`, `mexicanOf` | What may be played, and where |
| `computerMove(game)`, `longestRun(hand, end)` | The computer's move, and the run it plans |
| `encodeTrain`, `decodeTrain`, `replayTrain`, `movesOf`, `moveCount` | Saving a game, reading it back, and replaying its moves |
| `trainTotals`, `handPips`, `trainAgain`, `trainPlayerName`, `peopleAt`, `cleanTrainName` | Scores, a fresh deal at the same table, and the seats |
| `tileOf`, `endsOf`, `isDouble`, `pipsOf`, `fits`, `laidAgainst`, `laidEnds`, `tileOfLaid`, `everyTile`, `tileWords` | Tiles as numbers: making, reading and laying them |
| `TRAIN_SETS`, `TRAIN_SET_NAMES`, `trainSetName`, `handSizeFor`, `roundsFor`, `TRAIN_DEFAULT_OPTIONS`, `TRAIN_LENGTHS`, `TRAIN_DOUBLES`, `TRAIN_MEXICAN`, `TRAIN_PHASES`, `TRAIN_PIP_BASE`, `TRAIN_NAME_MOST` | The vocabulary and the limits |
| `seededRandom(seed)`, `shuffled(items, random)` | The seeded stream every deal is made from |
| `DOMINO_STRINGS`, `dominoSay`, `dominoLanguage` | The words of a table, English and Japanese |
| `trainStatus`, `trainNews`, `trainSeatName`, `trainName`, `trainSetLabel` | What is going on, what just happened, and who is who, in words |
| `runCli`, `cliLanguage`, `CLI_MOVES_MOST` | The command line as a pure function |
| `createTileSounds`, `TILE_SOUND_KINDS`, `soundTimes`, `MOST_SOUNDS_AT_ONCE` (`/tile-sounds`) | The tile sounds |
| `TILE_SOUND_DATA` (`/sounds`) | The recordings, as base64 AAC |
| `TrainGame`, `TrainMove`, `TrainOptions`, `Domino`, `Language`, … | The types |
| `VERSION` | This package's version |


### Entry points

| Entry | What it holds |
| --- | --- |
| `@johnmorrisdotca/domino` | The dominoes, the rules of Mexican Train, the computer player, saved games, the words and the command line |
| `@johnmorrisdotca/domino/tile-sounds` | `createTileSounds`: the sounds player, silent until asked |
| `@johnmorrisdotca/domino/sounds` | `TILE_SOUND_DATA`: the recordings as base64 AAC, fetched by the first sound |

### The calls to learn first

| Call | What it does |
| --- | --- |
| `startTrain(set, players, seed, options, computers)` | A new game |
| `legalPlays(game)` | Every tile you may lay now, and on which train |
| `playTrain(game, move)` | The game after a move, or `null` |
| `computerMove(game)` | A move for whoever is to play |
| `encodeTrain(game)` and `decodeTrain(text)` | A game as text, and back |
| `trainStatus(game, language, seat)` | One sentence on whose turn it is |

## Theming

None, on purpose: Domino draws nothing, so there is nothing of its own to
theme, and a table built on it looks however your page looks. The demo is the
worked example: its dominoes and table are drawn by [`demo/page.js`](./demo/page.js)
and [`demo/domino.css`](./demo/domino.css), over the family's shared stylesheet.

## Limits

| Limit | Value | Constant |
| --- | --- | --- |
| Players at a table | 2 to 8 | |
| Sets | double-nine (55 tiles), double-twelve (91), double-fifteen (136) | `TRAIN_SETS` |
| Tiles in a hand | 6 to 15, by the set and the players | `handSizeFor` |
| Rounds | one for every double (10, 13 or 16), or about half of them (5, 7 or 8) | `roundsFor` |
| A seat's name | 20 characters | `TRAIN_NAME_MOST` |
| A seed | a whole number, read modulo 4,294,967,296; the command line takes 0 to 4,294,967,295 | |
| A tile | `low * 16 + high`, each end 0 to 15 | `TRAIN_PIP_BASE` |
| Moves a played game may take on the command line | 100,000 | `CLI_MOVES_MOST` |

## Accessibility

Domino draws nothing, so what it can do for a table's accessibility is give a page the words and keep its own behaviour out of the way. What a table built on it does is the page's to say, and the demo's table is the worked example.

- **Sentences for a screen reader.** `trainStatus` (whose turn it is, and what is wanted of you), `trainNews` (what was just laid, drawn or passed) and `trainSeatName` (who is who) are plain sentences in English or Japanese, made for an `aria-live` region: the demo puts the status in a `role="status"` element, so a move is spoken without moving focus.
- **A tile can be said.** `tileWords` gives a tile as words that read aloud (`12–9`), and the demo labels every tile in the hand with it, as a real `button` that is disabled when it cannot be laid.
- **The keyboard.** In the demo every tile and every action is a native button, so Tab, Enter and Space play a whole game; a tile that may go on more than one train asks which, with a button for each train. Nothing in the package needs a pointer.
- **No colour carries a meaning alone.** The package returns data and words, never colours. In the demo a train's marker is also said in words (open or closed), and the tile that may be laid is also the only one that is not disabled.
- **Touch targets.** The demo's tiles in your hand are 76 by 46 pixels and its buttons at least 44 pixels high, and its table fits a phone at 390 pixels.
- **Sound is optional.** The tile sounds are silent until a page asks, never the only sign of a move (every move is also a sentence in `trainNews`), and a muted table never downloads them.
- **Reduced motion.** The package animates nothing. The demo's one transition, a tile lifting when it may be laid, is off under `prefers-reduced-motion`.
- **Not yet.** The package has no way to say a whole train as one sentence, so a screen-reader user hears a train as its tiles, one by one. The Japanese words have not been read by a native reader (see [Languages](#languages)). The colour pairs of the demo have not been measured against WCAG contrast ratios.

## Browser and runtime support

The rules, the computer player, the words and the command line run anywhere
JavaScript does: every current browser, Node, Deno and Bun. It needs ES2020. The
package declares Node 22 and later (`engines`), and CI runs it on Node 22 and 24
and, for the packed package and the command line, on Linux, macOS and Windows.
The sounds need the Web Audio API, which every current browser has; elsewhere
they are silent and nothing throws. The demo is tested in Chromium and in
WebKit, Safari's engine, at phone size with touch.

## Languages

The words of a table are English and Japanese: `DOMINO_STRINGS.en` and
`DOMINO_STRINGS.ja`, one table, so the two are kept side by side. Five functions
say what the rules have already decided, in either language:

```ts no-check
import { trainNews, trainSeatName, trainStatus } from "@johnmorrisdotca/domino";

trainStatus(game, "ja", 0);        // "あなたの番です。牌をタップして置きます。"
trainNews(game, "en", 0);          // "You laid 12–9 on Your train."  (after the first move)
trainSeatName(game, 1, "en", 0);   // "Computer 2"
```

`dominoSay` fills in the braces (`{who}`, `{tile}`) of any string, and
`dominoLanguage` reads a tag such as `ja_JP.UTF-8`. **Japanese: included; not yet
reviewed by a native reader. Corrections welcome.** Every Japanese string is
listed beside its English in [docs/strings-ja.md](./docs/strings-ja.md), and there
is an [issue template](https://github.com/johnmorrisdotca/domino/issues/new?template=fix-a-translation.md)
for fixing one. Any other language is a table of your own with the same names.

## Roadmap

- More domino games: Block, Draw, All Fives and Chicken Foot
- A React hook, for a table kept in component state

Left out on purpose: anything played for stakes, and play over a network, which
needs a server. A game here is plain data, so your own server can carry it.

## Architecture

The dominoes and the rules of Mexican Train are plain functions over plain
data with no DOM and no dependency: a game is a value, every move returns the
next one, and a seed replays a deal exactly. The computer player and the
saved-game format are separate modules over the same rules, and every game so
far lives in a folder of its own, so the next one is a sibling of
`mexicanTrain/`.

```text
src/
├── index.ts        the main entry: the dominoes, Mexican Train's rules, its computer player, its saved-game format, its words and its command line
├── cli.ts          the command line, as a pure function
├── random.ts       seeded randomness, the one thing every deal is made from
├── sounds.ts       the recordings of the tile sounds, as base64 (written by scripts/sounds.mjs)
├── strings.ts      every word Domino says, in English and Japanese
├── tile-sounds.ts  the tile sounds: a player that fetches the recordings on the first sound
├── version.ts      the package's version
├── words.ts        what a table says: who is who, what just happened, whose turn it is
└── mexicanTrain/   Mexican Train, the one game so far
    ├── dominoes.ts                the dominoes themselves: the double-nine, double-twelve and double-fifteen sets, their ends and pips, and which fit
    ├── mexicanTrain.constants.ts  the numbers the game is played by: set sizes, train lengths and the doubles rules
    ├── mexicanTrain.ts            the rules of Mexican Train: deal, trains, doubles, drawing and scoring
    ├── mexicanTrain.types.ts      the game, its moves and its options, as the rules speak of them
    ├── trainCodec.ts              a game as text and back: its options, its seed and every move
    └── trainComputer.ts           the computer player
```

Tests sit beside the code they test (`*.test.ts`), and `src/docs.test.js` holds
this README's examples and tables to the code. `bin/` is the command line's few
lines. `scripts/` checks the package as npm packs it (`pnpm test:package`), runs
the command line as a child process (`pnpm test:cli`), makes the API reference,
`docs/api.md`, cuts the sounds, and builds the demo (`pnpm site`) and tests it in
a real browser (`pnpm test:demo`); `demo/` is the page published on GitHub Pages.

## The name

*Domino* is ドミノ (domino), the word Japanese uses for dominoes, borrowed from
the European game as English borrowed it.

## Where it comes from, and where it is used

Domino was written for [itsutsu.com](https://itsutsu.com), a site of games
played with friends and family, where Mexican Train is played at one device or
several. Every deal and every computer game there before the move is held by
this package's tests, so a game kept on the site replays exactly.

Using it somewhere? [Tell us](https://github.com/johnmorrisdotca/domino/issues/new?template=add-my-project.md).

### The family

<!-- family:start (made by scripts/family-readme.mjs from scripts/family-template.mjs; change those, not this) -->
Domino is one of twenty-four packages, each made for the same site, each at
[github.com/johnmorrisdotca](https://github.com/johnmorrisdotca). The code of every one is MIT.

- [Korokoro](https://github.com/johnmorrisdotca/korokoro) (コロコロ): dice, with notation, exact odds, real sounds and the dice of many games. [Demo](https://johnmorrisdotca.github.io/korokoro/).
- [Kyuubu](https://github.com/johnmorrisdotca/kyuubu) (キューブ): a turning cube for the browser, 2×2 to 7×7, with record solves to replay. [Demo](https://johnmorrisdotca.github.io/kyuubu/).
- [Hitotsu](https://github.com/johnmorrisdotca/hitotsu) (一つ): a colour-card shedding game for two to eight, with the house rules people play. [Demo](https://johnmorrisdotca.github.io/hitotsu/).
- [Toranpu](https://github.com/johnmorrisdotca/toranpu) (トランプ): a deck of playing cards, card games with computer players, and solitaires. [Demo](https://johnmorrisdotca.github.io/toranpu/).
- [Tane](https://github.com/johnmorrisdotca/tane) (種): seeded random numbers and daily seeds, the same in every browser and on every server. [Demo](https://johnmorrisdotca.github.io/tane/).
- [Narabe](https://github.com/johnmorrisdotca/narabe) (並べ): one rules engine for abstract board games, from gomoku and Reversi to Go and checkers. [Demo](https://johnmorrisdotca.github.io/narabe/).
- [Tenka](https://github.com/johnmorrisdotca/tenka) (天下): world conquest for two to six, on a map of the real world. [Demo](https://johnmorrisdotca.github.io/tenka/).
- [Kumimoji](https://github.com/johnmorrisdotca/kumimoji) (組み文字): a crossword tile race, in English and Japanese kana. [Demo](https://johnmorrisdotca.github.io/kumimoji/).
- [Tsunagi](https://github.com/johnmorrisdotca/tsunagi) (繋ぎ): a line-joining logic puzzle whose every level has exactly one answer. [Demo](https://johnmorrisdotca.github.io/tsunagi/).
- [Jarajara](https://github.com/johnmorrisdotca/jarajara) (ジャラジャラ): mahjong tiles drawn as SVG, stacked layouts, and the matching solitaire Awase. [Demo](https://johnmorrisdotca.github.io/jarajara/).
- [Suido](https://github.com/johnmorrisdotca/suido) (水道): a pipe puzzle: turn the pieces until the water reaches every drain. [Demo](https://johnmorrisdotca.github.io/suido/).
- [Domino](https://github.com/johnmorrisdotca/domino) (ドミノ): dominoes and Mexican Train. [Demo](https://johnmorrisdotca.github.io/domino/).
- [Kotoba](https://github.com/johnmorrisdotca/kotoba) (言葉): word lists and word-game rules in English, French, German and Japanese. [Demo](https://johnmorrisdotca.github.io/kotoba/).
- [Sugoroku](https://github.com/johnmorrisdotca/sugoroku) (双六): backgammon and its variants, with the doubling cube and match play. [Demo](https://johnmorrisdotca.github.io/sugoroku/).
- [Kazu](https://github.com/johnmorrisdotca/kazu) (数): grid number puzzles: Sudoku and its variants, Futoshiki and Skyscrapers. [Demo](https://johnmorrisdotca.github.io/kazu/).
- [Meikyuu](https://github.com/johnmorrisdotca/meikyuu) (迷宮): mazes on squares, hexagons, triangles and circles, made from a seed and drawn through with a finger or the mouse. [Demo](https://johnmorrisdotca.github.io/meikyuu/).
- [Hikidashi](https://github.com/johnmorrisdotca/hikidashi) (引き出し): a drawer of small Japanese text tools: era dates, kanji numerals, readings and sentence difficulty. [Demo](https://johnmorrisdotca.github.io/hikidashi/).
- [Chizu](https://github.com/johnmorrisdotca/chizu) (地図): maps of the world and of countries' regions, in English and Japanese, with a quiz and callouts. [Demo](https://johnmorrisdotca.github.io/chizu/).
- [Bushu](https://github.com/johnmorrisdotca/bushu) (部首): find a kanji by the parts it is made of. [Demo](https://johnmorrisdotca.github.io/bushu/).
- [Tobiishi](https://github.com/johnmorrisdotca/tobiishi) (飛び石): peg solitaire with nine boards and seeded solvable challenges. [Demo](https://johnmorrisdotca.github.io/tobiishi/).
- [Jirai](https://github.com/johnmorrisdotca/jirai) (地雷): minesweeper on shaped grids with verified no-guess boards. [Demo](https://johnmorrisdotca.github.io/jirai/).
- [Gunjin](https://github.com/johnmorrisdotca/gunjin) (軍人): five hidden-rank strategy games with pass-the-device play. [Demo](https://johnmorrisdotca.github.io/gunjin/).
- [Karakuri](https://github.com/johnmorrisdotca/karakuri) (からくり): eight hyper-casual puzzle games, some of them physics: draw a shield, pull pins, cut ropes, slide blocks, pour tubes. [Demo](https://johnmorrisdotca.github.io/karakuri/).
- [Houseki](https://github.com/johnmorrisdotca/houseki) (宝石): gem and stone matching puzzles: falling triplets, stone collapse, colour chains and gem swap. [Demo](https://johnmorrisdotca.github.io/houseki/).

**This package is Domino.** The demos of all twenty-four share one header and footer, so each links the rest.
<!-- family:end -->

## Development

```sh
pnpm install
pnpm check              # lint, types and tests
pnpm test:cli           # the command line, run as a child process
pnpm test:package       # pack it as npm does, install it, import every entry and run the command
pnpm test:demo          # the demo in real browsers, by taps
pnpm test:readme        # run every example in this README against the built package
pnpm site               # build the demo into site/, as the Pages workflow publishes it
pnpm screenshots:readme # take the README's pictures from the built demo, in light and dark
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). A change to the rules must leave every game in the fixture dealing and playing
exactly as it did. Please follow the [code of conduct](./CODE_OF_CONDUCT.md).

## Changes

See [CHANGELOG.md](./CHANGELOG.md). The latest release, 1.1.2, adds no code: it is this README in full, with pictures of the table, examples that are run on every change, examples for React, Vue, Svelte and Angular, and an Accessibility section.

## Licence

[MIT](./LICENSE) © John Morris. The tile sounds are Kenney's Casino Audio, CC0:
see [CREDITS.md](./CREDITS.md).
