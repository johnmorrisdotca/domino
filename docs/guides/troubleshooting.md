---
title: "Troubleshooting and FAQ"
section: troubleshooting
order: 9
description: "Resolve refused setup, illegal moves and saved-game errors."
---

## A game call returned null

`startTrain` accepts the offered sets and two to eight players; unsupported setup returns `null`. `playTrain` returns `null` for an action not currently legal: inspect `trainMoves`, and remember that an uncovered double constrains every train. `replayTrain` returns `null` if the setup or any recorded move is refused. `decodeTrain` also rejects malformed text and incompatible save versions. Keep the exact seed, house rules and move order together.

## Names and empty lists

`trainSetName` and `trainSetLabel` return `null` for an unknown set. A blank last-move announcement before play is normal. `trainMoves` is empty after the game is finished; do not ask the computer for another move then. A just-ended round uses a `next` action before a new deal. Seat and train indices start at zero; the Mexican Train is after all seats.

## Sound and CLI questions

No sound while muted, without an audio-capable window, or before an allowed browser gesture is expected. Unmute from a host control and close the player on removal. The command line reports refused records with status 1 and invalid usage with status 2; inspect both `out` and `err`. A missing placeholder value stays in braces rather than becoming an empty string.

This package supplies rules and a demo, not a network service or native mounted board component. Host servers must keep other hands and the boneyard private. See [saving](saved-games.md), [CLI](cli.md) and [sounds](sounds.md).
