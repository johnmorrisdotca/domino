<h1 align="center">Domino <sub>ドミノ</sub></h1>

<p align="center"><strong>Dominoes and Mexican Train for JavaScript and TypeScript.</strong><br>
Double-nine, double-twelve and double-fifteen sets; the full rules of Mexican Train for two to eight players; a computer player; seeded deals that replay exactly; and a saved game small enough to keep in a column. No dependencies.</p>

<p align="center">
  <a href="https://github.com/johnmorrisdotca/domino/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/johnmorrisdotca/domino/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://www.npmjs.com/package/@johnmorrisdotca/domino"><img alt="npm" src="https://img.shields.io/npm/v/@johnmorrisdotca/domino?color=2f5d4a"></a>
  <a href="./LICENSE"><img alt="MIT licence" src="https://img.shields.io/badge/licence-MIT-2f5d4a"></a>
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-0-2f5d4a">
</p>

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

## Who it is for

- **Game sites and apps** that want a domino table with the rules already right,
  a computer for any empty seat, and games that can be saved and resumed.
- **Anyone writing a domino game of their own**, who wants the set, the tiles
  and their ends as plain numbers and pure functions to build on.

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

## API

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
| `TrainGame`, `TrainMove`, `TrainOptions`, `Domino`, … | The types |
| `VERSION` | This package's version |

A tile is a number, `a × 16 + b` with `a ≤ b` (`TRAIN_PIP_BASE`), so a hand is
an array of numbers and a game is plain data that can be stored or sent as it is.

## The name

*Domino* is ドミノ (domino), the word Japanese uses for dominoes, borrowed from
the European game as English borrowed it.

## Where it comes from, and where it is used

Domino was written for [itsutsu.com](https://itsutsu.com), a site of games
played with friends and family, where Mexican Train is played at one device or
several. Every deal and every computer game there before the move is held by
this package's tests, so a game kept on the site replays exactly.

Using it somewhere? [Tell us](https://github.com/johnmorrisdotca/domino/issues/new?title=Add+my+project).

### The family

- [Korokoro](https://github.com/johnmorrisdotca/korokoro): dice, with exact odds and real sounds
- [Kyuubu](https://github.com/johnmorrisdotca/kyuubu): a turning cube, with a solve you can follow
- [Toranpu](https://github.com/johnmorrisdotca/toranpu): playing cards and ten card games, and three solitaires
- [Hitotsu](https://github.com/johnmorrisdotca/hitotsu): a colour-card game in the manner of UNO
- [Tane](https://github.com/johnmorrisdotca/tane): seeded random numbers and daily seeds
- [Narabe](https://github.com/johnmorrisdotca/narabe): a rules engine for board games of the five-in-a-row family and more
- [Tenka](https://github.com/johnmorrisdotca/tenka): a game of world conquest
- [Kumimoji](https://github.com/johnmorrisdotca/kumimoji): a crossword tile race

## Roadmap

- A demo site, playable in the browser, in the family's look, with English and Japanese
- The words for the table in English and Japanese, and a React hook
- More domino games: Block, Draw, All Fives and Chicken Foot

Left out on purpose: anything played for stakes, and play over a network, which
needs a server. A game here is plain data, so your own server can carry it.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licence

MIT © John Morris
