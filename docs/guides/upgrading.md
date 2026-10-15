---
title: "Upgrading and moving a table"
section: upgrading
order: 10
description: "Keep saved-format versions and house rules explicit."
---

## The current version-1 API

The published public major is 1. Read [the changelog](../../CHANGELOG.md) for minor and patch changes. There is no version-2 migration in this package yet. The README's framework examples adapt the pure rules to host state; they do not depend on a separate framework SDK.

The save format has its own version field. A package version is not a substitute for that field, and `decodeTrain` refuses a format it cannot replay. Preserve seed, seat order, computer flags, complete options and action order. To start another game at the same table, use `trainAgain` with the new seed rather than altering the saved record.

## Moving from another domino engine

Map tiles to `tileOf` and laid orientation to `laidAgainst`. Choose the offered set and make doubles, game length and Mexican Train opening rules explicit. Block, Draw, All Fives and Chicken Foot are roadmap games rather than alternate settings of this rules engine. Do not assume another engine's marker or double-cover rules match; [legal plays](rules.md) explain the native choices.
