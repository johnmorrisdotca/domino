---
title: "Architecture and replay"
section: explanation
order: 8
description: "Follow immutable state and the authoritative move record."
---

## Source organization

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

## Records rather than snapshots

History is a linked chain, so appending a move adds one node rather than copying thousands of earlier moves. `movesOf` reads chronological order, while `moveCount` reads the chain count. The codec stores setup and actions; replay reconstructs hands and train ends using the same rules. A host can serialize a game without treating arbitrary supplied snapshots as legal state.

The root entry does not depend on DOM. Sound controls and recordings are separate optional entries. Documentation comes from these public source comments and paired guides; search is a static local index. Regenerating recordings with `pnpm sounds` preserves their checked examples through the recording writer.
